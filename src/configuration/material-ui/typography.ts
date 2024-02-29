// This file contains the typography configuration for the Material UI theme.
const projectFont = 'Anta';
const fontStyle = 'sans';

const fontsSansFallback = [
  'Inter',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Fira Sans',
  'Droid Sans',
  'Helvetica Neue',
  'sans-serif',
];
const fontsMonoFallback = [
  'Roboto Mono',
  'Menlo',
  'Monaco',
  'Lucida Console',
  'Liberation Mono',
  'DejaVu Sans Mono',
  'Bitstream Vera Sans Mono',
  'Courier New',
  'monospace',
];
const fontsSerifFallback = ['Georgia', 'Times New Roman', 'Times', 'serif'];
const fontFamily = [
  projectFont,
  fontStyle === 'sans' ? fontsSansFallback : fontStyle === 'serif' ? fontsSerifFallback : fontsMonoFallback,
].join(', ');

const h1FontSize = '40px';
const h1FontWeight = '600';
const h2FontSize = '30px';
const h2FontWeight = '600';
const h3FontSize = '24px';
const h3FontWeight = '600';
const h4FontSize = '20px';
const h4FontWeight = '600';
const h5FontSize = '18px';
const h5LineHeight = '20px';
const h5FontWeight = '600';
const body1FontSize = '16px';
const body1FontWeight = '400';
const body2FontSize = '14px';
const body2FontWeight = '400';
const tooltipFontSize = '12px';
const tooltipFontWeight = '600';
const captionFontSize = '12px';
const captionLineHeight = '14px';
const captionFontWeight = '300';
const linkFontSize = '14px';
const linkFontWeight = '600';
const extraSmallFontSize = '10px';
const extraSmallLineHeight = '10px';

export const typography = {
  fontFamily,
  h1: {
    fontSize: h1FontSize,
    fontWeight: h1FontWeight,
  },
  h2: {
    fontSize: h2FontSize,
    fontWeight: h2FontWeight,
  },
  h3: {
    fontSize: h3FontSize,
    fontWeight: h3FontWeight,
  },
  h4: {
    fontSize: h4FontSize,
    fontWeight: h4FontWeight,
  },
  h5: {
    fontSize: h5FontSize,
    fontWeight: h5FontWeight,
    lineHeight: h5LineHeight,
  },
  body1: {
    fontSize: body1FontSize,
    fontWeight: body1FontWeight,
  },
  body2: {
    fontSize: body2FontSize,
    fontWeight: body2FontWeight,
  },
  tooltip: {
    fontSize: tooltipFontSize,
    fontWeight: tooltipFontWeight,
  },
  caption: {
    fontSize: captionFontSize,
    fontWeight: captionFontWeight,
    lineHeight: captionLineHeight,
  },
  link: {
    fontSize: linkFontSize,
    fontWeight: linkFontWeight,
  },
  extraSmall: {
    fontSize: extraSmallFontSize,
    lineHeight: extraSmallLineHeight,
  },
};
