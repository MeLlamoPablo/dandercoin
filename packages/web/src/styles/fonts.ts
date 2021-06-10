import { css } from 'styled-components';

import ComicSansPiratilla_woff from '$/assets/fonts/ComicSansMS.woff';
import ComicSansPiratilla_woff2 from '$/assets/fonts/ComicSansMS.woff2';
import InterV_woff2 from '$/assets/fonts/InterV.woff2';

export const fonts = css`
  @font-face {
    font-family: 'Comic Sans Piratilla';
    src: url(${ComicSansPiratilla_woff2}) format('woff2'),
      url(${ComicSansPiratilla_woff}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-display: swap;
    font-family: 'Inter V';
    font-weight: 100 1000;
    src: url(${InterV_woff2}) format('woff2 supports variations'),
      url(${InterV_woff2}) format('woff2-variations');
  }
`;
