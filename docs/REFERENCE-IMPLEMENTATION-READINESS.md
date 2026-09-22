# Public reference implementation readiness

A reference implementation is intentionally **not** part of the first public release.

The architecture should earn a stable public implementation boundary before code is published.

## Required gates

### 1. Portable core contracts

Define provider-neutral contracts where practical for:

- memory record identity and lifecycle;
- provenance pointers and evidence classification;
- retrieval cues and associations;
- search/get/write behavior;
- supersession and invalidation;
- failure and unavailable-memory behavior.

Do not bake the current private storage provider into the conceptual definition unless a real invariant requires it.

### 2. Synthetic fixtures

Build a complete public fixture corpus with invented people, projects, repositories, events, corrections, and retrieval cues.

No sanitized copy of real private memory should be used as a shortcut.

### 3. Enforced read / curator separation

The public reference should prove that a read-only client cannot discover or invoke mutation operations, and that write capability depends on trusted runtime identity rather than a prompt claiming a role.

### 4. Threat model

Document at minimum:

- credential boundaries;
- cross-tenant/user isolation;
- prompt-injection and untrusted-memory handling;
- provenance spoofing;
- over-broad retrieval;
- write poisoning / memory confetti;
- sensitive-domain leakage;
- deletion and backup implications;
- replay/idempotency for mutations.

### 5. Deletion, retention, and correction semantics

Specify what supersession preserves, what invalidation means, when hard deletion is required, and how backups/derived indexes are handled.

### 6. Retrieval evaluation

Measure a deterministic baseline before adding complexity.

Evaluate:

- relevant recall;
- false-positive retrieval;
- stale/invalid memory leakage;
- cue retrieval;
- provenance usefulness;
- correction behavior;
- graceful failure.

Only add vectors, rerankers, or graph machinery when they improve a defined problem enough to justify their operational cost.

### 7. Scale

Do not publish unsupported scale claims.

Test representative behavior at increasing corpus sizes and report the actual environment, workload, index strategy, and limitations.

### 8. Clean public implementation boundary

A future public codebase must have:

- no private Git history to scrub;
- no real memories or private fixtures;
- no deployment secrets/configuration;
- no private topology assumptions;
- replaceable provider adapters where practical;
- deterministic conformance tests.

A separate public reference repository should be created only if the implementation earns a lifecycle distinct from this architecture/specification repository.

### 9. Project hygiene

Before public code release:

- security policy;
- contribution guidance;
- support/maturity statement;
- secret/history scan;
- reproducible setup and tests;
- explicit compatibility policy;
- explicit licensing decision under the appropriate authority.

## Release gate

The architecture may move from “public explanation” to “public reference implementation” only after the portable contract, security model, synthetic conformance suite, and implementation/publication boundary are all concrete enough that the code teaches the architecture without leaking the private deployment.
