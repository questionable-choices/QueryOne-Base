Q      = typeof Q      !== 'undefined' ? Q      : {}
Q.core = typeof Q.core !== 'undefined' ? Q.core : {}

Q.core.CSSList = [
  'core/csMain.css',
  'core/csColors.css',
]

Q.core.loadCSS = function(href) {
  var css = $('<link>', {
    'rel'   : 'stylesheet',
    'type'  : 'text/css',
    'href'  : href,
  })[0]
  document.getElementsByTagName('head')[0].appendChild(css)
}

Q.core.reloadCSS = function() {
  for (var i = (Q.core.CSSList.length - 1); i > -1; i--) {
    Q.core.loadCSS(Q.core.CSSlist[i])
  }
}

Q.core.reloadCSS()
