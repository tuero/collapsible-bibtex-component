import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";
import type { QuartzTransformerPlugin } from "@quartz-community/types";
import type { CollapsibleBibtexOptions } from "./types";

const defaultOptions: CollapsibleBibtexOptions = {
  className: "bibtex-details",
  summaryText: "[bibtex]",
};

function hasBibtexLanguage(node: Element): boolean {
  return (
    node.properties?.dataLanguage === "bibtex" || node.properties?.["data-language"] === "bibtex"
  );
}

function isElement(node: unknown): node is Element {
  return typeof node === "object" && node !== null && "type" in node && node.type === "element";
}

function isBibtexPre(node: Element): boolean {
  if (node.tagName !== "pre" || !hasBibtexLanguage(node)) {
    return false;
  }

  const code = node.children.find(
    (child): child is Element => child.type === "element" && child.tagName === "code",
  );

  return code ? hasBibtexLanguage(code) : true;
}

function isBibtexFigure(node: Element): boolean {
  return (
    node.tagName === "figure" &&
    node.children.some((child) => child.type === "element" && isBibtexPre(child))
  );
}

function isBibtexBlock(node: Element): boolean {
  return isBibtexFigure(node) || isBibtexPre(node);
}

export const CollapsibleBibtex: QuartzTransformerPlugin<Partial<CollapsibleBibtexOptions>> = (
  userOptions?: Partial<CollapsibleBibtexOptions>,
) => {
  const options = { ...defaultOptions, ...userOptions };

  return {
    name: "CollapsibleBibtex",
    htmlPlugins() {
      return [
        () => (tree: Root) => {
          visit(tree, "element", (node: Element, index, parent) => {
            if (index === undefined || !parent || !isBibtexBlock(node)) {
              return;
            }

            if (isElement(parent) && (isBibtexFigure(parent) || parent.tagName === "details")) {
              return;
            }

            parent.children.splice(index, 1, {
              type: "element",
              tagName: "details",
              properties: { className: [options.className] },
              children: [
                {
                  type: "element",
                  tagName: "summary",
                  properties: {},
                  children: [{ type: "text", value: options.summaryText }],
                },
                node,
              ],
            });
          });
        },
      ];
    },
    externalResources() {
      return {
        css: [
          {
            content: `.${options.className} {
  margin: 0.5rem 0 1rem;
}

.${options.className} summary {
  color: var(--secondary);
  cursor: pointer;
  display: inline-block;
  font-family: var(--codeFont);
  font-size: 0.9rem;
  list-style: none;
}

.${options.className} summary::-webkit-details-marker {
  display: none;
}

.${options.className} summary:hover {
  text-decoration: underline;
}

.${options.className} > pre,
.${options.className} > figure {
  margin-top: 0.5rem;
}`,
            inline: true,
          },
        ],
        js: [],
        additionalHead: [],
      };
    },
  };
};
