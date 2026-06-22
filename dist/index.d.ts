import { QuartzTransformerPlugin } from '@quartz-community/types';
export { PageGenerator, PageMatcher, QuartzComponent, QuartzComponentConstructor, QuartzComponentProps, QuartzEmitterPlugin, QuartzFilterPlugin, QuartzPageTypePlugin, QuartzPageTypePluginInstance, QuartzTransformerPlugin, StringResource, VirtualPage } from '@quartz-community/types';
import { CollapsibleBibtexOptions } from './types.js';

declare const CollapsibleBibtex: QuartzTransformerPlugin<Partial<CollapsibleBibtexOptions>>;

export { CollapsibleBibtex, CollapsibleBibtexOptions };
