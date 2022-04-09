# WIP Action

```yml
name: Test

on: push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout sources
        uses: actions/checkout@v2
        with:
          persist-credentials: false
          fetch-depth: 0

      - name: Test action
        uses: ./
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          username: Kandreas9
          template: /template-test.md

      - name: Commit & Push changes
        uses: actions-js/push@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```
