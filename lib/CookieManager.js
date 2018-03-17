'use strict'

const Cookie = require('./Cookie')

/**
 * @author Alexander Hållenius
 * 
 * Manages multiple cookies.
 */
module.exports = class CookieManager
{
	constructor ()
	{
		/**
		 * @type {Object.<string, Cookie>}
		 */
		this._cookies = {}
	}
	
	/**
	 * @param {string} name
	 * @param {string} value
	 * 
	 * @return {Cookie} The newly created cookie that was set.
	 */
	setCookieBy (
			name, 
			value)
	{
		return this.setCookie(new Cookie(name, value))
	}
	
	/**
	 * @param {Cookie} cookie
	 * 
	 * @return {Cookie} The cookie that was set.
	 */
	setCookie (cookie)
	{
		cookie._modified = true
		
		this._cookies[cookie._name] = cookie
		
		return cookie
	}
	
	/**
	 * @param {string} name
	 * 
	 * @return {Cookie} Cookie by given name, or null if no such cookie exists.
	 */
	getCookieBy (name)
	{
		return this._cookies[name] || null
	}
	
	/**
	 * Internal set cookie method. This method does not set the _modified flag 
	 * automatically.
	 * 
	 * @private
	 * 
	 * @param {Cookie}
	 */
	_setCookie (cookie)
	{
		this._cookies[cookie._name] = cookie
	}
	
	/**
	 * @return {string[]} returns an array of Set-Cookie headers.
	 */
	createHeaders ()
	{
		let setCookies = []
		
		for (let [, cookie] of Object.entries(this._cookies))
			if (cookie.isModified())
				// We only send back cookies if they have been modified
				
				setCookies.push(cookie.format())
		
		return setCookies
	}
}
