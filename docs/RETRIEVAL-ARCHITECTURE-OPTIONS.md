# Retrieval architecture options

Primary-source review: 2026-10-02. Status: research and provisional architectural direction; migration decision deferred.

## Scope and evidence

This comparison concerns storage and retrieval choices for a governed associative-memory architecture. It is not a product ranking, production deployment description, or claim of benchmark superiority. Different products solve different problems, and a retrieval engine does not by itself supply memory governance.

- **Documented** means described in the linked upstream documentation as reviewed on the date above.
- **Planned** means a proposed design or acceptance requirement, not a demonstrated integration.
- **Measured** requires an identified, reproducible experiment with its environment and limitations. This document reports no measured provider comparison.
- **Experimental** means a hypothesis being tested. A small synthetic diagnostic cannot establish production fitness.

The public maturity statement remains unchanged: the narrow prototype has demonstrated memory lifecycle, provenance, associations and deterministic retrieval. Hard role-bound runtime enforcement, corpus-scale vector/graph evaluation, the complete companion bridge and a stable public portable contract remain unproven. See [research sources](RESEARCH-SOURCES.md) and [reference implementation readiness](REFERENCE-IMPLEMENTATION-READINESS.md).

## Ownership before infrastructure

The conceptual owners remain separate even if some tables share one database:

- **Lyra Memory:** admitted durable context, significance, provenance and correction lifecycle.
- **MemPalace:** semantic/index/navigation companion and pointers to richer sources.
- **Canonical systems:** current artifacts, facts and execution authority.
- **Session Continuity:** unfinished execution and recovery.
- **Identity canon:** current agent identity, when applicable. Remembered history can inform review but cannot silently rewrite canon.

When identity canon and memory are used together, canon can keep the current self concise while memory preserves durable context, provenance and history explaining how that identity developed. This pairing may improve continuity and explainability, but it implies neither automatic synchronization nor memory-to-canon writeback. Retrieved context may inform a deliberate identity review; current canon remains authoritative.

A retrieval result is context, never permission. Physical consolidation must not collapse these roles. Physical separation must not create two writable owners of the same fact.

## Options and acceptance questions

### 1. Improve the split architecture

Keep a governed durable store and a separate search/navigation companion. Improve scoped lexical retrieval, explicit pointer handling and the reconciliation contract before changing storage.

**Potential fit:** distinct lifecycle and navigation roles; an independently rebuildable index; local/offline discovery when its data permissions allow it.

**Tradeoffs:** duplicate representations can drift. Deletion, supersession and source movement require propagation; stale snippets may survive unless every return path checks eligibility. Availability and debugging span more components.

**Planned acceptance:** versioned index records, idempotent updates, a reconciliation cursor, explicit stale/unavailable responses, deletion acknowledgements, and a rebuild from authoritative admitted records. Never infer current truth from whichever replica answers first.

### 2. Consolidate governed records and search in Postgres

Keep the public contracts and role boundaries, but colocate admitted records, lexical search, embeddings and associations. Supabase documents a hybrid approach using PostgreSQL full-text search, pgvector and reciprocal-rank fusion. This is an available implementation pattern, not evidence that it improves this workload. [Supabase hybrid-search guide](https://supabase.com/docs/guides/ai/hybrid-search)

**Potential fit:** one transactional lifecycle for authoritative memory records and derived retrieval metadata; existing Postgres experience; fewer synchronization boundaries.

**Tradeoffs:** shared compute, storage and failure domain; index maintenance and embedding backfills compete with ordinary queries. Product-specific authentication, functions and storage can create portability work beyond SQL. A colocated vector index still needs explicit scope and lifecycle filtering.

**Planned acceptance:** compare exact lexical, vector and hybrid retrieval under identical eligibility rules; use exact vector search as the correctness reference before approximate indexes. pgvector supports exact search and approximate HNSW/IVFFlat indexes, with different speed/recall behavior. [pgvector upstream](https://github.com/pgvector/pgvector)

### 3. MemPalace with a Postgres/pgvector backend

The pgvector backend is present in the tagged v3.9.0 README. v3.10.0 adds an opt-in shared namespace so clients with different local palace paths can select the same backend table set. These are documented capabilities, not a verified deployment or a complete distributed-memory contract. [v3.9.0 README](https://github.com/MemPalace/mempalace/blob/v3.9.0/README.md), [v3.10.0 changelog](https://github.com/MemPalace/mempalace/blob/v3.10.0/CHANGELOG.md)

MemPalace also documents a temporal entity/relationship graph backed by local SQLite. Its shared-brain guide describes a separate SQLite logstream and recommends one hub for shared recall. Peer synchronization covers coordination events/artifacts; it must not be mistaken for replication of all memory and graph state. Shared vector tables do not make the entire application stateless. [Upstream README](https://github.com/MemPalace/mempalace/blob/v3.10.0/README.md), [shared-brain guide](https://mempalaceofficial.com/guide/shared-brain.html)

**Potential fit:** retain MemPalace navigation while centralizing its supported vector/text backend.

**Tradeoffs:** govern local graph/coordination state as well as remote tables. Namespace configuration is not a substitute for authorization. Shared storage does not prove safe multiwriter behavior for every subsystem.

**Planned acceptance:** pin compatible versions; verify namespace isolation, one-hub failure/recovery, full-state backup, lifecycle propagation and read/curator separation. Do not assume an upstream namespace feature completes the Lyra Memory bridge.

### 4. Self-hosted open-source components

Candidate implementations include Postgres plus pgvector or a separately operated Qdrant engine with a governed record owner. Qdrant documents dense/sparse retrieval and fusion through its query API. These capabilities support experiments; they do not establish superior retrieval for this corpus. [pgvector upstream](https://github.com/pgvector/pgvector), [Qdrant hybrid queries](https://qdrant.tech/documentation/search/hybrid-queries/)

**Potential fit:** control over data locality, versions, deployment policy and backup schedules.

**Tradeoffs:** the operator owns patching, monitoring, capacity, secure access, restore testing and incident response. Local embedding inference consumes compute and has model/download requirements. Open-source software and spare hardware do not imply zero total cost.

**Planned acceptance:** a clean recovery exercise, documented availability target, an upgrade/rollback rehearsal and an honest operator-time budget. Compare a minimal installation with a full platform only when the extra services are actually needed.

### 5. Qdrant Cloud Free as a derived retrieval service

Documented Free resources are one node, 0.5 vCPU, 1 GB RAM and 4 GB disk, with limited regions, downtime during upgrades and manual snapshots/restores through the API. The official policy suspends inactive free clusters after one week and deletes them after four weeks if not reactivated. [Qdrant cluster documentation](https://qdrant.tech/documentation/cloud/create-cluster/)

**Potential fit:** an isolated, replaceable retrieval experiment or derived index whose loss can be recovered from a governed source.

**Tradeoffs:** another service and synchronization boundary; finite capacity and recovery work; embedding production, source governance and canonical artifacts still need owners. Vendor capacity estimates are not sizing guarantees for a corpus with payloads and indexes.

**Planned acceptance:** export and rebuild before relying on the tier; measure filtered retrieval and reconciliation; explicitly budget service inactivity and recovery. A deletable free index must not be the only durable copy.

### 6. Neon Postgres as a fallback provider

Neon provides a Postgres-based alternative for a portable SQL/pgvector design. It should be evaluated as a host substitution with an application-layer migration, not assumed to reproduce another platform's functions, authentication or storage services. [Neon pgvector documentation](https://neon.com/docs/extensions/pgvector)

The current official Free plan documentation lists 1 GB of Postgres storage per project, with a separate 20 GB total cap across all projects; 100 CU-hours per project/month; and 5 GB of public network transfer per project/month. Compute scales to zero after five minutes of inactivity, and Free users cannot disable this behavior. Recheck plan and account limits before provisioning or sizing. [Official plan documentation](https://github.com/neondatabase/website/blob/main/content/docs/introduction/plans.md)

**Potential fit:** preserve a replaceable Postgres storage boundary and avoid making the architecture depend on one managed platform.

**Tradeoffs:** cold-start behavior, monthly compute budget, connection behavior, extension compatibility and restore features require testing. A logical SQL export alone does not migrate service-specific APIs or permissions.

## Supabase free-tier and embedding considerations

The reviewed Free plan includes 500 MB of database capacity, 1 GB file storage and 5 GB uncached egress; automatic backups are not included. Low-activity projects may pause. The backup documentation recommends regular off-site logical exports for Free projects. These constraints matter even when service charges remain zero. [Pricing](https://supabase.com/pricing), [pausing](https://supabase.com/docs/guides/platform/free-project-pausing), [backup guidance](https://supabase.com/docs/guides/platform/backups)

Supabase supports built-in `gte-small` embeddings in Edge Functions without an external embedding API. The documented model is English-focused and truncates beyond 512 tokens. Free includes 500,000 Edge Function invocations; this can avoid a separate embedding API bill within applicable quotas, but is not unlimited free inference or proof of suitability for multilingual or long-form memories. Check runtime limits and model behavior before selecting it. [AI model documentation](https://supabase.com/docs/guides/functions/ai-models), [function quotas](https://supabase.com/docs/guides/functions/pricing)

Database storage and vector-index storage are not interchangeable with object-storage quotas. Embeddings, metadata, indexes and correction history must all fit the relevant resource budget.

## Cost model

Compare total operating cost at the same admitted-corpus size, growth rate, query rate, privacy boundary and recovery objective. Record:

1. Database/vector storage, index overhead, compute and idle capacity.
2. Embedding ingestion, query embeddings, retries, model downloads, re-embedding and optional reranking.
3. Application/worker hosting and network transfer, including cross-provider traffic.
4. Backups, artifact storage, retention and restore drills.
5. Monitoring, upgrades, security maintenance and operator time.
6. Reconciliation, export, provider migration and rollback.
7. Reliability costs: pause recovery, cold starts, failed retrieval and loss of a free-tier resource.

Keep measured usage separate from estimated prices. Report recurring cash costs, one-off migration effort and operator hours separately; do not hide them in a single “free” label. Recheck prices before a purchase or provider decision.

## Governance requirements shared by every option

- Preserve source pointers, source type, observation time, effective time and confidence separately. A plausible association is not a verified fact.
- Supersession should retain an inspectable correction chain where allowed; invalidation must remove a record from ordinary current retrieval. Hard deletion and backup retention need their own semantics.
- Filter by authorized scope and lifecycle before disclosure, including snippets, reranking requests, graph expansion and caches. Similarity is not access control.
- Separate authenticated reader and curator capabilities at the service boundary. A role string in a prompt, metadata or tool argument is not trusted identity.
- Treat retrieved instructions as untrusted source content. Memory cannot grant new tool permissions or override current owner direction.
- Minimize exported text and embedding inputs. Embeddings can encode sensitive information and are not anonymization.
- Keep canonical verification explicit before consequential action. Returning a provenance field proves only that the field exists until its target and claim are checked.

## Portability and migration gates

A proposed portable export includes stable record IDs, schema version, text/cues, lifecycle, correction links, scoped provenance, timestamps and associations. Derived embeddings additionally need model/version, dimensions, normalization and content-version metadata. Do not compare vectors from incompatible embedding spaces.

Before changing the live owner or index:

1. Verify complete export and restore, including authoritative records, correction history and artifacts that SQL dumps may omit.
2. Regenerate derived indexes from exported records and compare identifiers, counts, lifecycle and retrieval behavior.
3. Replay duplicate and out-of-order changes, interruptions, deletions and source movement.
4. Run scoped read/curator security tests against the real service boundary.
5. Shadow representative queries and classify disagreements; do not promote based only on mean recall.
6. Rehearse a bounded cutover and rollback with a clear writable owner at every stage.
7. Retire old copies only after retention, access and recovery requirements are satisfied.

These are proposed gates, not claims that a migration or public reference implementation has been completed.

## Provisional direction and decision record

**Retain the distinct durable-significance store, canonical episode artifacts and semantic/index companion. Improve retrieval and provenance before considering migration.** This is a conservative architectural choice, not a vendor ranking or a claim of long-term superiority.

The roles address different needs: admitted memory preserves significance and correction history; canonical artifacts preserve rich source-bounded episodes; the companion supports discovery and navigation. Small diagnostic experiments can expose useful defects but cannot establish that replacing one role or provider preserves the full behavior of the system.

MemPalace remains a substantive retrieval candidate, including for episodic material and source-code navigation; its documented capabilities should not be reduced to a generic vector-store label. A proposed consolidated Supabase/Postgres semantic path remains an experimental alternative. No product-parity result, replacement threshold or production-scale advantage is established by this public research.

The next decision should depend on reproducible held-out retrieval evidence, preservation of source/correction semantics, real runtime security tests, operating costs and a successful recovery/migration rehearsal. MemPalace's [official Private Palace benchmark guide](https://github.com/MemPalace/mempalace/blob/v3.10.0/benchmarks/PRIVATE_PALACE.md) provides a more demanding evaluation pattern than a tiny smoke fixture, including blinded judgments and separation of transport-boundary from in-process timings.

**Migration outcome: deferred.** Record any later change with its demonstrated benefit, costs, rejected assumptions, remaining risks and rollback conditions. Until then, strengthen the current ownership boundaries rather than interpreting an isolated retrieval score as a mandate to consolidate.
