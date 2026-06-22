export { BuildCtx, CSSResource, JSResource, ProcessedContent, QuartzPluginData, QuartzTransformerPlugin, QuartzTransformerPluginInstance, StaticResources } from '@quartz-community/types';

interface CollapsibleBibtexOptions {
    /** Class applied to the wrapping <details> element. */
    className: string;
    /** Text shown in the <summary> toggle. */
    summaryText: string;
}

export type { CollapsibleBibtexOptions };
