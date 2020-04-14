module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
        node: {
            paths: ['src'],
            alias: {
                _actions: './src/actions',
                _assets: './src/assets',
                _components: './src/components',
                _constants: './src/constants',
                _containers: './src/containers',
                _reducers: './src/reducers',
                _utils: './src/utils',
            }
        }
    }
  }
};
