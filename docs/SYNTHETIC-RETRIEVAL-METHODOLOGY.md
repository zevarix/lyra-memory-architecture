# Synthetic retrieval evaluation methodology

Status: diagnostic methodology draft, 2026-10-02. No provider winner or production-quality claim.

## What this can establish

The experiment asks whether a retrieval change fixes concrete failure modes while preserving scope, provenance and correction behavior. It separates candidate discovery from safe, useful retrieval. The methodology does not evaluate an entire memory product by substituting one embedding model into a small script.

All records and questions must be invented from scratch. Do not sanitize real conversations, copy private artifacts, or publish implementation source, private revision identifiers, operational paths or private acceptance evidence. Public replication should use an independently publishable baseline and synthetic fixtures.

## Initial diagnostic design

The initial design uses 30 fictional records and 40 hand-authored queries: 10 development queries and 30 held-out queries, fixed before neural tuning. This is intentionally small enough to inspect every failure. The initial categories are:

- paraphrased decisions and weak associative cues;
- current-owner and canonical-source pointer requests;
- similar but distinct preferences;
- superseded and invalidated records;
- explicit graph associations;
- authorized and unauthorized scopes;
- provenance-bearing records;
- substring false positives;
- queries with no eligible answer.

The fictional examples are diagnostic, not sampled estimates of any user's workload. Keep development and held-out examples visibly distinct. If a held-out error inspires a rule, freeze the old result and validate the rule on a new untouched set.

## Separate episodic supplement: version 2

The episodic supplement is a new dataset version, created after the initial diagnostic. It does not replace or extend the original held-out set retroactively. It contains **38 synthetic index entries and 18 new queries**: eight fictional episodes alongside the original 30 durable-context distractors. Four queries are development cases; fourteen are held out, including twelve answerable cases and two near-miss no-answer cases.

Each fictional episode has a source-bounded manifest and narrative, with ordered events, participants, cues, provenance and artifact references. These are artifact-index entries, not proposed new durable-memory records. The experiment preserves the distinction between canonical episode ownership and semantic discovery.

The supplement distinguishes two experimental arms:

- **Matched serialization:** apply the same model adapters to a shared representation of each manifest, enabling a narrow retrieval-algorithm comparison.
- **Actual product ingestion/readback:** independently exercise MemPalace with exact manifest content and check its emitted canonical locator and stored bytes. A serialization proxy is not evidence that the product's ingestion contract was exercised.

All four development queries are answerable, so they cannot calibrate abstention. Any thresholds transferred from the original development set must be labeled as transferred; do not tune them on the new held-out results. Only six of the eight episodes are held-out query subjects, and multiple questions concern the same episode. They are not statistically independent samples.

Score indirect cue retrieval and sequence-related queries separately. Check artifact readback, content preservation and source locators independently of ranking. Finding an episode or following an evaluator-owned ID mapping does not prove that a runtime returned the correct source path, nor that an assistant can accurately retell its chronology.

The fixture author also supplies the relevance labels; an independently blinded judgment pass is still needed. Local ingestion and ranking do not validate MCP transport, hosted-provider operations or generated narrative faithfulness.

This remains a tiny smoke test. It cannot demonstrate preservation parity or justify replacing an existing companion. Broader gates include indirect unfiltered retrieval, source updates, duplicate handling, invalidation/deletion, scoped disclosure, transport behavior, complete artifact recovery and length/chunking sensitivity. Do not combine the two dataset versions into one aggregate or treat the supplement as untouched validation of rules designed after the first experiment.

## Candidate modes

Compare these at a fixed retrieval budget, initially top five:

1. A deterministic lexical baseline, with its exact tokenization, matching and tie rules described.
2. Neural retrieval with a pinned `all-MiniLM-L6-v2` model.
3. Neural retrieval with a pinned `gte-small` model.
4. Fixed lexical/neural reciprocal-rank fusion, initially constant 60, specified before held-out inspection.
5. A separately labeled eligibility-gate experiment using explicit scope and pointer-intent annotations.

The fifth mode tests a policy design with known labels. It does not prove that a runtime reliably infers intent or authenticates caller scope. Do not credit a retriever with a security capability supplied by the evaluator.

Neural vectors must come from the named models. A hashing, bag-of-words or TF-IDF proxy may be a useful baseline but must not be described as neural semantic retrieval. Use the same admitted text for model comparisons; report chunking, normalization, truncation and embedding-field choices. Model weights, tokenizer versions, package versions and reproducible synthetic artifacts should be pinned before public replication.

## Labels and metrics

Define two distinct relevance sets for each query:

- **Semantic relevance:** records related to the meaning of the query, including historical records when explicitly labeled relevant to that meaning.
- **Eligible/current relevance:** records that may appropriately be returned under the query's declared scope, lifecycle and requested source role.

Do not collapse these into one “accuracy” score. A semantically similar stale or out-of-scope record can be a retrieval success and a governance failure.

Report:

- Recall@5: fraction of labeled relevant records recovered, with the averaging and denominator stated.
- MRR@5: reciprocal rank of the first relevant result; zero if no relevant result appears.
- nDCG@5 for explicitly graded semantic labels, documenting the gain function.
- No-answer false-positive rate: fraction of queries with no eligible answer that still return candidates. Report the raw numerator and denominator.
- Stale, invalidated, wrong-scope and otherwise forbidden candidate counts, before and after any eligibility gate.
- Structural provenance presence: whether returned records contain the required provenance fields. This is not a measurement of source validity, accessibility or authority.
- Per-category and per-query failures, so a high mean does not hide a critical boundary failure.

Report query count and eligible-answer count beside every aggregate. State how multiple correct records, empty relevant sets, duplicate candidates and ties are handled. If a denominator differs between semantic and eligible metrics, disclose it. Small held-out groups should not be dressed up as precise population estimates.

## Correctness experiments beyond ranking

Use synthetic records to test these independently:

- A corrected record is found; its predecessor is not returned as current.
- An invalidated record remains excluded from normal recall.
- A historical query explicitly requests a past state and receives correctly labeled history.
- A pointer request yields the owner reference, rather than an invented answer attributed to the memory store.
- A source cannot be opened, moved, or disappeared: the system reports the limitation.
- Graph expansion preserves scope, lifecycle and source-role restrictions.
- A malicious instruction embedded in a retrieved record does not acquire authority.
- A reader cannot mutate records, even when it supplies a curator-looking argument.
- Deletion propagates to derived indexes, snippets and caches within a specified bound.

A script that filters annotated rows can demonstrate filtering logic. Role enforcement, authorization, deletion propagation and unavailable-source handling require tests against the actual runtime boundaries before they can be called validated.

## Operational experiments

Separately measure increasing corpus sizes and concurrency. Report cold and warm conditions, hardware/service tier, region, index parameters, model-loading time, ingestion throughput, p50/p95 latency, error rate and resource usage. Include embedding time and network latency instead of reporting database query latency as end-to-end latency.

Use an exact vector baseline when testing approximate indexes. Measure filtered recall rather than assuming an unfiltered nearest-neighbor result remains representative after access filters. Run export/rebuild, paused/unavailable service, interrupted ingestion and rollback exercises with synthetic data.

Hosting experiments must use equivalent data, model, access rules and budgets to support any comparison. Different metrics, datasets, splits or retrieval budgets must not appear as a shared product leaderboard.

## Evidence ledger

For every result, record:

- public synthetic corpus and query-set version;
- independently publishable baseline description;
- model and runtime versions;
- fixed parameters and development/tuning history;
- actual run status: completed, failed, blocked or not run;
- raw counts, aggregate metrics and failure examples;
- the difference between tested behavior and remaining assumptions.

If a model download, runtime or service is unavailable, mark that mode untested. A partial run does not count as a zero score, and an intended experiment is not a measured result.

## Upstream product-benchmark guidance

MemPalace's [official Private Palace benchmark guide](https://github.com/MemPalace/mempalace/blob/v3.10.0/benchmarks/PRIVATE_PALACE.md) recommends at least 50 development and 100 held-out questions, blinded graded judgments and repeated, interleaved runs. It distinguishes in-process algorithm timings from transport-boundary timings and labels recall based on incomplete judgments as pooled recall. It also requires attention to read-only access and corpus consistency. These are upstream evaluation practices, not capabilities established by the small fixtures here.

Use this guidance when designing a larger authorized evaluation. Keep private datasets and reports private even if they omit record text: identifiers, queries and relevance judgments may themselves disclose information. Public reports should use wholly synthetic data and independently reviewable artifacts.

## Publication status

This document defines the experiment. It intentionally contains no measured results pending review of reproducibility and the public/private boundary. Any subsequent results note must describe the actual completed runs and omit private source code, topology, provenance paths and revision identifiers.

The decision gate is a demonstrated improvement on a defined retrieval problem without unacceptable governance regressions, alongside a credible cost and recovery plan. A small synthetic improvement is grounds for a larger validation experiment, not automatic migration.
