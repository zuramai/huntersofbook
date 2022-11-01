import { App, AppContext, ComponentCustomProperties, InjectionKey } from 'vue'

export const HUNTERSOFBOOK_CONFIG = Symbol(
  'HUNTERSOFBOOK_CONFIG',
) as InjectionKey<string>

/** Type safe return app global properties for assign */
export const extractGlobalProperties = (app: App | AppContext) =>
  app.config.globalProperties as ComponentCustomProperties

/**
 * Type safe set vue global property
 * Declare type before use this method.
 * ```
declare module 'vue' {
  export interface ComponentCustomProperties {
    $vaThing: ThingType
  }
}
 * ```
 * @example See `global-config` or `color-config` for example
 */
// eslint-disable-next-line antfu/generic-spacing
export const defineGlobalProperty = <
  Key extends keyof ComponentCustomProperties,
  Value extends ComponentCustomProperties[Key],
>(
    app: App,
    key: Key,
    v: Value,
  ) => {
  const globalProperties = extractGlobalProperties(app)
  globalProperties[key] = v
}

/** Type safe return vue global property */
// eslint-disable-next-line antfu/generic-spacing
export const getGlobalProperty = <Key extends keyof ComponentCustomProperties>(
  app: App | AppContext,
  key: Key,
): ComponentCustomProperties[Key] => {
  return extractGlobalProperties(app)[key]
}
