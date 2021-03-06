describe('#Debug', function () {


    it('Global `Debug`\'s type should be `Function`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            expect(typeof debug).to.be(typeof expect);
        });
    });

    it('Debug.fn should be exist.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            expect(debug.fn).to.be.ok();
        });
    });

    it('Debug.fn.init should be exist.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            expect(debug.fn.init).to.be.ok();
        });
    });

    it('Debug.extend should be exist.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            expect(debug.extend).to.be.ok();
        });
    });

    it('Debug.extend should be equl as Debug.fn.extend .', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            expect(debug.fn.extend).to.be(debug.extend);
        });
    });

});

describe('#Debug()', function () {

    it('Global instance\'s type should be `Function`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug(5);
            expect(typeof debug).to.be(typeof expect);
        });
    });

    it('Debug.`method` should be exist when debug level is `5`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug(5);
            expect(debug.log).to.be.ok();
            expect(debug.log()).to.be(undefined);
            expect(debug.debug).to.be.ok();
            expect(debug.debug()).to.be(undefined);
            expect(debug.info).to.be.ok();
            expect(debug.info()).to.be(undefined);
            expect(debug.warn).to.be.ok();
            expect(debug.warn()).to.be(undefined);
            expect(debug.error).to.be.ok();
            expect(debug.error()).to.be(undefined);
        });
    });

    it('Debug.log should be return `404`, others should be `undefined` when debug level is `4`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug(4);
            expect(debug.log).to.be.ok();
            expect(debug.log()).to.be(404);
            expect(debug.info).to.be.ok();
            expect(debug.debug()).to.be(undefined);
            expect(debug.info).to.be.ok();
            expect(debug.info()).to.be(undefined);
            expect(debug.warn).to.be.ok();
            expect(debug.warn()).to.be(undefined);
            expect(debug.error).to.be.ok();
            expect(debug.error()).to.be(undefined);
        });
    });

    it('Debug.log && Debug.debug should be return `404`, others should be `undefined` when debug level is `3`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug(3);
            expect(debug.log).to.be.ok();
            expect(debug.log()).to.be(404);
            expect(debug.debug).to.be.ok();
            expect(debug.debug()).to.be(404);
            expect(debug.info).to.be.ok();
            expect(debug.info()).to.be(undefined);
            expect(debug.warn).to.be.ok();
            expect(debug.warn()).to.be(undefined);
            expect(debug.error).to.be.ok();
            expect(debug.error()).to.be(undefined);
        });
    });

    it('Debug.log && Debug.debug && Debug.info should be return `404`, others should be `undefined` when debug level is `2`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug(2);
            expect(debug.log).to.be.ok();
            expect(debug.log()).to.be(404);
            expect(debug.debug).to.be.ok();
            expect(debug.debug()).to.be(404);
            expect(debug.info).to.be.ok();
            expect(debug.info()).to.be(404);
            expect(debug.warn).to.be.ok();
            expect(debug.warn()).to.be(undefined);
            expect(debug.error).to.be.ok();
            expect(debug.error()).to.be(undefined);
        });
    });

    it('Only Debug.error isn\'t return `404`, others should be `404` when debug level is `1`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug(1);
            expect(debug.log).to.be.ok();
            expect(debug.log()).to.be(404);
            expect(debug.debug).to.be.ok();
            expect(debug.debug()).to.be(404);
            expect(debug.info).to.be.ok();
            expect(debug.info()).to.be(404);
            expect(debug.warn).to.be.ok();
            expect(debug.warn()).to.be(404);
            expect(debug.error).to.be.ok();
            expect(debug.error()).to.be(undefined);
        });
    });

    it('Every method should return `404` when debug level is `0`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug(0);
            expect(debug.log).to.be.ok();
            expect(debug.log()).to.be(404);
            expect(debug.debug).to.be.ok();
            expect(debug.debug()).to.be(404);
            expect(debug.info).to.be.ok();
            expect(debug.info()).to.be(404);
            expect(debug.warn).to.be.ok();
            expect(debug.warn()).to.be(404);
            expect(debug.error).to.be.ok();
            expect(debug.error()).to.be(404);
        });
    });

});

describe('#Debug(), set level by word.', function () {

    it('Global instance\'s type should be `Function`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug('log');
            expect(typeof debug).to.be(typeof expect);
        });
    });

    it('Debug.`method` should be exist when debug level is `\'log\'`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug('log');
            expect(debug.log).to.be.ok();
            expect(debug.log()).to.be(undefined);
            expect(debug.debug).to.be.ok();
            expect(debug.debug()).to.be(undefined);
            expect(debug.info).to.be.ok();
            expect(debug.info()).to.be(undefined);
            expect(debug.warn).to.be.ok();
            expect(debug.warn()).to.be(undefined);
            expect(debug.error).to.be.ok();
            expect(debug.error()).to.be(undefined);
        });
    });

    it('Debug.log should be return `404`, others should be `undefined` when debug level is `\'debug\'`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug('debug');
            expect(debug.log).to.be.ok();
            expect(debug.log()).to.be(404);
            expect(debug.info).to.be.ok();
            expect(debug.debug()).to.be(undefined);
            expect(debug.info).to.be.ok();
            expect(debug.info()).to.be(undefined);
            expect(debug.warn).to.be.ok();
            expect(debug.warn()).to.be(undefined);
            expect(debug.error).to.be.ok();
            expect(debug.error()).to.be(undefined);
        });
    });

    it('Debug.log && Debug.debug should be return `404`, others should be `undefined` when debug level is `\'info\'`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug('info');
            expect(debug.log).to.be.ok();
            expect(debug.log()).to.be(404);
            expect(debug.debug).to.be.ok();
            expect(debug.debug()).to.be(404);
            expect(debug.info).to.be.ok();
            expect(debug.info()).to.be(undefined);
            expect(debug.warn).to.be.ok();
            expect(debug.warn()).to.be(undefined);
            expect(debug.error).to.be.ok();
            expect(debug.error()).to.be(undefined);
        });
    });

    it('Debug.log && Debug.debug && Debug.info should be return `404`, others should be `undefined` when debug level is `\'warn\'`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug('warn');
            expect(debug.log).to.be.ok();
            expect(debug.log()).to.be(404);
            expect(debug.debug).to.be.ok();
            expect(debug.debug()).to.be(404);
            expect(debug.info).to.be.ok();
            expect(debug.info()).to.be(404);
            expect(debug.warn).to.be.ok();
            expect(debug.warn()).to.be(undefined);
            expect(debug.error).to.be.ok();
            expect(debug.error()).to.be(undefined);
        });
    });

    it('Only Debug.error isn\'t return `404`, others should be `404` when debug level is `\'error\'`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug('error');
            expect(debug.log).to.be.ok();
            expect(debug.log()).to.be(404);
            expect(debug.debug).to.be.ok();
            expect(debug.debug()).to.be(404);
            expect(debug.info).to.be.ok();
            expect(debug.info()).to.be(404);
            expect(debug.warn).to.be.ok();
            expect(debug.warn()).to.be(404);
            expect(debug.error).to.be.ok();
            expect(debug.error()).to.be(undefined);
        });
    });

    it('Every method should return `404` when debug level is `\'off\'`.', function () {
        seajs.use('debug', function (Debug) {
            var debug = Debug;
            debug('off');
            expect(debug.log).to.be.ok();
            expect(debug.log()).to.be(404);
            expect(debug.debug).to.be.ok();
            expect(debug.debug()).to.be(404);
            expect(debug.info).to.be.ok();
            expect(debug.info()).to.be(404);
            expect(debug.warn).to.be.ok();
            expect(debug.warn()).to.be(404);
            expect(debug.error).to.be.ok();
            expect(debug.error()).to.be(404);
        });
    });

});
