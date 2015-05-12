/* global activity */
'use strict';

module.exports = {
    'Pageload, no pageId' : function (browser) {
        var chai = require('chai');
        var sinon = require('sinon');
        // var spy = {};
        var noUserIdResult = {};
        var tracker = {foo: 'baz'};
        var tracker2 = {foo: 'bar'};
        browser
        .deleteCookies()
        .getCookies(function callback(result) {
            this.assert.equal(result.value.length, 0);
        })
		.url('http://127.0.0.1:8080/dev/indexNoPageId.html')
        .waitForElementVisible('body', 1000)
		.pause(1000)
		.execute(function(data) {
            return server.requests;
        }, [''], function(res) {
			this.assert.equal(res.value.length, 2);
			
			var requestBody = JSON.parse(res.value[1].requestBody);
			
			chai.assert.include(requestBody[0].object['@id'], 'urn:', 'pageId got urn');
			chai.assert.include(requestBody[0].object['@id'], 'indexNoPageId.html', 'pageId passed');
        })
        .end();
    }
};