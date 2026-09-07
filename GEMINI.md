# GEMINI.md — Gemini CLI Extensions for RestaurantOS

> Extends `AGENTS.md` with Gemini-specific instructions.
> Gemini CLI reads this file natively. Keep shared rules in `AGENTS.md`; put only Gemini-specific overrides here.

---

## 1. Model Selection

- Use **Gemini 2.5 Pro** for: architecture, planning, code review, and complex multi-file tasks.
- Use **Gemini 2.5 Flash** for: quick file edits, single-function changes, and lint fixes.
- For Google AI Studio UI generation, use the Studio model configured in `.ai/workflows/google-ai-studio.md`.

---

## 2. Google AI Studio Integration

This project uses Google AI Studio as the **primary UI design tool** (Phase 2).

- When the user provides a **screenshot, Figma link, or AI Studio export**, treat it as the `DESIGN_REFERENCE` in the prompt architecture.
- Before coding, you MUST analyze the design reference and produce a `design-analysis.md` (see `.ai/templates/design-analysis.md`).
- Implement ONLY the phase specified in `specs/<phase>/spec.md` — do not jump ahead.

See `.ai/workflows/google-ai-studio.md` for the full 7-step workflow and prompt templates.

---

## 3. Context Window Strategy

Gemini has a large context window — use it wisely:

- Load `AGENTS.md` + `CONSTITUTION.md` + current `specs/<phase>/spec.md` + relevant `SKILL.md` at session start.
- For large codebases, prefer `read_file` on specific modules over loading everything.
- When context is tight, prioritize: Constitution > Spec > Plan > Skill > Code.

---

## 4. Tool Usage

- Prefer `read_file` before `edit_file` — never edit blindly.
- Use `bash` for verification (`npm run build`, `npm run lint`, `npx prisma validate`).
- When generating UI from a design reference, use `generate_image` only for placeholder assets — never for final production images.

---

## 5. Output Style

- Respond in the user's language (Persian/Farsi when the user writes in Persian).
- Keep file contents in English (code, docs, specs) — only chat responses adapt to user language.
- At the end of every phase, output: Files Created, Files Modified, Breaking Changes, Remaining Risks (as defined in `CLAUDE.md` Output Requirements).

---

## 6. Safety

- Never expose secrets or hardcode credentials.
- Never run destructive commands (`rm -rf /`, `DROP DATABASE`) without explicit confirmation.
- When uncertain, ask — do not guess.

---

*Mirrors AGENTS.md v2.0. Last updated: 2026-09-07.*
