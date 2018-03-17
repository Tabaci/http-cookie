'use strict'

module.exports = {
	notEnoughArgumentsForCookie ()
	{
		return 'Not enough arguments for cookie.'
	}, 
	
	cookieNameMustBeString ()
	{
		return 'Cookie name must be of type string.'
	}, 
	
	cookieValueMustBeString ()
	{
		return 'Cookie value must be of type string.'
	}, 
	
	expiresNotADate ()
	{
		return 'Expires must be instance of Date or null.'
	}, 
	
	maxAgeNotANumber ()
	{
		return 'Max-Age must be of type number or null.'
	}, 
	
	domainNotAString ()
	{
		return 'Domain must be of type string or null.'
	}, 
	
	pathNotAString ()
	{
		return 'Path must be of type string or null.'
	}, 
	
	stateNotABoolean ()
	{
		return 'State must be a boolean.'
	}, 
	
	sameSiteNotAString ()
	{
		return 'SameSite must be of type string.'
	}, 
	
	sameSiteNotValid ()
	{
		return 'SameSite must be \'Strict\' or \'Lax\'.'
	}, 
	
	expiresFieldNotSet ()
	{
		return 'Expires field needs to be set in order to format expires.'
	}, 
	
	maxAgeCannotBeZero ()
	{
		return 'Max-Age cannot be less than one.'
	}
}
