const FileDataParser = require('dhx-md-data-parser');

module.exports = function (fileData) {
  const fileDataParser = new FileDataParser({ fileData });

  const {
    onBraceNotationMatch,
    onAtNotationMatch,
    onAtNotationFunctionMatch,
    onEmptyLinkMatch,
    onAfterDataTransformation,
  } = this.loaders[this.loaderIndex].options || {};

  fileDataParser
    .on('braceNotationMatch', (originalData, props) => (typeof onBraceNotationMatch === 'function') ? onBraceNotationMatch(originalData, { ...props, dir: this.context }) : originalData)
    .on('atNotationMatch', (originalData, props) => (typeof onAtNotationMatch === 'function') ? onAtNotationMatch(originalData, { ...props, dir: this.context }) : originalData)
    .on('atNotationFunctionMatch',(originalData, props) => (typeof onAtNotationFunctionMatch === 'function') ? onAtNotationFunctionMatch(originalData, { ...props, dir: this.context }) : originalData)
    .on('emptyLinkMatch', (originalData, props) => (typeof onEmptyLinkMatch === 'function') ? onEmptyLinkMatch(originalData, { ...props, dir: this.context }) : originalData);

  fileDataParser
    .findAndReplaceAtNotation()
    .findAndReplaceNotationFunction()
    .findAndReplaceBracketNotation()
    .normalizeMarkdownMdLinks()
    .findAndReplaceEmptyLink();

  if (typeof onAfterDataTransformation === 'function') {
    const transformedData = onAfterDataTransformation(fileDataParser.fileData, { resourcePath: this.resourcePath });
    if (typeof transformedData === 'string') {
      fileDataParser.fileData = transformedData;
    }
  }

  return fileDataParser.fileData;
}
