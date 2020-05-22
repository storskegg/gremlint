const { div$ } = include('src/libs/fakeReact/FakeReact.js');
const QueryInput = include('src/components/queryInput/QueryInput.js');
const QueryOutput = include('src/components/queryOutput/QueryOutput.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const QueryFormatter = ({ state }) =>
  div$(
    QueryInput(state.queryInput$).onInput(({ value }) => {
      state.queryInput$.value = value;
      state.queryOutput$.value = formatQuery(value);
    }),
    QueryOutput(state.queryOutput$)
  );

module.exports = QueryFormatter;
