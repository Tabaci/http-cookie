'use strict'

const CookieManager = require('./../lib/CookieManager')
const Cookie = require('./../lib/Cookie')
const errors = require('./../lib/errors')

const expect = require('chai').expect

describe('Cookie', function () {
	describe('constructor', function () {
		it('should be created with all directives set to either null or false', function () {
			let cookie = new Cookie('test', 'value')
			
			let expected = {
				_expires: null, 
				_maxAge: null, 
				_domain: null, 
				_path: null, 
				_secure: false, 
				_httpOnly: false, 
				_sameSite: null
			}
			
			for (let [key, val] of Object.entries(expected))
				expect(cookie[key]).to.equal(val)
		})
		
		it('should throw an error if name is not a string', function () {
			expect(() => {
				new Cookie(0, 'value')
			}).to.throw(errors.cookieNameMustBeString())
		})
		
		it('should throw an error if value is not a string', function () {
			expect(() => {
				new Cookie('name', 0)
			}).to.throw(errors.cookieValueMustBeString())
		})
		
		it('should throw an error if not enough arguments are presented', function () {
			expect(() => {
				new Cookie('name')
			}).to.throw(errors.notEnoughArgumentsForCookie())
		})
	})
	
	describe('#setExpires (date)', function () {
		let cookie = new Cookie('name', 'value')
		
		it('should set the expires of the cookie', function () {
			let result = new Cookie('name', 'value').setExpires(new Date())
			
			expect(result._expires).to.not.be.null
			
			result.setExpires(null)
			
			expect(result._expires).to.be.null
		})
		
		it('should set the _modified flag when called', function () {
			let testCookie = new Cookie('name', 'value')
			
			testCookie.setExpires(new Date())
			
			expect(testCookie.isModified()).to.equal(true)
		})
		
		it('should return the cookie itself for chaining', function () {
			expect(cookie.setExpires(new Date())).to.equal(cookie)
		})
		
		it('should throw an error if the date is not a Date or null', function () {
			expect(() => {
				cookie.setExpires('date')
			}).to.throw(errors.expiresNotADate())
		})
	})
	
	describe('#setMaxAge (number)', function () {
		let cookie = new Cookie('name', 'value')
		
		it('should set the Max-Age directive of the cookie', function () {
			let result = new Cookie('name', 'value').setMaxAge(200)
			
			expect(result._maxAge).to.not.be.null
			
			result.setMaxAge(null)
			
			expect(result._maxAge).to.be.null
		})
		
		it('should set the _modified flag when called', function () {
			let testCookie = new Cookie('name', 'value')
			
			testCookie.setMaxAge(200)
			
			expect(testCookie.isModified()).to.equal(true)
		})
		
		it('should return the cookie itself for chaining', function () {
			expect(cookie.setMaxAge(2)).to.equal(cookie)
		})
		
		it('should throw an error if number is not a number or null', function () {
			expect(() => {
				cookie.setMaxAge('test')
			}).to.throw(errors.maxAgeNotANumber())
			
			expect(() => {
				cookie.setMaxAge(0)
			}).to.throw(errors.maxAgeCannotBeZero())
		})
	})
	
	describe('#setDomain (domain)', function () {
		let cookie = new Cookie('name', 'value')
		
		it('should set the domain directive of the cookie', function () {
			cookie.setDomain('example.com')
			
			expect(cookie._domain).to.not.be.null
			
			cookie.setDomain(null)
			
			expect(cookie._domain).to.be.null
		})
		
		it('should set the _modified flag when called', function () {
			let testCookie = new Cookie('name', 'value')
			
			testCookie.setDomain('example.com')
			
			expect(testCookie.isModified()).to.equal(true)
		})
		
		it('should return the cookie itself for chaining', function () {
			expect(cookie.setDomain('www.example.com')).to.equal(cookie)
		})
		
		it('should throw an error if the domain is not a string or null', function () {
			expect(() => {
				cookie.setDomain(12)
			}).to.throw(errors.domainNotAString())
		})
	})
	
	describe('#setPath (path)', function () {
		let cookie = new Cookie('name', 'value')
		
		it('should set the path directive of the cookie', function () {
			cookie.setPath('/')
			
			expect(cookie._path).to.not.be.null
			
			cookie.setPath(null)
			
			expect(cookie._path).to.be.null
		})
		
		it('should set the _modified flag when called', function () {
			let testCookie = new Cookie('name', 'value')
			
			testCookie.setPath('/')
			
			expect(testCookie.isModified()).to.equal(true)
		})
		
		it('should return the cookie itself for chaining', function () {
			expect(cookie.setPath('/')).to.equal(cookie)
		})
		
		it('should throw an error if the path is not a string or null', function () {
			expect(() => {
				cookie.setPath(12)
			}).to.throw(errors.pathNotAString())
		})
	})
	
	describe('#setSecure (state)', function () {
		let cookie = new Cookie('name', 'value')
		
		it('should set the secure directive of the cookie', function () {
			expect(cookie.setSecure(true)._secure).to.equal(true)
			expect(cookie.setSecure(false)._secure).to.equal(false)
		})
		
		it('should set the _modified flag when called', function () {
			let testCookie = new Cookie('name', 'value')
			
			testCookie.setSecure(true)
			
			expect(testCookie.isModified()).to.equal(true)
		})
		
		it('should return the cookie itself for chaining', function () {
			expect(cookie.setSecure(true)).to.equal(cookie)
		})
		
		it('should throw an error if state is not a boolean or null', function () {
			expect(() => {
				cookie.setSecure('string')
			}).to.throw(errors.stateNotABoolean())
		})
	})
	
	describe('#setHttpOnly (state)', function () {
		let cookie = new Cookie('name', 'value')
		
		it('should set the httpOnly directive of the cookie', function () {
			expect(cookie.setHttpOnly(true)._httpOnly).to.equal(true)
			expect(cookie.setHttpOnly(false)._httpOnly).to.equal(false)
		})
		
		it('should set the _modified flag when called', function () {
			let testCookie = new Cookie('name', 'value')
			
			testCookie.setHttpOnly(true)
			
			expect(testCookie.isModified()).to.equal(true)
		})
		
		it('should return the cookie itself for chaining', function () {
			expect(cookie.setHttpOnly(true)).to.equal(cookie)
		})
		
		it('should throw an error if state is not a boolean or null', function () {
			expect(() => {
				cookie.setHttpOnly('test')
			}).to.throw(errors.stateNotABoolean())
		})
	})
	
	describe('#setSameSite (value)', function () {
		let cookie = new Cookie('name', 'value')
		
		it('should set the SameSite directive of the cookie', function () {
			expect(cookie.setSameSite('lax')._sameSite).to.equal('Lax')
			expect(cookie.setSameSite('stricT')._sameSite).to.equal('Strict')
			expect(cookie.setSameSite(null)._sameSite).to.be.null
		})
		
		it('should set the _modified flag when called', function () {
			let testCookie = new Cookie('name', 'value')
			
			testCookie.setSameSite('Lax')
			
			expect(testCookie.isModified()).to.equal(true)
		})
		
		it('should return the cookie itself for chaining', function () {
			expect(cookie.setSameSite('lax')).to.equal(cookie)
		})
		
		it('should throw an error if value is not Strict or Lax or null', function () {
			expect(() => {
				cookie.setSameSite(2)
			}).to.throw(errors.sameSiteNotAString())
			
			expect(() => {
				cookie.setSameSite('unknown')
			}).to.throw(errors.sameSiteNotValid())
			
			expect(() => {
				cookie.setSameSite('LAX')
			}).to.not.throw()
			
			expect(() => {
				cookie.setSameSite('StRiCT')
			}).to.not.throw()
		})
	})
	
	describe('#formatExpires', function () {
		it('should throw an error if date field is not set', function () {
			expect(() => {
				new Cookie('name', 'value').formatExpires()
			}).to.throw(errors.expiresFieldNotSet())
		})
		it('should format date to <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT', function () {
			let cookie = new Cookie('name', 'value')
					.setExpires(new Date('October 13, 2014 11:13:00 GMT'))
			
			expect(cookie.formatExpires()).to.equal('Mon, 13 Oct 2014 11:13:00 GMT')
			
			cookie.setExpires(new Date('October 12, 2014 11:13:12 GMT+0100'))
			
			expect(cookie.formatExpires()).to.equal('Sun, 12 Oct 2014 10:13:12 GMT')
			
			cookie.setExpires(new Date('October 5, 2014 01:01:01 GMT'))
			
			expect(cookie.formatExpires()).to.equal('Sun, 05 Oct 2014 01:01:01 GMT')
		})
	})
	
	describe('#format', function () {
		it('should format the cookie into a valid Set-Cookie string', function () {
			expect(new Cookie('name', 'value').format()).to.equal(
					'name=value')
			
			expect(new Cookie('name', 'value').setPath('/').format()).to.equal(
					'name=value; Path=/')
			
			expect(new Cookie('session', 'val')
					.setPath('/')
					.setSameSite('lax')
					.setHttpOnly(true).format())
					.to.equal('session=val; Path=/; HttpOnly; SameSite=Lax')
			
			// Cookie with all directives set
			let cookieMulti = new Cookie('name', 'value')
					.setExpires(new Date('October 13, 2014 11:13:00 GMT'))
					.setMaxAge(200)
					.setDomain('example.com')
					.setPath('/')
					.setSecure(true)
					.setHttpOnly(true)
					.setSameSite('strict')
			let format = cookieMulti.format()
			let validate = 'name=value; Expires=Mon, 13 Oct 2014 11:13:00 GMT; ' + 
					'Max-Age=200; Domain=example.com; Path=/; Secure; ' + 
					'HttpOnly; SameSite=Strict'
			
			expect(format).to.equal(validate)
		})
	})
})