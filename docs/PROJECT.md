# Project context

## Purpose

Explain Lyra Memory as a public architecture before any implementation is open-sourced.

## Intended readers

Agent/application engineers, researchers, architects, and technically curious readers evaluating long-term-memory designs.

## First deliverable

A public static architecture/explainer page that:

- explains the motivation and authority-separation thesis;
- documents the layered architecture;
- compares the model neutrally with current memory approaches using first-party sources;
- provides serious adoption questions rather than marketing claims;
- uses synthetic examples;
- distinguishes current proof from experimental/planned work;
- defines the gate to a future public reference implementation.

## Repository identity

Repository: zevarix/lyra-memory-architecture

Visibility: public

Default branch: main

Planning: GitHub Issues are sufficient for current scope; no separate Project is required yet.

Portfolio automation: disenrolled because the repository is public.

Autonomous shared/flex worker execution: not applicable under the current public-repository boundary.

## Non-goals

- Publishing the private implementation.
- Publishing real memory content.
- Publishing private operational/security topology.
- Making the conceptual model depend on the current storage/provider choice.
- Choosing a public source-code/documentation license before an explicit decision.
- Creating a separate public reference-implementation repository before that boundary earns existence.

## Stack

Dependency-free static HTML and CSS served by GitHub Pages.

No client JavaScript is required for the initial site.

No analytics, tracking pixels, hosted fonts, cookies, or external runtime dependencies are used.

## Validation

At minimum:

- HTML can be parsed and expected sections/links exist;
- CSS is present and referenced correctly;
- public repository contains no obvious secret patterns;
- examples are synthetic;
- research links resolve to the intended first-party sources;
- Git diff is clean after commit;
- GitHub Pages public readback succeeds.

## Deployment

GitHub Pages from the public repository's main branch.

Publishing this site does not publish the private implementation or grant any execution authority to readers or contributors.
