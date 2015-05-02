var assert = require("assert")
describe('Debug', function(){
    describe('#Debug', function(){
        var debug = require("../dist/debug.min.js");
        it('debug should be export as function', function(){
            assert.equal(typeof assert, typeof debug);
        })
    })

    describe('#Debug()', function(){
        var debug = require("../dist/debug.min.js");
        it('debug should be export as function', function(){
            console.log( typeof debug()  )
            assert.equal(typeof debug(),typeof debug);
        })
    })

})
