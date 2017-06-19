import { styleSheet } from 'glamor';

/**
 * This function takes a classList and gets all the
 * associated css styles.
 * inspired by: https://github.com/paypal/glamorous/blob/master/src/get-glamor-classname.js
 */
export function getGlamorStylesFromClassList(classList) {
  const classArray = [].slice.call(classList);
  const glamorClassName = classArray.find((str) => str.indexOf('css-') === 0);
  const id = glamorClassName.slice('css-'.length);
  if (styleSheet.registered[id]) {
    return styleSheet.registered[id].style;
  }
  return {};
}

export default {
  getGlamorStylesFromClassList,
};
