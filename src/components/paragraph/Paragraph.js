const { html } = require('../../libs/simpleHTML/SimpleHTML.js');
const {
  TextColor,
} = require('../../libs/simpleColorPalette/SimpleColorPalette.js');

const Paragraph = (getProps) => {
  const getInnerText = () => getProps().innerText;
  const element = html(
    'div',
    () => ({ style: getInnerText() ? 'padding: 10px;' : '' }),
    [
      html(
        'span',
        {
          style: `color: ${TextColor}; line-height: 20px; font-size: 15px;`,
          innerText: getInnerText(),
        },
        []
      ),
    ]
  );
  return element;
};

module.exports = Paragraph;
