# Plan Template (Spec-Kit Compatible)

> This template is used by `/speckit.plan`.
> For the full template, see `.ai/templates/phase-template.md`.
> This file exists for Spec-Kit tool compatibility.

When `/speckit.plan` is invoked, the agent should:

1. Read `specs/<feature>/spec.md` and `.ai/templates/phase-template.md`.
2. Create `specs/<feature>/plan.md` with: tech stack, module boundaries, file creation plan, risks, task breakdown.
3. Draft `specs/<feature>/api-contract.md` (Contract-First).
4. Create ADRs if needed.
5. Run `/speckit.analyze` to check consistency.

See `.ai/templates/phase-template.md` for the complete structure.
