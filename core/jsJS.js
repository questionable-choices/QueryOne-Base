
Q      = typeof Q      !== 'undefined' ? Q      : {}
Q.core = typeof Q.core !== 'undefined' ? Q.core : {}

/*
  Frontrunner is the constructor for QueryOne's basic functions
 */

Q.core.frontrunner = {}
Q.core.frontrunner.list = [
 // Core Construction
  './core/jsUtility.js',
  './core/jsCSSLoad.js',
  './core/jsGithub.js',
  './core/jsMaster.js',
  './core/jsConnect.js',
  './core/jsReceiver.js',
  './core/jsTrigger.js',
 // Secondary Construction
  './core/jsAutotriggers.js', 
  './core/jsKeypressbinding.js',
  './core/jsPrompt.js',
  './core/jsGMCP.js',
  './core/jsScrollback.js',
]

Q.core.frontrunner_InProgress = false        // Reload in progress
Q.core.frontrunner_LoadCount  = 0            // Count of files loaded in sequence
Q.core.frontrunner_Iteration  = []           // Iterative list
Q.core.frontrunner_Performant = new Date()
Q.core.frontrunner_Verbose    = true

Q.core.reloadCallback = function() {
  var outp = $('#output')
  if (Q.core.frontrunner_Verbose && outp.length) { outp.append('<span class="mute"> success.</span>') }
  Q.core.frontrunner_LoadCount++
  Q.core.reload()
}

Q.core.reload = function() {
  // We hardcode these functions for .reload() until we load in Utilities
  var copy = function(thing) { var out; if (null == thing || 'object' != typeof thing) return thing; if (thing instanceof Date) { out = new Date(); out.setTime(thing.getTime()); return out }; if (thing instanceof Array) { out = []; for (var i=0;i<thing.length;i++) { out[i] = copy(thing[i]) }; return out }; if (thing instanceof Object) { out = {}; for (var attr in thing) { if (out.hasOwnProperty(attr)) { out[attr] = copy(thing[attr]) } }; return out }; throw new Error('Unable to copy thing! Type not supported.'); }
  var load = function(url) { var s = $('<script>', {'type':'text/javascript','src':url,})[0]; document.getElementsByTagName('head')[0].appendChild(s); }
  var rpad = function(str,len,char) { if (typeof str =='number') { str = str.toString() }; if (char == null) { char = ' ' }; var r = len - str.length; if (r < 0) { r = 0 }; return str + char.repeat(r); }

  // Variables we need
  var head = document.getElementsByTagName('head')[0]
  var list = copy(Q.core.frontrunner.list)
  var outp = $('#output')
  var outL = outp.length
  
  if (!Q.core.frontrunner_InProgress) { 
    Q.core.frontrunner_InProgress = true
    var sc = head.getElementsByTagName('script')
    var cs = head.getElementsByTagName('link')
    var i = sc.length; while (i--) { sc[i].parentNode.removeChild(sc[i]) }
    var i = cs.length; while (i--) { cs[i].parentNode.removeChild(cs[i]) }
    head.appendChild($('<link>',{'rel':'icon','type':'image/png','href':'./core/resources/icon.png' })[0])
  }
  if (Q.core.frontrunner_Iteration.length == 0) { 
    Q.core.frontrunner_Iteration = copy(list)
    Q.core.frontrunner_Performant = new Date()
    if (outL) { outp.append('<span class="mute">Loading client dependencies ') }
  }
  if (Q.core.frontrunner_LoadCount >= Q.core.frontrunner_Iteration.length) {
    Q.core.frontrunner_InProgress = false
    var t = new Date() - Q.core.frontrunner_Performant
    if (outL) { outp.append('<span class="mute"> complete. ( <span class="link">' + t + '</span>ms)</span><br >') }
    Q.core.frontrunner_LoadCount = 0
    Q.core.frontrunner_Iteration = []
    // if (jReload) { jReload() }
    return 
  }
  var addr = Q.core.frontrunner_Iteration[Q.core.frontrunner_LoadCount]
  var elem = document.createElement('script')
      elem.src = addr
      elem.onload = Q.core.reloadCallback
  head.appendChild(elem)
  if (Q.core.frontrunner_Verbose) {
   if (outL) { outp.append('<br ><span class="mute">Loading core <i>j</i> <span class="normal">' + rpad(addr,29) + '</span></span>') }
  } else {
   if (outL) { outp.append('<span class="normal">.') }
  }
  if (outL) { outp.scrollTop( document.getElementById('output').scrollHeight ) } // !important
}

Q.core.reload()
