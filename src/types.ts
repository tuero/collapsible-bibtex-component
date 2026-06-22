export type {
  BuildCtx,
  CSSResource,
  JSResource,
  ProcessedContent,
  QuartzPluginData,
  QuartzTransformerPlugin,
  QuartzTransformerPluginInstance,
  StaticResources,
} from "@quartz-community/types";

export interface CollapsibleBibtexOptions {
  /** Class applied to the wrapping <details> element. */
  className: string;
  /** Text shown in the <summary> toggle. */
  summaryText: string;
}
