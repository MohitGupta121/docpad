import MainTheme from './main';

export interface IPalette {
  purple: IPalettePrimitives;
  neutral: IPalettePrimitives;
  orange: IPalettePrimitives;
  pink: IPalettePrimitives;
  turquoise: IPalettePrimitives;
  green: IPalettePrimitives;
  red: IPalettePrimitives;
  yellow: IPalettePrimitives;
  blue: IPalettePrimitives;
  surface: IPaletteSurface;
  text: IPaletteText;
  button: IPaletteButton;
  border: IPaletteBorder;
  icon: IPaletteIcon;
  timelineOutPatient: IPaletteTimeline;
  timelineEmergency: IPaletteTimeline;
  timelineInPatient: IPaletteTimeline;
  bodySystems: IPalettebodySystemChartIndicators;
  timelineTips: IPaletteTimelineTips;
  bodySystemChartSeverity: IPaletteBodySystemChartSeverity;
}

export interface IPalettePrimitives {
  '0': string;
  '100': string;
  '200-0%': string;
  '200': string;
  '250': string;
  '300': string;
  '400': string;
  '420': string;
  '480': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  '1000': string;
}

export interface IPaletteSurface {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  headerBackground: string;
  visualSeparator: string;
  appBackground: string;
  brandPrimary: string;
  brandSecondary: string;
  disabled: string;
  selectedDisabled: string;
  selectedHistoryData: string;
  positive: string;
  negative: string;
  negativeLightBackground: string;
  doctorInitialsBackground: string;
  veryLowRisk: string;
  lowRisk: string;
  mediumRisk: string;
  highRisk: string;
  veryHighRisk: string;
}

export interface IPaletteText {
  primary: string;
  brandPrimary: string;
  secondary: string;
  tertiary: string;
  inputPlaceholder: string;
  disabled: string;
  invert: string;
  negative: string;
  positive: string;
  coSignature: string;
  imaging: string;
  labs: string;
  documents: string;
  pressedBodySystem: string;
  attentionInlineNotification: string;
}

export interface IPaletteButton {
  primaryDefault: string;
  primaryHover: string;
  primaryFocused: string;
  primaryPressed: string;
  secondaryDefault: string;
  secondaryHover: string;
  secondaryFocused: string;
  secondaryPressed: string;
  tertiaryPressed: string;
  quaternaryPressed: string;
  primarySecondaryDisabled: string;
}

export interface IPaletteBorder {
  white: string;
  grayInputDefault: string;
  grayControlsDefaultDisabled: string;
  grayControlsHistoryDataDefaultDisabled: string;
  dark: string;
  brandPrimary: string;
  brandSecondary: string;
  negative: string;
  positive: string;
  pressedBodySystem: string;
}

export interface IPaletteIcon {
  primary: string;
  brandPrimary: string;
  disabled: string;
  invert: string;
  negative: string;
  positive: string;
  coSignature: string;
  imaging: string;
  labs: string;
  documents: string;
  attentionInlineNotification: string;
}

export interface IPaletteTimeline {
  noEpisodes: string;
  '1-3Episodes': string;
  '4-6Episodes': string;
  '7-9Episodes': string;
  '10-12Episodes': string;
  '13-15Episodes': string;
  '16-18Episodes': string;
  '19-21Episodes': string;
  '22-24Episodes': string;
}

export interface IPalettebodySystemChartIndicators {
  met: string;
  psy: string;
  neu: string;
  eye: string;
  ent: string;
  pul: string;
  cv: string;
  gi: string;
  gu: string;
  mus: string;
  derm: string;
  heme: string;
}

export interface IPaletteTimelineTips {
  primary: string;
  secondary: string;
}

export interface IPaletteBodySystemChartSeverity {
  point0: string;
  point1: string;
  point5: string;
  point2_min0: string;
  point2_else: string;
  point3_min0: string;
  point3_else: string;
  point4_min0: string;
  point4_else: string;
}

export interface ITypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight?: string;
  lineHeight?: number;
}

export type TypographyVariant =
  | 'titleXXL'
  | 'titleXL'
  | 'titleL'
  | 'titleM'
  | 'titleS'
  | 'titleXS'
  | 'titleXXS'
  | 'bodyL'
  | 'bodyM'
  | 'bodySMediumWeight'
  | 'bodyS'
  | 'bodyXS'
  | 'linkM'
  | 'linkS'
  | 'linkXS';

export interface ITypography
  extends Record<TypographyVariant, ITypographyStyle> {}

export interface ISpacing {
  spacing1: number;
  spacing2: number;
  spacing3: number;
  spacing4: number;
  spacing5: number;
  spacing6: number;
  spacing7: number;
  spacing8: number;
  spacing9: number;
  spacing10: number;
  spacing11: number;
  spacing12: number;
  spacing13: number;
  spacing14: number;
  spacing15: number;
}

export interface IGlobalStyle {
  borderRadius: number;
  backgroundColor: string;
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
}

export type GlobalStyleProps = 'elevation' | 'elevation2';

export interface IGlobal extends Record<GlobalStyleProps, IGlobalStyle> {}

export interface ITheme {
  palette: IPalette;
  typography: ITypography;
  spacing: ISpacing;
  globalStyles: IGlobal;
}

export { MainTheme as MainTheme };
