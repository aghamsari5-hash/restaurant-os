# Spec Template (Spec-Kit Compatible)

> This template is used by `/speckit.specify`.
> For the full template, see `.ai/templates/feature-spec-template.md`.
> This file exists for Spec-Kit tool compatibility.

When `/speckit.specify` is invoked, the agent should:

1. Read `.ai/templates/feature-spec-template.md` as the canonical template.
2. Create `specs/<feature>/spec.md` from it.
3. Fill every section — no TODOs.
4. Run `/speckit.clarify` before proceeding to plan.

See `.ai/templates/feature-spec-template.md` for the complete structure.
