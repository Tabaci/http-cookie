
const parser = require('./../lib/cookie-parser')
const errors = require('./../lib/errors')

const expect = require('chai').expect
const MockReq = require('mock-req')

describe('cookie-parser', function () {
	describe('#parseWith (request)', function () {
		it('should parse all cookies from a cookie string and return a CookieManager', function () {
			let req = new MockReq({
				method: 'GET', 
				url: '/', 
				headers: {
					cookie: 'sessid=hjshdasdas;test=4'
				}
			})
			let manager = parser.parseWith(req)
			
			expect(manager.getCookieBy('sessid')._value).to.equal('hjshdasdas')
			expect(manager.getCookieBy('test')._value).to.equal('4')
		})
		
		it('should work even when the cookie header is undefined', function () {
			expect(() => {
				let req = new MockReq({
					method: 'GET', 
					url: '/', 
					headers: {}
				})
				
				parser.parseWith(req)
			}).to.not.throw()
		})
		
		it('should default request if not defined', function () {
			expect(() => {
				parser.parseWith(null)
			}).to.not.throw()
		})
		
		it('should default headers if not defined', function () {
			expect(() => {
				parser.parseWith({})
			}).to.not.throw()	
		})
		
		it('should default cookie string if not defined', function () {
			expect(() => {
				parser.parseWith({
					headers: {}
				})
			}).to.not.throw()
		})
	})
	
	describe('#parseFrom (cookieString)', function () {
		it('should parse all cookies from an IncomingMessage and return a CookieManager', function () {
			let manager = parser.parseFrom('sessid=hjshdasdas;test=4')
			
			expect(manager.getCookieBy('sessid')._value).to.equal('hjshdasdas')
			expect(manager.getCookieBy('test')._value).to.equal('4')
		})
		
		it('should throw an error if cookie string is not formatted in key-value pairs', function () {
			expect(() => {
				parser.parseFrom('test;hey=2')
			}).to.throw(errors.invalidCookieString())
		})
	})
})
