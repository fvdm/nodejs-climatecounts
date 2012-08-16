var http = require('http')

var app = {
  
  // API access details
  api: {
    host:    'api.climatecounts.org',
    port:    80,
    version: 1
  },
  
  // Communicate
  talk: function( path, fields, cb ) {
    if( !cb && typeof fields == 'function' ) {
      var cb = fields
      var fields = {}
    }
    
    var req = http.request(
      {
        host:   app.api.host,
        port:   app.api.port,
        path:   '/'+ app.api.version +'/'+ path +'.json',
        method: 'GET'
      },
      function( response ) {
        var data = ''
        response.on( 'data', function( part ) { data += part })
        response.on( 'end', function() {
          data = data.toString().trim()
          if( data.length >= 2 && data.substr(0,1) == '{' && data.substr( data.length -2, 1 ) == '}' ) {
            cb( JSON.parse( data ) )
          } else {
            cb( false )
          }
        })
      }
    )
  }
}

// ready
module.exports = app