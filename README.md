# Collapsible BibTeX

Quartz v5 transformer plugin that wraps `bibtex` code blocks in a collapsible `<details>` block.

## Demo

For the following codeblock in your notes, it does the following:
````
```bibtex
@inproceedings{tueroBOL26,
  title     = {Structure-Induced Information for Rerooting {L}evin Tree Search},
  author    = {Jake Tuero and Michael Buro and Laurent Orseau and Levi H. S. Lelis},
  booktitle = {International Conference on Machine Learning},
  year      = {2026},
}
```
````

![](demo.gif)

## What It Does

- detects rendered `bibtex` code blocks
- wraps them in a collapsible container
- shows a configurable summary label
- applies built-in styling for the toggle

Default output:

```html
<details class="bibtex-details">
  <summary>[bibtex]</summary>
  ...rendered bibtex code block...
</details>
```

## Install

Install the plugin into your Quartz v5 site:

```bash
npx quartz plugin add github:tuero/collapsible-bibtex-component
```

## Usage

Add it to `quartz.config.yaml`:

```yaml
plugins:
  - source: github:tuero/collapsible-bibtex-component
    enabled: true
    options:
      className: bibtex-details
      summaryText: "[bibtex]"
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `bibtex-details` | Class applied to the wrapping `<details>` element. |
| `summaryText` | `string` | `"[bibtex]"` | Text shown in the collapsible summary. |

## Advanced Usage

If you are wiring plugins manually in `quartz.ts`, use the transformer export:

```ts
import * as CollapsibleBibtexPlugin from "./.quartz/plugins"

export default {
  plugins: {
    transformers: [CollapsibleBibtexPlugin.CollapsibleBibtex()],
  },
}
```
