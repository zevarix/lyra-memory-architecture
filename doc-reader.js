(() => {
  "use strict";

  const dialog = document.getElementById("doc-reader");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const content = dialog.querySelector("[data-doc-content]");
  const title = dialog.querySelector("[data-doc-title]");
  const path = dialog.querySelector("[data-doc-path]");
  const status = dialog.querySelector("[data-doc-status]");
  const rawLink = dialog.querySelector("[data-doc-raw]");
  const closeButton = dialog.querySelector("[data-doc-close]");
  const cache = new Map();
  let opener = null;

  const blockStart = (line) =>
    /^(#{1,6})\s+/.test(line) ||
    /^\s*([-*+]\s+|\d+[.)]\s+)/.test(line) ||
    /^\s*>\s?/.test(line) ||
    /^\s*```/.test(line) ||
    /^\s*(---+|___+|\*\*\*+)\s*$/.test(line);

  const safeUrl = (value) => {
    try {
      const url = new URL(value, window.location.href);
      if (["http:", "https:", "mailto:"].includes(url.protocol)) return url;
      if (url.origin === window.location.origin) return url;
    } catch {
      return null;
    }
    return null;
  };

  const appendLink = (parent, label, href) => {
    const url = safeUrl(href);
    if (!url) {
      parent.append(document.createTextNode(label));
      return;
    }

    const link = document.createElement("a");
    link.href = url.href;
    link.textContent = label;

    if (url.origin !== window.location.origin) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    parent.append(link);
  };

  const appendInline = (parent, text) => {
    const tokenPattern =
      /(\*\*[^*\n]+\*\*|`[^`\n]+`|\[[^\]\n]+\]\([^\s)]+\)|https?:\/\/[^\s<>]+|\*[^*\n]+\*)/g;

    let cursor = 0;

    for (const match of text.matchAll(tokenPattern)) {
      const token = match[0];
      const start = match.index ?? 0;

      if (start > cursor) {
        parent.append(document.createTextNode(text.slice(cursor, start)));
      }

      if (token.startsWith("**") && token.endsWith("**")) {
        const strong = document.createElement("strong");
        strong.textContent = token.slice(2, -2);
        parent.append(strong);
      } else if (token.startsWith("`") && token.endsWith("`")) {
        const code = document.createElement("code");
        code.textContent = token.slice(1, -1);
        parent.append(code);
      } else if (token.startsWith("[") && token.includes("](")) {
        const boundary = token.indexOf("](");
        appendLink(parent, token.slice(1, boundary), token.slice(boundary + 2, -1));
      } else if (token.startsWith("http://") || token.startsWith("https://")) {
        let href = token;
        let trailing = "";

        while (/[.,;:]$/.test(href)) {
          trailing = href.slice(-1) + trailing;
          href = href.slice(0, -1);
        }

        appendLink(parent, href, href);
        if (trailing) parent.append(document.createTextNode(trailing));
      } else if (token.startsWith("*") && token.endsWith("*")) {
        const em = document.createElement("em");
        em.textContent = token.slice(1, -1);
        parent.append(em);
      } else {
        parent.append(document.createTextNode(token));
      }

      cursor = start + token.length;
    }

    if (cursor < text.length) {
      parent.append(document.createTextNode(text.slice(cursor)));
    }
  };

  const paragraph = (text) => {
    const p = document.createElement("p");
    appendInline(p, text);
    return p;
  };

  const renderMarkdown = (markdown) => {
    const fragment = document.createDocumentFragment();
    const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    let documentTitle = "";
    let index = 0;

    while (index < lines.length) {
      const line = lines[index];

      if (!line.trim()) {
        index += 1;
        continue;
      }

      const fence = line.match(/^\s*```([^\s`]*)\s*$/);
      if (fence) {
        const language = fence[1];
        const codeLines = [];
        index += 1;

        while (index < lines.length && !/^\s*```\s*$/.test(lines[index])) {
          codeLines.push(lines[index]);
          index += 1;
        }

        if (index < lines.length) index += 1;

        const pre = document.createElement("pre");
        const code = document.createElement("code");
        if (language) code.dataset.language = language;
        code.textContent = codeLines.join("\n");
        pre.append(code);
        fragment.append(pre);
        continue;
      }

      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        const level = heading[1].length;
        const headingText = heading[2].trim();

        if (level === 1 && !documentTitle) {
          documentTitle = headingText;
        } else {
          const renderedLevel = Math.min(level + 1, 6);
          const h = document.createElement("h" + renderedLevel);
          appendInline(h, headingText);
          fragment.append(h);
        }

        index += 1;
        continue;
      }

      if (/^\s*(---+|___+|\*\*\*+)\s*$/.test(line)) {
        fragment.append(document.createElement("hr"));
        index += 1;
        continue;
      }

      if (/^\s*>\s?/.test(line)) {
        const quoteLines = [];

        while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
          quoteLines.push(lines[index].replace(/^\s*>\s?/, "").trim());
          index += 1;
        }

        const quote = document.createElement("blockquote");
        quote.append(paragraph(quoteLines.join(" ")));
        fragment.append(quote);
        continue;
      }

      const unordered = line.match(/^\s*[-*+]\s+(.+)$/);
      const ordered = line.match(/^\s*\d+[.)]\s+(.+)$/);

      if (unordered || ordered) {
        const list = document.createElement(ordered ? "ol" : "ul");
        const matcher = ordered ? /^\s*\d+[.)]\s+(.+)$/ : /^\s*[-*+]\s+(.+)$/;

        while (index < lines.length) {
          const item = lines[index].match(matcher);
          if (!item) break;

          const li = document.createElement("li");
          appendInline(li, item[1].trim());
          list.append(li);
          index += 1;
        }

        fragment.append(list);
        continue;
      }

      const paragraphLines = [line.trim()];
      index += 1;

      while (
        index < lines.length &&
        lines[index].trim() &&
        !blockStart(lines[index])
      ) {
        paragraphLines.push(lines[index].trim());
        index += 1;
      }

      fragment.append(paragraph(paragraphLines.join(" ")));
    }

    return { fragment, title: documentTitle };
  };

  const setLoading = (sourcePath) => {
    title.textContent = "Loading document…";
    path.textContent = sourcePath;
    status.textContent = "Loading Markdown…";
    status.hidden = false;
    content.hidden = true;
    content.replaceChildren();
  };

  const setError = (message) => {
    title.textContent = "Document unavailable";
    status.textContent = message;
    status.hidden = false;
    content.hidden = true;
  };

  const openDocument = async (link) => {
    const url = new URL(link.href, window.location.href);

    if (
      url.origin !== window.location.origin ||
      !url.pathname.toLowerCase().endsWith(".md")
    ) {
      return;
    }

    opener = link;
    rawLink.href = url.href;
    setLoading(url.pathname);

    if (!dialog.open) dialog.showModal();

    try {
      let markdown = cache.get(url.href);

      if (markdown === undefined) {
        const response = await fetch(url.href, {
          credentials: "same-origin",
          headers: { Accept: "text/markdown,text/plain;q=0.9,*/*;q=0.1" },
        });

        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }

        markdown = await response.text();
        cache.set(url.href, markdown);
      }

      const rendered = renderMarkdown(markdown);
      title.textContent = rendered.title || link.textContent.trim() || "Document";
      status.hidden = true;
      content.replaceChildren(rendered.fragment);
      content.hidden = false;
      content.scrollTop = 0;
    } catch (error) {
      console.error("Could not load Markdown document", error);
      setError("The document could not be loaded. You can still open the raw Markdown source.");
    }
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-doc-reader]");
    if (!link) return;

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || !url.pathname.toLowerCase().endsWith(".md")) {
      return;
    }

    event.preventDefault();
    void openDocument(link);
  });

  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    if (opener?.isConnected) opener.focus();
    opener = null;
  });
})();