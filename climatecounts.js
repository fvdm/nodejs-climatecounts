var http = require('http')

var app = {
  
  // API access details
  api: {
    host:    'api.climatecounts.org',
    port:    80,
    version: 1
  },
  
  // Available years
  availableyears: function( cb ) {
    app.talk( 'AvailableYears', cb )
  }),
  
  // Sectors
  sectors: function( cb ) {
    app.talk( 'Sectors', function( res ) {
      var result = {}
      res.forEach( function( sector ) {
        result[ sector.SectorCode ] = sector
      })
      cb( result )
    })
  },
  
  // Companies
  companies: function( params, cb ) {
    var result = {}
    app.talk( 'Companies', params, function( res ) {
      res.forEach( function( company ) {
        result[ company.CompanyID ] = company
      })
    })
    cb( result )
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
          
          req.end()
        })
        response.on( 'close', function() {
          req.end()
        })
      }
    )
    
    req.on( 'error', function() {
      req.end()
    })
  }
}

// ready
module.exports = app