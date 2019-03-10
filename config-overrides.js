const { addLessLoader, fixBabelImports, override } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      /** Colours */
      '@black': '#46454C',            // Dark Slate Gray
      '@highlight-color': '#A6905B',  // Dark Khaki
      '@info-color': '#9FA0B3',       // Light Slate Grey
      '@primary-color': '#71A4EA',    // Cornflower Blue
      '@white': '#FBFBFB'             // White
    }
  })
);
