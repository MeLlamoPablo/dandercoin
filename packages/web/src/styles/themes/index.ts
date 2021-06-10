import dark from './dark';
import light from './light';

const untypedThemes = {
  light,
  dark,
};

export type Theme = typeof light;
export type ThemeKey = keyof typeof untypedThemes;

const themes: { [k in ThemeKey]: Theme } = untypedThemes;

export default themes;

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  // noinspection JSUnusedGlobalSymbols
  export interface DefaultTheme extends Theme {}
  /* eslint-enable @typescript-eslint/no-empty-interface */
}
