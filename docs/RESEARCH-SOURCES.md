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

## Composability research boundary

The public architecture explains that multiple memory/context systems can be composed when they own different jobs. This is an architectural interpretation, not a claim that every combination ships with a supported direct integration.

### MemPalace

Current Lyra control defines MemPalace as the local semantic/index/navigation companion rather than the online durable-memory owner. Its useful role is discovery across durable memory and canonical-source pointers while canonical repositories/systems remain authoritative.

The public page deliberately does **not** claim that the full Lyra Memory ↔ MemPalace bridge, bidirectional synchronization, or offline/online reconciliation contract is complete.

### LangMem

Primary source:

- https://langchain-ai.github.io/langmem/concepts/conceptual_guide/

Composition basis:

- LangMem's core memory functions do not require a specific storage layer.
- It provides memory extraction, consolidation, prompt optimization, hot-path formation, and background formation.
- It can therefore conceptually sit above a separately governed durable store as a formation layer.

The public page does not claim a built-in Lyra Memory adapter.

### Graphiti / Zep

Primary sources:

- https://help.getzep.com/v2/graphiti/getting-started/overview
- https://help.getzep.com/facts
- https://help.getzep.com/graph-overview

Composition basis:

- Graphiti models changing entities, relationships, and facts with temporal validity and hybrid retrieval.
- Zep operates temporal context graphs as managed agent memory/context infrastructure at larger scale.
- A temporal graph can complement a separately governed durable-significance layer when ownership of changing facts is explicit.

The public page does not suggest independently writing the same fact into both systems without reconciliation.

### Mem0

Primary sources:

- https://docs.mem0.ai/core-concepts/how-it-works
- https://docs.mem0.ai/platform/features/graph-memory

Composition basis:

- Mem0 combines extraction with semantic, keyword, entity, and temporal retrieval signals.
- Mem0 Platform also builds native graph connections across memories.
- It can therefore serve a broader extraction/retrieval role while another layer owns a narrower class of curated, authority-sensitive durable memories.

The public page treats duplicate writable ownership as a design risk, not as an integration feature.

### Letta

Primary source:

- https://docs.letta.com/

Composition basis:

- Letta is a stateful agent runtime with persistent memory capabilities.
- A runtime memory/state layer can coexist with a broader cross-runtime durable-memory service when copied state has a clear owner and lifecycle.

The public page does not claim a built-in Lyra Memory adapter.

### OpenViking

Primary sources:

- https://docs.openviking.ai/en/
- https://docs.openviking.ai/en/concepts/02-context-types

Composition basis:

- OpenViking intentionally unifies Resources, Memories, and Skills in one context database and supports unified search.
- Pairing it with a narrower governed memory owner is therefore possible only with a deliberate ownership split because the systems overlap substantially.

### ChatGPT Memory

Primary source:

- https://help.openai.com/en/articles/8590148-memory-faq

Composition basis:

- ChatGPT Memory is product-level personalization/continuity using relevant context from chats and other available sources.
- It can coexist with an application-controlled memory service, but the public page does not describe it as a programmable backend integration.

## Composition rule

Combine systems when each owns a distinct job such as:

- memory formation or consolidation;
- durable storage/lifecycle;
- semantic, graph, or temporal retrieval;
- agent-runtime context;
- canonical evidence/current truth.

When two systems would both be writable owners of the same fact, define synchronization, conflict resolution, deletion, and authority semantics first—or choose one owner.

## Associative-cue design inspiration

Part of the Product/design origin for the architecture is the everyday observation that a person may not be actively recalling something, yet a small sensory or contextual cue—such as a smell, place, phrase, or object—can bring that memory back into focus.

The public architecture uses this only as an engineering metaphor for cue-driven retrieval:

- a durable memory can carry small associative cues;
- a semantic/index companion can help indirect cues recover candidate memories or source pointers;
- retrieval from a cue does not prove that the retrieved memory is current, correct, or authoritative;
- canonical evidence still must be checked before material action.

The public page does **not** claim that Lyra Memory or MemPalace reproduces biological memory, human cognition, consciousness, or sensory processing.
