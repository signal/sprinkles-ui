export default function captureRightMouseClick(e) {
  let isRightMouseClick = false;
  const mouseEvent = e || window.event;

  if ('which' in mouseEvent) {  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
    isRightMouseClick = mouseEvent.which === 3;
  } else if ('button' in e) {  // IE, Opera
    isRightMouseClick = mouseEvent.button === 2;
  }

  return isRightMouseClick;
}
