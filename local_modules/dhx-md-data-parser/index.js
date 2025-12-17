const normalizeNewline = require('normalize-newline');
const { parse, HTMLElement } = require('node-html-parser');
const convert = require('./htmlToJsx');

// TODO Write test for regexp
// TODO Later you need to take out this parser as a separate package
// TODO Add comments to the methods
// **<text>**
const MD_BOLD_TEXT_REGEXP = /\*\*(.+?)\*\*/g;

// [text](<route><.md>#<route>) or [text](<route>/<route><.md>)
// e.g. '[autoWidth](grid/configuration.md#autowidthforcolumns)'
const MD_LINK_REGEXP = /(\[.+?\])\(([^\s]+?)(\.md)([^\s]*?)\)/g;

// @<text>:
// e.g. '@short:' or '@short: sends a DELETE request to the server'
const AT_NOTATION_MATCH_REGEXP = /^@(\w+):(.*)/;

// @<text>()
// e.g. '@short(page.md)'
const AT_NOTATION_FUNCTION_MATCH_REGEXP = /@(\w+)\((.*)\)/g;

// {{<text> \n|\s <text> \n\s }}
// e.g {{editor    https://snippet.dhtmlx.com/2co9z3bi Calendar. Date Format}}
const BRACE_NOTATION_REGEXP = /\{\{(\w+)[(?:\r?\n|\r)\s]+((?:.|(?:\r?\n|\r))+?)\}\}/g;

// [](link)
// e.g [Chart API Overview](api/api_overview.md)
const EMPTY_LINK_REGEXP = /\[\]\(.+?\)/g;

class FileDataParser {
  #events = {
    bracenotationmatch: null,
    atnotationmatch: null,
    atnotationfunctionmatch: null,
    emptylinkmatch: null,
  };

  #fileData = '';

  constructor({ fileData }) {
    this.#fileData = fileData;
    this.#init();
  }

  get fileData() { return this.#fileData; }

  set fileData(data) { this.#fileData = data; }

  #init = () => {
    this.#fileData = normalizeNewline(this.fileData);
    // const data = parse(this.#fileData);
    // TODO: Convert to jsx only the required html (which is not wrapped in js md markup e.g.).
    // TODO: Use node-html-parser to parse html in the string
    // TODO: ~~~html <some_tags/> ~~~
    this.#fileData = convert(this.#fileData);
    this.#findAndReplaceStrong();
  }

  #findAndReplaceStrong = () => {
    // this.fileData = this.fileData.replace(MD_BOLD_TEXT_REGEXP, '<strong>$1</strong>');
  }

  #splitFileDataIntoChunksByATNotation = (data) => {
    const fileDataArray = data.split('\n');
    let matchIndex = 0;
    let matchKey = null;

    return fileDataArray.reduce((result, string, index) => {
      const atNotationMatch = string.match(AT_NOTATION_MATCH_REGEXP);
      const atNotationKey = atNotationMatch ? atNotationMatch[0] : null;
      const tmpChunks = [];

      if (atNotationKey) {
        const slice = fileDataArray.slice(matchIndex, index);
        const chunk = [matchKey, slice];
        matchIndex = index;
        matchKey = atNotationKey.replace(AT_NOTATION_MATCH_REGEXP, '$1');
        tmpChunks.push(chunk);
      }

      if (fileDataArray.length - 1 === index) {
        const slice = fileDataArray.slice(matchIndex, fileDataArray.length);
        tmpChunks.push([matchKey, slice]);
      }

      return [...result, ...tmpChunks];
    }, []);
  };

  on = (eventName, callback) => {
    const normalizedEventName = eventName.toLowerCase();
    this.#events = { ...this.#events, [normalizedEventName]: callback };
    return this;
  }

  findAndReplaceBracketNotation = () => {
    this.fileData = this.fileData.replace(BRACE_NOTATION_REGEXP, (fullMatch, key, data) => {
      if (typeof this.#events.bracenotationmatch === 'function') {
        return this.#events.bracenotationmatch(data, { key, fullMatch });
      }
      return data;
    });

    return this;
  }

  findAndReplaceAtNotation = () => {
    // TODO: Remove unnecessary whitespace around the edges of js md markup
    const chunks = this.#splitFileDataIntoChunksByATNotation(this.fileData);

    if (chunks.length > 0) {
      this.fileData = chunks.reduce((result, [key, dataSlice], index) => {
        if (dataSlice.length === 0) return result;
        const stringWithoutATNotationKey = dataSlice[0].replace(AT_NOTATION_MATCH_REGEXP, '$2');
        dataSlice.splice(0, 1, stringWithoutATNotationKey);

        let sliceData = dataSlice.join('\n');
        if (typeof this.#events.atnotationmatch === 'function' && key) {
          sliceData = this.#events.atnotationmatch(sliceData, { slice: dataSlice, key });
        }
        const newReusltString = result + ((chunks.length - 1 === index) ? sliceData : `${sliceData}\n`);
        return newReusltString;
      }, '');
    }

    return this;
  };

  findAndReplaceNotationFunction = () => {
    this.fileData = this.fileData.replace(AT_NOTATION_FUNCTION_MATCH_REGEXP, (fullMatch, key, data) => {
      if (typeof this.#events.atnotationfunctionmatch === 'function') {
        return this.#events.atnotationfunctionmatch(data, { key, fullMatch });
      }
      return data;
    });

    return this;
  }

  findAndReplaceEmptyLink = () => {
    this.fileData = this.fileData.replace(EMPTY_LINK_REGEXP, (fullMatch, key, data) => {
      if (typeof this.#events.emptylinkmatch === 'function') {
        return this.#events.emptylinkmatch(data, { key, fullMatch });
      }
      return data;
    });

    return this;
  }

  normalizeMarkdownMdLinks = () => {
    this.fileData = this.fileData.replace(MD_LINK_REGEXP, '$1(/$2$4)');

    return this;
  }
}

module.exports = FileDataParser;
