/**
 * @file Handles the parsing of cookies using two different methods.
 * @author ALexander Hållenius
 */

'use strict'

const CookieManager = require('./CookieManager')
const Cookie = require('./Cookie')
const errors = require('./errors')

const IncomingMessage = require('http').IncomingMessage

/**
 * Parses cookies given a cookie string.
 * 
 * @param {string} cookieString
 * 
 * @return {CookieManager}
 */
function parseFrom (cookieString)
{
	let cookieManager = new CookieManager()
	let cookies = cookieString.split(';')
	
	if (cookies[0] !== '')
		for (let cookie of cookies)
		{
			let [ name, value ] = cookie.split('=')
			
			if (value === undefined)
				// Cookie string is invalid!
				
				throw new Error(errors.invalidCookieString())
			
			name = name.trim()
			value = value.trim()
			
			let curCookie = new Cookie(name, value)
			
			cookieManager._setCookie(curCookie)
		}
	
	return cookieManager
}

/**
 * Retrieves the cookie string from inside the request headers, then parses it 
 * normally.
 * 
 * @param {http.IncomingMessage} request
 * 
 * @return {CookieManager}
 */
function parseWith (request)
{
	if (!request)
		request = {
			headers: {
				cookie: ''
			}
		}
	else if(!request.headers)
		request.headers = {
			cookie: ''
		}
	else if (!request.headers.cookie)
		request.headers.cookie = ''
	
	let cookieString = request.headers.cookie
	
	return parseFrom(cookieString)
}

module.exports = {
	parseFrom: parseFrom, 
	parseWith: parseWith
}
