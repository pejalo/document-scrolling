export default { disable, enable }

let yOffset

function disable() {
  // remember scroll position
  yOffset = window.scrollY 
  
  // https://stackoverflow.com/a/13891717
  Object.assign(document.documentElement.style, {
    position: 'fixed',
    overflowY: 'hidden',
    width: `calc(100% - ${getScrollbarSize()}px)`,
    top: `-${yOffset}px`,
  })
}

function enable() {
  Object.assign(document.documentElement.style, {
    position: '',
    overflowY: '',
    width: '',
    top: ''
  })

  // restore scroll position
  window.scroll(0, yOffset)
  // sometimes it doesn't work right away
  setTimeout(() => {
    window.scroll(0, yOffset) 
  }, 1)
}

let scrollbarSize

// taken from https://github.com/davidtheclark/no-scroll
export function getScrollbarSize() {
  if (typeof scrollbarSize !== 'undefined') 
    return scrollbarSize

  var doc = document.documentElement
  var dummyScroller = document.createElement('div')
  dummyScroller.setAttribute('style', 'width:99px;height:99px;' + 'position:absolute;top:-9999px;overflow:scroll;')
  doc.appendChild(dummyScroller)
  scrollbarSize = dummyScroller.offsetWidth - dummyScroller.clientWidth
  doc.removeChild(dummyScroller)
  return scrollbarSize
}
