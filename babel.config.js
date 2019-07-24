module.exports = {
  presets: [
    '@vue/app',
    [
      '@vue/babel-preset-jsx',
      {
        injectH: false,
      },
    ],
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
};
