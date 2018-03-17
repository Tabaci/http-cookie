'use strict'

const CookieManager = require('./../lib/CookieManager')
const Cookie = require('./../lib/Cookie')
const errors = require('./../lib/errors')

const expect = require('chai').expect

describe('CookieManager', function () {
	let cookieManager = new CookieManager()
	
	describe('#setCookieBy (name, value)', function () {
		it('should create a new cookie and add it to the cookie manager')
		it('should return the new cookie for chaining')
	})
	
	describe('#setCookie (cookie)', function () {
		it('should add a cookie to the cookie manager')
		it('should override the cookie if it is already set')
	})
	
	describe('getCookieBy (name)', function () {
		it('should return a cookie by the given name')
		it('should return null if there is no cookie by that name')
	})
})


