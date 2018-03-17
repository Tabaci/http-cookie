'use strict'

const CookieManager = require('./../lib/CookieManager')
const Cookie = require('./../lib/Cookie')
const errors = require('./../lib/errors')

const expect = require('chai').expect

describe('CookieManager', function () {
	describe('#setCookieBy (name, value)', function () {
		let cookieManager = new CookieManager()
		
		it('should create a new cookie and add it to the cookie manager', function () {
			cookieManager.setCookieBy('name', 'val')
			
			expect(cookieManager.getCookieBy('name')._value).to.equal('val')
		})
		
		it('should set the _modified flag of the new cookie', function () {
			let cookie = cookieManager.setCookieBy('name', 'val')
			
			expect(cookie.isModified()).to.equal(true)
		})
		
		it('should return the new cookie for chaining', function () {
			let cookie = cookieManager.setCookieBy('name', 'val')
			
			expect(cookieManager.getCookieBy('name')).to.equal(cookie)
		})
	})
	
	describe('#setCookie (cookie)', function () {
		let cookieManager = new CookieManager()
		
		it('should add a cookie to the cookie manager', function () {
			cookieManager.setCookie(new Cookie('name', 'val'))
			
			expect(cookieManager.getCookieBy('name')._value).to.equal('val')
		})
		
		it('should override the cookie if it is already set', function () {
			cookieManager.setCookie(new Cookie('hello', 'test'))
			cookieManager.setCookie(new Cookie('hello', 'var'))
			
			expect(cookieManager.getCookieBy('hello')._value).to.equal('var')
		})
		
		it('should set the _modified flag of the new cookie', function () {
			let cookie = cookieManager.setCookie(new Cookie('name', 'val'))
			
			expect(cookie.isModified()).to.equal(true)
		})
		
		it('should return the cookie for chaining', function () {
			let cookie = new Cookie('test', 'val')
			
			expect(cookieManager.setCookie(cookie)).to.equal(cookie)
		})
	})
	
	describe('#_setCookie (cookie)', function () {
		let cookieManager = new CookieManager()
		
		it('should add a new cookie to the cookie manager without setting the _modified flag', function () {
			cookieManager._setCookie(new Cookie('name', 'val'))
			
			expect(cookieManager.getCookieBy('name').isModified())
					.to.equal(false)
		})
	})
	
	describe('#getCookieBy (name)', function () {
		let cookieManager = new CookieManager()
		
		it('should return a cookie by the given name', function () {
			let cookie = cookieManager.setCookieBy('name', 'val')
			
			expect(cookieManager.getCookieBy('name')).to.equal(cookie)
		})
		
		it('should return null if there is no cookie by that name', function () {
			expect(cookieManager.getCookieBy('test')).to.be.null
		})
	})
	
	describe('#createHeaders', function () {
		it('should return the headers of all modified cookies when called', function () {
			let cookieManager = new CookieManager()
			cookieManager.setCookie(new Cookie('name', 'val'))
			cookieManager.setCookie(new Cookie('test', 'hey').setPath('/'))
			cookieManager._setCookie(new Cookie('hello', 'wow'))
			
			expect(cookieManager.createHeaders()).to.deep.equal([
				'name=val', 
				'test=hey; Path=/'
			])
			
			// TODO: function stub
		})
	})
})


