const Observable = include('src/libs/observable/Observable.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const atom = (initialValue) => {
  const observable$ = new Observable(initialValue);
  const get = () => observable$.value;
  const set = (value) => {
    observable$.value = value;
  };
  const addChangeListener = (callback) =>
    addEventListener(observable$.id, callback);
  return [get, set, addChangeListener];
};

const [getQueryInput, setQueryInput, addQueryInputChangeListener] = atom('');

const [getQueryOutput, setQueryOutput, addQueryOutputChangeListener] = atom('');

const [
  getShowAdvancedOptions,
  setShowAdvancedOptions,
  addShowAdvancedOptionsChangeListener,
] = atom(false);

const [getIndentation, _setIndentation, addIndentationChangeListener] = atom(0);
const setIndentation = (value) => {
  const indentation = parseInt(value);
  if (isNaN(indentation)) return;
  if (indentation < 0) {
    _setIndentation(0);
    return;
  }
  const maxLineLength = getMaxLineLength();
  if (indentation > maxLineLength) {
    _setIndentation(maxLineLength);
    return;
  }
  _setIndentation(indentation);
};

const [
  getMaxLineLength,
  _setMaxLineLength,
  addMaxLineLengthChangeListener,
] = atom(80);
const setMaxLineLength = (value) => {
  const maxLineLength = parseInt(value);
  if (isNaN(maxLineLength)) return;
  if (maxLineLength < 0) {
    _setMaxLineLength(0);
    return;
  }
  if (maxLineLength > 85) {
    _setMaxLineLength(85);
    return;
  }
  _setMaxLineLength(maxLineLength);
};

addQueryInputChangeListener(({ detail }) => {
  setQueryOutput(
    formatQuery(detail, {
      indentation: getIndentation(),
      maxLineLength: getMaxLineLength(),
    })
  );
});

addIndentationChangeListener(() => {
  setQueryOutput(
    formatQuery(getQueryInput(), {
      indentation: getIndentation(),
      maxLineLength: getMaxLineLength(),
    })
  );
});

addMaxLineLengthChangeListener(() => {
  setQueryOutput(
    formatQuery(getQueryInput(), {
      indentation: getIndentation(),
      maxLineLength: getMaxLineLength(),
    })
  );
});

module.exports = {
  getQueryInput,
  setQueryInput,
  addQueryInputChangeListener,

  getQueryOutput,
  setQueryOutput,
  addQueryOutputChangeListener,

  getShowAdvancedOptions,
  setShowAdvancedOptions,
  addShowAdvancedOptionsChangeListener,

  getIndentation,
  setIndentation,
  addIndentationChangeListener,

  getMaxLineLength,
  setMaxLineLength,
  addMaxLineLengthChangeListener,
};
