nodejs-climatecounts
====================

Unofficial [Node.js](http://nodejs.org/) module to access the Climate Counts API.

API documentation: http://api.climatecounts.org


# Installation

### With NPM

```
npm install climatecounts
```

```js
var api = require('climatecounts')
```


### From Github

```
git clone https://github.com/fvdm/nodejs-climatecounts
```

```js
var api = require('./nodejs-climatecounts')
```


# Usage

```js
var api = require('climatecounts')
api.companies( {Search: 'amer'}, console.log )
```

```js
{ '25': 
   { CompanyID: 25,
     Name: 'Bank of America',
     SectorCode: 'CB',
     Sector: 'Commercial Banking' },
  '57': 
   { CompanyID: 57,
     Name: 'Sara Lee',
     SectorCode: 'FP',
     Sector: 'Food Products' } }
```


# Methods

## talk
### ( path, [params], callback )

Communicate with the API.

<table>
	<th>parameter</th>
	<th>required</th>
	<th>description</th>
	<th>values</th>
	<tr>
		<td>path</td>
		<td>required</td>
		<td>the method path after the '/version/', and without the .json or .xml</td>
		<td>Companies</td>
	</tr>
	<tr>
		<td>params</td>
		<td>optional</td>
		<td>object with method parameters</td>
		<td>{ Search: 'amer' }</td>
	</tr>
	<tr>
		<td>callback</td>
		<td>required</td>
		<td>function that received the result object, or false on faillure</td>
		<td></td>
	</tr>
</table>


```js
api.talk( 'Companies', {Search: 'amer'}, console.log )
```


## availableyears
### ( callback )

Returns all the years that full data is currently available for.

**Details: http://api.climatecounts.org/docs/AvailableYears.htm**

```js
api.availableyears( console.log )
```

```js
{ '2011': { Year: 2011, NumScores: 136 } }
```


## companies
### ( [params], callback )

Returns company information, searchable by id, sector or freetext.

They are parsed into an object with their CompanyID as item key, for back reference.

**Details: http://api.climatecounts.org/docs/Companies.htm**

<table>
	<th>parameter</th>
	<th>required</th>
	<th>description</th>
	<th>values</th>
	<tr>
		<td>params</td>
		<td>optional</td>
		<td>object with method parameters</td>
		<td>{ Search: 'amer' }</td>
	</tr>
	<tr>
		<td>callback</td>
		<td>required</td>
		<td>function that received the result object, or false on faillure</td>
		<td></td>
	</tr>
</table>

```js
api.companies( {Search: 'amer'}, console.log )
```

```js
{ '25': 
   { CompanyID: 25,
     Name: 'Bank of America',
     SectorCode: 'CB',
     Sector: 'Commercial Banking' },
  '57': 
   { CompanyID: 57,
     Name: 'Sara Lee',
     SectorCode: 'FP',
     Sector: 'Food Products' } }
```


## brands
### ( callback )

Returns all brands and their associated company ids.

**Details: http://api.climatecounts.org/docs/Brands.htm**

```js
api.brand( console.log )
```

```js
[ { CompanyID: 7, Name: '(owned by Continental)' },
  { CompanyID: 25, Name: '100 Federal Street Limited' },
  { CompanyID: 25,
    Name: '1784 S.A. Sociedad Gerente de Fondos Comunes de Inversion' },
  { CompanyID: 21, Name: '180 Energy' },
  { CompanyID: 35, Name: '1st Business Bank' },
  { CompanyID: 93, Name: '20th century Fox' } ]
```


## scores
### ( [params], callback )

Returns company-specific yearly scores, individually or by sector or progress.

**Details: http://api.climatecounts.org/docs/Scores.htm**

<table>
	<th>parameter</th>
	<th>required</th>
	<th>description</th>
	<th>values</th>
	<tr>
		<td>params</td>
		<td>optional</td>
		<td>object with method parameters</td>
		<td>{ Search: 'amer' }</td>
	</tr>
	<tr>
		<td>callback</td>
		<td>required</td>
		<td>function that received the result object, or false on faillure</td>
		<td></td>
	</tr>
</table>

```js
api.scores( {CompanyID: 1}, console.log )
```

```js
[ { Year: 2011,
    CompanyID: 1,
    Company: 'AirTran',
    SectorCode: 'A',
    Sector: 'Airlines',
    Review: 0,
    Reduce: 5,
    PolicyStance: 0,
    Report: 0,
    Total: 5,
    Change: 0,
    Progress: 'Stuck' } ]
```

## aggregatescores
### ( [params], callback )

Returns aggregate scores, combined for all companies per sector, or all sectors inclusive.

**Details: http://api.climatecounts.org/docs/AggregateScores.htm**

<table>
	<th>parameter</th>
	<th>required</th>
	<th>description</th>
	<th>values</th>
	<tr>
		<td>params</td>
		<td>optional</td>
		<td>object with method parameters</td>
		<td>{ Search: 'amer' }</td>
	</tr>
	<tr>
		<td>callback</td>
		<td>required</td>
		<td>function that received the result object, or false on faillure</td>
		<td></td>
	</tr>
</table>

```js
api.aggregatescores( {Year: 2011}, console.log )
```

```js
[ { Year: 2011,
    NumScores: 10,
    Total: 37,
    Review: 9,
    Reduce: 23,
    PolicyStance: 0,
    Report: 5,
    Change: 1,
    SectorCode: 'A',
    Sector: 'Airlines' },
  { Year: 2011,
    NumScores: 7,
    Total: 48,
    Review: 14,
    Reduce: 23,
    PolicyStance: 4,
    Report: 6,
    Change: 7,
    SectorCode: 'AA',
    Sector: 'Apparel' } ]
```


# Unlicense

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