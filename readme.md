# http-cookie

This *npm* module parses a cookie string from either a request or a plain string 
and provides formatting for setting the `Set-Cookie` headers.

## Installation

```javascript
npm install http-cookie
```

## Usage

In order to start using *http-cookie*, we first need to parse a cookie string, 
thus retrieving a `CookieManager`, from which we can add more cookies, 
modify cookies and format the `Set-Cookie` headers:

```javascript
const parser = require('http-cookie')
let manager

// Parse from an http.IncomingMessage
manager = parser.parseWith(request)

// Parse from a string
manager = parser.parseFrom('number=five;sheathe=dagger')
```

Both `parseWith` and `parseFrom` returns a `CookieManager` containing all 
cookies from the cookie string that was parsed. If the cookie string is empty 
(or in the request's case not defined at all), the `CookieManager` will contain 
no cookies.

### Adding Cookies

Adding a cookie uses the `setCookieBy` and `setCookie` methods on the 
`CookieManager` accordingly:

```javascript
let cookie = manager.setCookieBy('name', 'value')
let cookie = manager.setCookie(new Cookie('name', 'value'))
```

Both methods return the newly added cookie for chaining.

### `Cookie` Methods

By calling methods on a `Cookie`, you are changing the resulting `Set-Cookie` 
header. The methods are fully chainable, and will always return the `Cookie` 
back for further calls.

#### `setExpires (date)`

The expiration of the cookie. Whatsoever the timezone you might create the 
cookie with, it will be converted to GMT+0 to conform with the http cookie 
standards. Enter `null` to toggle off.

```javascript
cookie.setExpires(new Date())
```

#### `setMaxAge (number)`

Sets the max age of the cookie. The `number` is the number of seconds the cookie 
will exist until deleted. Enter `null` to toggle off.

```javascript
cookie.setMaxAge(200)
```

#### `setDomain (domain)`

The domain for the cookie to reside on. Enter `null` to toggle off.

```javascript
cookie.setDomain('example.com')
```

#### `setPath (path)`

The path for the cookie to reside on. Enter `null` to toggle off.

```javascript
cookie.setPath('/')
```

#### `setSecure (state)`

Whether to send as secure or not. Enter `false` to toggle off.

```javascript
cookie.setSecure(true)
```

#### `setHttpOnly (state)`

Whether to send as HttpOnly or not. Enter `false` to toggle off.

```javascript
cookie.setHttpOnly(true)
```

#### `setSameSite (sameSite)`

One of two strings: `strict` or `lax`. Set to `null` to toggle off.

```javascript
cookie.setSameSite('lAX')
cookie.setSameSite('lax')
```

### Accessing Cookies

You can access a cookie by sending in its name:

```
let cookie = manager.getCookieBy('name')
```

If the cookie does not exist, `null` will be returned instead.

### Removing Cookies

According to the HTTP specification, cookies cannot be deleted from the server. 
There is however a way around this. By utilizing the `setMaxAge`, you can make 
it reach that max age directly:

```
manager.getCookieBy('cookieToDelete').setMaxAge(0)
```

## `Set-Cookie` Header

You can send the modified cookies back to the client by utilizing the 
`setHeaders (response)` method available on the `CookieManager`. This will set 
the `Set-Cookie` header to include all the modified cookies.

```javascript
manager.setHeaders(response)
```

If you would rather retrieve the array that contains all the correctly formatted 
`Set-Cookie` header strings, you can call `createHeaders`.

```javascript
manager.createHeaders()
```

## Full Example

```javascript
const parser = require('http-cookie')

// Let us assume these are actually set
let request
let response

let manager = parser.parseFrom(request)

if (manager.getCookieBy('_sessid') === null)
	manager.setCookieBy('_sessid', 'totally-random-string').setHttpOnly(true)

manager.setHeaders(response)

// The new cookie (if added) will now be sent back to the client
response.end()
```
