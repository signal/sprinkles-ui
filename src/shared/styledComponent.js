import glamorous from 'glamorous';

export default function styledComonent(factory, styleObject) {
  return glamorous[factory](styleObject);
}
