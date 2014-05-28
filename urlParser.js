var isNative = function(fn){
    risnative = /\s*\[native code\]\s*/i
    try {
      return fn.toString().match(risnative)
    } catch(e) {
      return false
    }
}
, enumerate = function(hasObjectKeys){
  return function(o){
      var k, rv

      if ( hasObjectKeys )
      {
        try {
          rv = Object.keys(o)
          return rv
        } catch(e) { }
      }

      rv = []
      o = !!o ? (!!o.callee ? slice(o) : o) : {}

      for ( k in o ) if ( rv.hasOwnProperty.call(o, k) )
        rv.push(k)

      return rv
  }
}( isNative(Object.keys) )
, objectify = function(str){
    var o = {}
      , _separator = /&amp;|&/g
      , _delimiter = "="
      , pairs = !!~str.search(_separator) ? str.split(_separator) : str.length ? [str] : []
      , keys = enumerate(pairs), i = 0, l = keys.length

    for ( ; i < l; i++ )
      (function(pair){
          var pair = unescape(pair.replace(/\+/g, "%20"))
            , idx = pair.indexOf(_delimiter)
            , key = pair.split(_delimiter, 1)
            , value = pair.slice(idx+1)

          o[key] = value
      }( pairs[keys[i]] ))

    return o
}
, URL = (function(){
    var a = document.createElement("a")
    return {
      parse: function(url) {
          a.href = url;
          return {
              hash: a.hash
            , params: objectify(a.search.slice(1))
            , pathname: (a.pathname[0] != "/" ? "/"+a.pathname : a.pathname)
          };
      }
    }
})()
