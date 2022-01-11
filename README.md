## Usage:

```yaml
name: Jira Check

on:
  pull_request:
    types:
      - opened
      - reopened
      - edited
      - synchronize

jobs:
  enforce-issue:
    runs-on: ubuntu-latest
    name: Ensure issue number on PR title or commit
    steps:
      - name: Check for Jira Issue
        id: check
        uses: giddyinc/jira-pr-link-action@main
        with:
          ignore-author: dependabot[bot],build-giddy
          ignore-head: staging,development
          project: "CR,DEVOPS,AM,API,DATA"
```
