# Ambient episodic retrieval and source-bounded context

Status: planned architectural behavior, 2026-10-02. This note does not claim a finished portable episodic implementation.

## Activate when a cue matters

Useful memory should not depend entirely on an explicit request to remember. A current question can provide a narrow cue that triggers retrieval when prior context would materially improve the answer. That is a cue-driven lookup, not a broad startup scan or permission to surface unrelated private material.

A proposed flow is:

1. Identify the current question and its authorized scope.
2. Search a bounded set of admitted cues, records and source pointers.
3. Check lifecycle, provenance, relevance and uncertainty before including a candidate.
4. Open richer canonical artifacts only when needed and authorized.
5. Keep the response grounded in the current owner and disclose gaps.

Ambient activation is a design goal. Reliable trigger selection, false-positive control and privacy-preserving scope enforcement still require evaluation.

## A cue is a handle

Consider the wholly fictional cue **paper crane / green terminal**. An admitted memory might retain that cue with a short description and a reference to a fictional design workshop. A semantic companion may help locate the episode even when a later question uses different words.

The cue need not contain the whole workshop. It is a handle for discovery. The richer account can remain in its canonical artifact owner, preserving chronology and context without copying an entire transcript into associative memory.

Cue similarity does not establish that two episodes are the same. Source references and chronology must disambiguate them.

## Preserve source differences

A fictional workshop could have several artifacts:

- a contemporaneous text note describing the discussion;
- a diagram showing the proposed arrangement;
- a structured decision record showing the accepted outcome;
- a later participant recollection describing what stood out.

Each contributes different evidence. The diagram does not prove when a decision was approved; the later recollection does not replace the contemporaneous record. Keep artifact type, authorship when appropriate, event time, capture time, provenance, confidence and known conflicts explicit. A generated summary or interpretation should be marked as derived, rather than silently promoted to an original observation.

Multimodal provenance means preserving these source distinctions and lawful access to them. It does not imply that a text embedding understands every dimension of an image, recording or structured artifact.

## Admit selectively

Preserve an episode because it has durable significance, a useful future retrieval purpose and an appropriate privacy boundary. Do not make transcript archiving the default. Prefer a small cue and source-bounded representation when that is enough; retain a richer episode only when its context matters and retention is justified.

Corrections should preserve which claim changed and why, subject to deletion requirements. Source disappearance should produce an unavailable pointer, not an invented reconstruction presented as evidence.

## Keep the owners clear

Lyra Memory owns admitted durable significance, provenance and lifecycle. MemPalace can support semantic discovery and navigation. Canonical systems own rich artifacts and current truth. Session Continuity owns unresolved execution recovery. Identity canon, when present, owns the current identity.

A navigation companion may find a historical record; it does not become that record's authority. An episode may explain why something happened; it does not authorize a new action. Retrieval never grants execution authority.

See [architecture options](RETRIEVAL-ARCHITECTURE-OPTIONS.md) for storage choices and [synthetic methodology](SYNTHETIC-RETRIEVAL-METHODOLOGY.md) for evaluation boundaries. This note develops the public scope of [issue #11](https://github.com/zevarix/lyra-memory-architecture/issues/11) without reproducing its private motivation or evidence.
