const plugins = [
  [
    'module-resolver',
    {
      root: ['.'],
      extensions: ['.ts', '.jsx', '.js', '.json', '.svg'],
    },
  ],
];

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: plugins,
  };
};
