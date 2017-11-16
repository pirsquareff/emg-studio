import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    // background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .selected {
    fill: red;
    stroke: brown;
  }

  
  
  .line {
    fill: none;
    stroke: #8e88b3;
    clip-path: url(#clip);
    stroke-width: 1px;
  }
  .zoom {
    cursor: move;
    fill: none;
    pointer-events: all;
  }
`;
