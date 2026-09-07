# GitHub Workflows

> The CI workflow file is stored here as a template because GitHub Apps
> cannot push `.github/workflows/` directly without `workflows` permission.

## To Enable CI

```bash
mkdir -p .github/workflows
cp .ai/templates/github-workflows/ci.yml .github/workflows/ci.yml
git add .github/workflows/ci.yml
git commit -m "ci: enable GitHub Actions workflow"
git push
```

Or create the file manually via the GitHub web UI:
1. Go to `.github/workflows/ci.yml` → Create new file
2. Paste the contents of `.ai/templates/github-workflows/ci.yml`

## Workflow

See `.ai/templates/github-workflows/ci.yml` for the full CI pipeline:
- Backend: lint → prisma validate → build → test → security check
- Frontend: lint → build → token compliance
- Traceability: check all features
- Docker: build → health check → Swagger check
