import { describe, expect, it } from "vitest";
import type { Element, Root } from "hast";
import { CollapsibleBibtex } from "../src/transformer";
import { createCtx } from "./helpers";

describe("CollapsibleBibtex", () => {
  it("wraps top-level bibtex code blocks in details", () => {
    const ctx = createCtx();
    const transformer = CollapsibleBibtex();
    const plugins = transformer.htmlPlugins?.(ctx) ?? [];
    const plugin = plugins[0] as () => (tree: Root) => void;

    const bibtexPre: Element = {
      type: "element",
      tagName: "pre",
      properties: { dataLanguage: "bibtex" },
      children: [
        {
          type: "element",
          tagName: "code",
          properties: { dataLanguage: "bibtex" },
          children: [{ type: "text", value: "@article{test}" }],
        },
      ],
    };

    const tree: Root = {
      type: "root",
      children: [bibtexPre],
    };

    plugin()(tree);

    const details = tree.children[0] as Element;
    expect(details.tagName).toBe("details");
    expect(details.properties?.className).toEqual(["bibtex-details"]);
    expect((details.children[0] as Element).tagName).toBe("summary");
    expect((details.children[0] as Element).children[0]).toEqual({ type: "text", value: "[bibtex]" });
    expect(details.children[1]).toBe(bibtexPre);
  });

  it("does not double-wrap bibtex figures", () => {
    const ctx = createCtx();
    const transformer = CollapsibleBibtex();
    const plugins = transformer.htmlPlugins?.(ctx) ?? [];
    const plugin = plugins[0] as () => (tree: Root) => void;

    const figure: Element = {
      type: "element",
      tagName: "figure",
      properties: {},
      children: [
        {
          type: "element",
          tagName: "pre",
          properties: { dataLanguage: "bibtex" },
          children: [
            {
              type: "element",
              tagName: "code",
              properties: { dataLanguage: "bibtex" },
              children: [{ type: "text", value: "@article{test}" }],
            },
          ],
        },
      ],
    };

    const tree: Root = {
      type: "root",
      children: [figure],
    };

    plugin()(tree);

    const details = tree.children[0] as Element;
    expect(details.tagName).toBe("details");
    expect(details.children[1]).toBe(figure);

    const wrappedFigure = details.children[1] as Element;
    expect((wrappedFigure.children[0] as Element).tagName).toBe("pre");
  });
});
