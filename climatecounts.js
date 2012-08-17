/*
Name:     nodejs-climatecounts
Source:   https://github.com/fvdm/nodejs-climatecounts
Feedback: https://github.com/fvdm/nodejs-climatecounts/issues
License:  unlicense / public domain

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
*/

var http = require('http')

var app = {
  
  // Available years
  availableyears: function( cb ) {
    app.talk( 'AvailableYears', function( res ) {
      var result = {}
      res.forEach( function( year ) {
        result[ year.Year ] = year
      })
      cb( result )
    })
  },
  
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
    if( !cb && typeof params == 'function' ) {
      var cb = params
      var params = {}
    }
    
    app.talk( 'Companies', params, function( res ) {
      var result = {}
      res.forEach( function( company ) {
        result[ company.CompanyID ] = company
      })
      cb( result )
    })
  },
  
  brands: function( cb ) {
    app.talk( 'Brands', cb )
  },
  
  // Scores
  scores: function( params, cb ) {
    if( !cb && typeof params == 'function' ) {
      var cb = params
      var params = {}
    }
    
    app.talk( 'Scores', params, cb )
  },
  
  // Aggregate scores
  aggregatescores: function( params, cb ) {
    if( !cb && typeof params == 'function' ) {
      var cb = params
      var params = {}
    }
    app.talk( 'AggregateScores', params, cb )
  },
  
  // Communicate
  talk: function( path, fields, cb ) {
    if( !cb && typeof fields == 'function' ) {
      var cb = fields
      var fields = {}
    }
    
    var url = 'http://api.climatecounts.org/1/'+ path +'.json'
    http.get( url, function( response ) {
      var data = ''
      response.on( 'data', function( part ) { data += part })
      response.on( 'end', function() {
        data = data.toString().trim()
        if( data.length >= 2 && data.substr(0,1) == '{' && data.substr( data.length -1, 1 ) == '}' ) {
          data = JSON.parse( data )
          cb( data[ path ] )
        } else {
          cb( false )
        }
      })
    })
  }
}

// ready
module.exports = app