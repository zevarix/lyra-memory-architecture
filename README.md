# Lyra Memory Architecture

Public architecture, research, adoption guidance, and explainer site for Lyra Memory.

**Thesis:** Memory remembers significance. Canonical systems prove reality.

This repository explains the model without publishing the private implementation or treating current deployment choices as requirements of the architecture.

The implementation owner is the private `zevarix/lyra-memory` repository. Its source and operational evidence remain intentionally access-restricted; this public repository does not mirror them.

## Public site

https://zevarix.github.io/lyra-memory-architecture/

## Scope

This repository owns the public explanation of:

- the Lyra Memory conceptual model;
- architecture and design principles;
- neutral comparison research against other memory approaches;
- adoption questions and decision guidance;
- synthetic examples;
- public maturity and roadmap notes;
- eventual provider-neutral portable contract/specification work.

It does **not** contain:

- real memory records or raw conversations;
- private implementation source;
- deployment configuration or credentials;
- private project topology;
- authentication identities;
- private acceptance evidence;
- a public reference implementation.

## Architecture boundary

Lyra Memory is durable associative context/significance. It does not replace:

- current canonical repositories, APIs, databases, policy, or user direction;
- Session Continuity for unresolved execution recovery;
- MemPalace for local semantic/index/navigation across durable memory and canonical-source pointers;
- identity canon for current agent identity; the separate public [Agent Identity Canon](https://zevarix.github.io/agent-identity-canon/) project provides a reusable framework without becoming a Lyra Memory dependency.

A retrieved memory is context. It is never execution authority.

## Pairing with Agent Identity Canon

Lyra Memory and Agent Identity Canon can be used independently.

- Use Lyra Memory alone when the main need is durable associative context, provenance, and retrieval.
- Use Agent Identity Canon alone when the main need is a stable, inspectable current identity.
- Use both when a long-lived agent should be able to evolve while preserving the history, influences, and reasons that explain how its current identity developed.

Pairing can keep current identity concise, preserve explainable change, improve continuity across context boundaries, and make influence easier to inspect without turning memory into current identity or canon into a history store.

The pairing is architectural; it does not imply an automatic synchronization bridge. Memory may inform identity review, but current canon remains authoritative for who the agent is now.

## Current maturity

The private prototype proves the narrow memory lifecycle, provenance, associations, correction history, deterministic retrieval baseline, and cross-conversation retrieval. Hard role-bound runtime enforcement, vector/graph evaluation at scale, the full Lyra Memory ↔ MemPalace bridge/reconciliation contract, stable public contracts, and a public reference implementation are not claimed as complete.

See:

- [Research sources](docs/RESEARCH-SOURCES.md)
- [Reference implementation readiness](docs/REFERENCE-IMPLEMENTATION-READINESS.md)

## Public-repository boundary

This repository is public from its first commit. Use synthetic examples only. Do not copy private implementation details here merely to make the explanation feel complete.

No source-code or documentation license has been selected yet. Do not add one without the appropriate decision.
