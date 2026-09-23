# Public repository guidance

This repository owns the **public architecture/explainer surface** for Lyra Memory. It is not the implementation repository and must never become a mirror of private operational state.

## Authority

1. This repository is authoritative for its own public architecture wording, research citations, synthetic examples, public site, and future public specification work.
2. The private Lyra Memory implementation remains authoritative for actual schema, migrations, runtime, security controls, operational policy, and acceptance evidence.
3. Owning repositories and systems remain authoritative for current facts and execution authority. A memory record is context, never permission.
4. Current user/Product direction wins when it changes the intended public model.

## Publication boundary

This repository is public. Every committed byte must be safe for an anonymous reader.

Do not commit:

- real memory contents or raw conversations;
- private identifiers that are not deliberately part of the public project;
- credentials, tokens, private keys, cookies, connection strings, or secrets;
- OAuth identities or private access configuration;
- deployment topology, hostnames, internal paths, or attack-useful infrastructure detail;
- private issue/acceptance evidence copied from an implementation owner;
- health, finance, child, legal, authentication, or other sensitive personal-domain data;
- private repository content merely for provenance.

Use synthetic examples only.

## Research

Refresh comparison claims from current first-party documentation immediately before material publication updates. Prefer official product documentation and upstream repositories.

Comparisons must be neutral and factual. Do not rank products, claim Lyra Memory is the first/unique/best, or erase areas where another system is more mature.

Distinguish:

- documented external behavior;
- implemented private Lyra Memory capability;
- planned public architecture;
- experimental ideas.

## Architectural invariants

Preserve these distinctions unless Product direction explicitly changes them:

- **Lyra Memory** — durable associative context/significance;
- **MemPalace** — local semantic/index/navigation companion;
- **Session Continuity** — unresolved execution recovery;
- **owning repositories/systems** — current truth and authority;
- **identity canon** — current agent identity when applicable.

When the public explanation discusses Identity Canon together with Lyra Memory, preserve the ownership split and make the benefit concrete: canon keeps the current self concise; memory can preserve durable context, provenance, and the history that explains how identity changed. Pairing may improve continuity and explainability, but must never imply automatic synchronization, memory-to-canon writeback, or that retrieved context can override current identity.

Retrieval never grants execution authority.

## Visual direction

The public visual identity is grounded in `assets/lyra-icon.png`, selected by Product as the canonical site icon source.

Use its actual visual language rather than generic AI-product styling:

- deep midnight navy/indigo surfaces derived from the icon background;
- cool electric blue/cyan highlights;
- restrained violet as a secondary energy/accent color;
- cool white text and luminous points;
- one primary visual anchor at a time rather than repeated glows, gradients, or card walls.

The icon may appear as the header mark, favicon/social image, and one prominent hero identity element. Do not tile it, turn it into decorative wallpaper, or invent unrelated robot/brain/circuit imagery.

Use the Product-selected original imagery, or deterministic crops/resizes/format derivatives of it, for site identity. Do not replace it with a generated reinterpretation or composite merely to solve layout, cropping, or blending problems. Screenshots supplied to demonstrate a visual defect are diagnostic evidence unless Product explicitly adopts them as source artwork.

Preserve the subject-grounded readability direction already established for the site: open editorial structure, real hierarchy, meaningful numbering only, and `Memory ≠ Canonical Owner` as the central visual/architectural idea. Style passes may add restrained luminosity around the icon or meaningful state accents, but should not reintroduce generic rounded-card grids, decorative section badges, purple-gradient hero backgrounds, or shadow-heavy SaaS/AI landing-page conventions.

## Public document reader

Markdown under `docs/` remains the canonical authored source. The in-page reader is presentation-only progressive enhancement:

- keep each `.md` link as a real same-origin `href` so no-JS, modified-click, and direct navigation still work;
- use native `<dialog>` and small vanilla JavaScript rather than a frontend framework or external Markdown dependency;
- fetch only same-origin `.md` targets selected by the page;
- render a bounded Markdown subset by constructing DOM nodes; do not pass raw Markdown/HTML through `innerHTML`;
- preserve an explicit “View raw Markdown” route;
- verify Escape/Close behavior, focus return, mobile containment, and the normal-link fallback in a real browser.

## Public automation

Repository visibility: **public**.

Portfolio automation enrollment: **disenrolled**.

This public repository does not inherit private shared flex-worker execution, credentials, host allocation, scheduler bindings, merge authority, deployment authority, or other private automation merely because it belongs to the same portfolio.

Ordinary GitHub collaboration and separately authorized public CI are not prohibited by this rule.

## Change workflow

After the initial user-authorized bootstrap, prefer focused branches and reviewed pull requests for material changes.

Before publishing:

1. inspect the complete public diff;
2. search for secrets and private identifiers;
3. verify every example is synthetic;
4. recheck external claims against current primary sources;
5. distinguish implemented, validated, planned, and experimental capabilities;
6. validate the static site locally;
7. read back the exact public revision and rendered public surface.

Do not add a license on behalf of Product/legal authority.
