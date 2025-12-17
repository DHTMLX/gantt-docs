/**
 * Convert a hyphenated string to camelCase.
 */
function hyphenToCamelCase(string) {
  return string.replace(/-(.)/g, (match, chr) => chr.toUpperCase());
}

/**
 * Determines if the specified string consists entirely of numeric characters.
 */
function isNumeric(input) {
  return input !== undefined
    && input !== null
    && (typeof input === 'number' || parseInt(input, 10) === Number(input));
}

/**
 * Handles parsing of inline styles
 *
 * @param {string} rawStyle Raw style attribute
 * @constructor
 */
class StyleParser {
  constructor(rawStyle) {
    this.parse(rawStyle);
  }

  /**
   * Parse the specified inline style attribute value
   * @param {string} rawStyle Raw style attribute
   */
  parse(rawStyle) {
    this.styles = rawStyle.split(';').reduce((result, style) => {
      const transformedStyle = style.trim();
      const firstColon = transformedStyle.indexOf(':');
      const key = transformedStyle.substr(0, firstColon);
      const value = transformedStyle.substr(firstColon + 1).trim();
      if (key !== '') {
        return { ...result, [key]: value };
      }
      return result;
    }, {});
  }

  /**
   * Convert the style information represented by this parser into a JSX
   * string
   *
   * @return {string}
   */
  toJSXString() {
    const output = Object.keys(this.styles).map((key) => `${this.toJSXKey(key)}: ${this.toJSXValue(this.styles[key])}`);
    return output.join(', ');
  }

  /**
   * Convert the CSS style key to a JSX style key
   *
   * @param {string} key CSS style key
   * @return {string} JSX style key
   */
  toJSXKey(key) {
    return hyphenToCamelCase(key);
  }

  /**
   * Convert the CSS style value to a JSX style value
   *
   * @param {string} value CSS style value
   * @return {string} JSX style value
   */
  toJSXValue(value) {
    if (isNumeric(value)) {
      // If numeric, no quotes
      return value;
    }
    // Proably a string, wrap it in quotes
    return `'${value.replace(/'/g, '"')}'`;
  }
}

const attrs = [
  'accept',
  'acceptCharset',
  'accessKey',
  'action',
  'allowFullScreen',
  'allowTransparency',
  'alt',
  'async',
  'autoComplete',
  'autoFocus',
  'autoPlay',
  'capture',
  'cellPadding',
  'cellSpacing',
  'charSet',
  'challenge',
  'checked',
  'classID',
  'className',
  'cols',
  'colSpan',
  'content',
  'contentEditable',
  'contextMenu',
  'controls',
  'coords',
  'crossOrigin',
  'data',
  'dateTime',
  'defer',
  'dir',
  'disabled',
  'download',
  'draggable',
  'encType',
  'form',
  'formAction',
  'formEncType',
  'formMethod',
  'formNoValidate',
  'formTarget',
  'frameBorder',
  'headers',
  'height',
  'hidden',
  'high',
  'href',
  'hrefLang',
  'htmlFor',
  'httpEquiv',
  'icon',
  'id',
  'inputMode',
  'keyParams',
  'keyType',
  'label',
  'lang',
  'list',
  'loop',
  'low',
  'manifest',
  'marginHeight',
  'marginWidth',
  'max',
  'maxLength',
  'media',
  'mediaGroup',
  'method',
  'min',
  'minLength',
  'multiple',
  'muted',
  'name',
  'noValidate',
  'open',
  'optimum',
  'pattern',
  'placeholder',
  'poster',
  'preload',
  'radioGroup',
  'readOnly',
  'rel',
  'required',
  'role',
  'rows',
  'rowSpan',
  'sandbox',
  'scope',
  'scoped',
  'scrolling',
  'seamless',
  'selected',
  'shape',
  'size',
  'sizes',
  'span',
  'spellCheck',
  'src',
  'srcDoc',
  'srcSet',
  'start',
  'step',
  'style',
  'summary',
  'tabIndex',
  'target',
  'title',
  'type',
  'useMap',
  'value',
  'width',
  'wmode',
  'wrap',
];

const getHtmlBlockIndex = all => {
  const fullIndex = [];

  if (all.indexOf("~~~html") !== -1) {
    all.replace(/~~~html([\s\S]+?)~~~/g, (_, text, index) => {
      const startingIndex = index;
      const endingIndex = index + text.length - 1;
      fullIndex.push({ start: startingIndex, end: endingIndex });
    });
  }

  if (all.indexOf("```html") !== -1) {
    all.replace(/```html([\s\S]+?)```/g, (_, text, index) => {
      const startingIndex = index;
      const endingIndex = index + text.length - 1;
      fullIndex.push({ start: startingIndex, end: endingIndex });
    });
  }

  return fullIndex;
}

const blockChecking = (text, index, all, newText) => {
  let check = false;
  const fullIndex = getHtmlBlockIndex(all);

  if (fullIndex.length) {
    fullIndex.forEach(({ start, end }) => {
      if (index >= start && index <= end) {
        check = true;
      }
    });
  }

  return check ? text : newText;
}

function convert(stringhtml) {
  let html = stringhtml;
  html = html
    .replace(/\sclass=/g, (text, index, all) => blockChecking(text, index, all, ' className='))
    .replace(/\sfor=/g, (text, index, all) => blockChecking(text, index, all, ' htmlFor='))
    // replace comments
    .replace(/<!--/g, (text, index, all) => blockChecking(text, index, all, '{/*'))
    .replace(/-->/g, (text, index, all) => blockChecking(text, index, all, '*/}'));

  [
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
  ].forEach((tag) => {
    const regex = new RegExp(`<(${tag}[^/]*?)>`, 'g');
    html = html
      .replace(regex, (_, str) => `<${str}/>`);
  });

  // replace attrNames
  attrs.forEach((attr) => {
    const originAttr = attr.toLowerCase();
    const regex = new RegExp(`\\s${originAttr}=`, 'g');
    html = html.replace(regex, ` ${attr}=`);
  });

  // replace styles
  html = html.replace(/\sstyle="(.+?)"/g, (attr, styles, index, all) => {
    let check = false;
    const fullIndex = getHtmlBlockIndex(all);

    if (fullIndex.length) {
      fullIndex.forEach(({ start, end }) => {
        if (index >= start && index <= end) {
          check = true;
        }
      });
    }

    if (check) {
      return attr;
    } else {
      const jsxStyles = new StyleParser(styles).toJSXString();
      return ` style={{${jsxStyles}}}`;
    }
  });
  return html;
}

module.exports = convert;
