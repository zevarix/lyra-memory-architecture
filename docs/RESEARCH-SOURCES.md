# Comparison research sources

Last primary-source review: 2026-09-22.

This note records the public evidence used for the first architecture page. It is intentionally a claim-boundary note, not a competitive ranking.

## ChatGPT Memory

Primary source:

- https://help.openai.com/en/articles/8590148-memory-faq

Claims used:

- ChatGPT Memory can use relevant preferences/details from chats and other available sources.
- Available controls and source types vary by plan, region, platform, and workspace.
- Saved memory and remembered context can be corrected or removed through product controls.
- Memory is a product personalization/continuity feature; this page does not infer an undocumented developer-side storage architecture.

## Mem0

Primary sources:

- https://docs.mem0.ai/core-concepts/how-it-works
- https://docs.mem0.ai/platform/features/graph-memory
- upstream documentation in https://github.com/mem0ai/mem0

Claims used:

- Mem0 extracts reusable memories from messages and retrieves relevant memories before model calls.
- Current retrieval documentation describes semantic, keyword, entity, and temporal signals.
- Mem0 Platform provides built-in graph memory based on entities and cross-memory connections.
- Current upstream migration docs distinguish Platform graph memory from the OSS retrieval path.

Claims deliberately avoided:

- benchmark superiority claims;
- treating older external-graph-store documentation as the current OSS architecture;
- implying its graph model and Graphiti's temporal graph have the same semantics.

## Zep / Graphiti

Primary sources:

- https://help.getzep.com/v2/graphiti/getting-started/overview
- https://help.getzep.com/facts
- https://help.getzep.com/zep-vs-graphiti

Claims used:

- Graphiti is an open-source temporal knowledge-graph framework.
- It models entities/edges/facts with temporal validity and fact invalidation.
- Zep builds managed agent-memory/context infrastructure on Graphiti at larger scale.

Public comparison boundary:

Graphiti/Zep currently has a substantially richer temporal graph model than the private Lyra Memory prototype. The comparison should explain a different governance target rather than imply equivalent graph maturity.

## Letta

Primary sources:

- https://docs.letta.com/
- https://docs.letta.com/tutorials/attaching-detaching-blocks/
- current SDK documentation under https://docs.letta.com/api/

Claims used:

- Letta presents itself as a platform for stateful agents.
- Memory blocks are persistent editable sections of an agent's context and can be shared/attached/detached.
- Letta also exposes archival memory/search beyond immediate in-context blocks.

Public comparison boundary:

Letta is a much more developed persistent-agent runtime. Lyra Memory should not be described as replacing an agent runtime.

## OpenViking

Primary sources:

- https://www.openviking.ai/docs
- https://docs.openviking.ai/en/concepts/02-context-types

Claims used:

- OpenViking describes itself as an open-source context database for AI agents.
- It organizes resources, memories, and skills in one virtual-filesystem model.
- It supports layered context and retrieval/navigation across those types.
- Session commits can drive memory extraction.

Public comparison boundary:

OpenViking's unification is a deliberate architectural choice. Lyra Memory's separation of memory, documents/resources, skills, identity, unfinished work, and owner truth is also deliberate; neither framing should be presented as universally superior.

## LangMem

Primary source:

- https://langchain-ai.github.io/langmem/concepts/conceptual_guide/

Claims used:

- LangMem describes semantic, episodic, and procedural memory.
- Memory formation can occur in the active/hot path or in the background.
- Core memory primitives can be used without a specific storage layer, with stateful integration available through LangGraph.

Public comparison boundary:

LangMem offers richer memory-formation primitives. Lyra Memory's current emphasis is governance around persistence, provenance, correction, and authority boundaries.

## Lyra Memory claim discipline

The public page may say the current private prototype has demonstrated:

- durable structured memory records;
- provenance pointers and associations;
- active/superseded/invalidated lifecycle behavior;
- narrow memory operations;
- deterministic text/cue/tag retrieval;
- privacy/domain routing rules;
- fresh-conversation retrieval.

The public page must not claim as complete without new evidence:

- cryptographic per-agent role enforcement;
- vector embeddings as the live retrieval baseline;
- graph equivalence with temporal knowledge-graph systems;
- corpus-scale performance;
- a stable portable public specification;
- a supported public reference implementation.

Re-run this research before materially changing comparison claims.
