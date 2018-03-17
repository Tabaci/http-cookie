/**
 * @file Handles the parsing of cookies using two different methods.
 * @author ALexander Hållenius
 */

'use strict'

/**
 * Parses cookies given a cookie string.
 * 
 * @param {string} cookieString
 */
function parseFrom (cookieString)
{
	
}

/**
 * Retrieves the cookie string from inside the request headers, then parses it 
 * normally.
 * 
 * @param {http.IncomingMessage} request
 */
function parseWith (request)
{
	let cookieString = request.header.cookie || ''
	
	return parseFrom(cookieString)
}

module.exports = {
	parseFrom: parseFrom, 
	parseWith: parseWith
}
