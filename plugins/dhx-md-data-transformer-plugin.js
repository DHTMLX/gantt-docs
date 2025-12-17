const path = require('path');

module.exports = (context, options) => {
  const { siteDir } = context;
  const {
    onBraceNotationMatch,
    onAtNotationMatch,
    onAtNotationFunctionMatch,
    onEmptyLinkMatch,
    onAfterDataTransformation
  } = options;

  return {
    name: 'dhx-md-data-transformer-plugin',
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              include: [path.resolve(siteDir, 'docs'), path.resolve(siteDir, 'i18n')],
              test: /(\.mdx?)$/,
              use: [
                {
                  loader: 'dhx-md-data-transformer-loader',
                  options: {
                    onBraceNotationMatch,
                    onAtNotationMatch,
                    onAtNotationFunctionMatch,
                    onEmptyLinkMatch,
                    onAfterDataTransformation,
                  }
                }
              ]
            }
          ],
        },
        resolveLoader: {
          modules: ['node_modules', path.resolve(siteDir, 'loaders')]
        }
      };
    }
  };
};
