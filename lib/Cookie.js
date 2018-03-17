'use strict'

const errors = require('./errors')

/**
 * @author Alexander Hållenius
 * 
 * Represents an http cookie.
 */
module.exports = class Cookie
{
	/**
	 * @param {string} name
	 * @param {string} value
	 */
	constructor (
			name, 
			value)
	{
		if (arguments.length < 2)
			throw new Error(errors.notEnoughArgumentsForCookie())
		else if (typeof name !== 'string')
			throw new TypeError(errors.cookieNameMustBeString())
		else if (typeof value !== 'string')
			throw new TypeError(errors.cookieValueMustBeString())
		
		/**
		 * @type {string}
		 */
		this._name = name
		
		/**
		 * @type {string}
		 */
		this._value = value
		
		/**
		 * @type {?Date}
		 */
		this._expires = null
		
		/**
		 * @type {?number}
		 */
		this._maxAge = null
		
		/**
		 * @type {?string}
		 */
		this._domain = null
		
		/**
		 * @type {?string}
		 */
		this._path = null
		
		/**
		 * @type {boolean}
		 */
		this._secure = false
		
		/**
		 * @type {boolean}
		 */
		this._httpOnly = false
		
		/**
		 * @type {?string}
		 */
		this._sameSite = null
	}
	
	/**
	 * @param {?Date} date
	 * 
	 * @return {Cookie} This for chaining.
	 */
	setExpires (date)
	{
		if (date !== null && !(date instanceof Date))
			throw new TypeError(errors.expiresNotADate())
		
		this._expires = date
		
		return this
	}
	
	/**
	 * @param {?number} number
	 * 
	 * @return {Cookie} This for chaining.
	 */
	setMaxAge (number)
	{
		if (number !== null)
			if (typeof number !== 'number')
				throw new TypeError(errors.maxAgeNotANumber())
			else if (number <= 0)
				throw new Error(errors.maxAgeCannotBeZero())
		
		this._maxAge = number
		
		return this
	}
	
	/**
	 * @param {?string} domain
	 * 
	 * @return {Cookie} This for chaining.
	 */
	setDomain (domain)
	{
		if (domain !== null && typeof domain !== 'string')
			throw new TypeError(errors.domainNotAString())
		
		this._domain = domain
		
		return this
	}
	
	/**
	 * @param {?string} path
	 * 
	 * @return {Cookie} This for chaining.
	 */
	setPath (path)
	{
		if (path !== null && typeof path !== 'string')
			throw new TypeError(errors.pathNotAString())
		
		this._path = path
		
		return this
	}
	
	/**
	 * @param {boolean} state
	 * 
	 * @return {Cookie} This for chaining.
	 */
	setSecure (state)
	{
		if (typeof state !== 'boolean')
			throw new TypeError(errors.stateNotABoolean())
		
		this._secure = state
		
		return this
	}
	
	/**
	 * @param {boolean} state
	 * 
	 * @return {Cookie} This for chaining.
	 */
	setHttpOnly (state)
	{
		if (typeof state !== 'boolean')
			throw new TypeError(errors.stateNotABoolean())
		
		this._httpOnly = state
		
		return this
	}
	
	/**
	 * Must be Strict or Lax.
	 * 
	 * @param {?string} sameSite
	 * 
	 * @return {Cookie} This for chaining.
	 */
	setSameSite (sameSite)
	{
		if (sameSite !== null)
			if (typeof sameSite !== 'string')
				throw new TypeError(errors.sameSiteNotAString())
			else if (!['strict', 'lax'].includes(sameSite.toLowerCase()))
				throw new Error(errors.sameSiteNotValid())
		
		if (sameSite === null)
			this._sameSite = null
		else
			this._sameSite = sameSite[0].toUpperCase() + 
					sameSite.substring(1).toLowerCase()
		
		return this
	}
	
	/**
	 * Formats date to: 
	 * <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
	 * 
	 * @return {string}
	 */
	formatExpires ()
	{
		if (this._expires === null)
			throw new Error(errors.expiresFieldNotSet())
		
		// Convert the date to GMT 0
		let expires = this._expires
		expires = new Date(expires.valueOf() + 
				expires.getTimezoneOffset() * 60000)
		
		// Built the date string
		let dateString = ''
		let dayNames = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
		
		let dayName = dayNames[expires.getDay()]
		dateString += dayName + ', '
		
		let date = expires.getDate().toString()
		if (date.length === 1) date = '0' + date
		dateString += date + ' '
		
		let monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
		let monthName = monthNames[expires.getMonth()]
		dateString += monthName + ' '
		
		let fullYear = expires.getFullYear()
		dateString += fullYear + ' '
		
		let hours = expires.getHours().toString()
		if (hours.length === 1) hours = '0' + hours
		dateString += hours + ':'
		
		let minutes = expires.getMinutes().toString()
		if (minutes.length === 1) minutes = '0' + minutes
		dateString += minutes + ':'
		
		let seconds = expires.getSeconds().toString()
		if (seconds.length === 1) seconds = '0' + seconds
		dateString += seconds + ' '
		
		dateString += 'GMT'
		
		return dateString
	}
	
	format ()
	{
		let cookieString = this._name + '=' + this._value
		
		if (this._expires !== null)
			cookieString += '; Expires=' + this.formatExpires()
		if (this._maxAge !== null)
			cookieString += '; Max-Age=' + this._maxAge
		if (this._domain !== null)
			cookieString += '; Domain=' + this._domain
		if (this._path !== null)
			cookieString += '; Path=' + this._path
		if (this._secure === true)
			cookieString += '; Secure'
		if (this._httpOnly === true)
			cookieString += '; HttpOnly'
		if (this._sameSite !== null)
			cookieString += '; SameSite=' + this._sameSite
		
		return cookieString
	}
}
