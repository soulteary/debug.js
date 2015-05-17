describe('#Debug', function () {

    var debug = window.Debug;

    it('Global `Debug`\'s type should be `Function`.', function () {
        (typeof debug).should.equal(typeof describe);
    });

    it('Debug.fn should be exist.', function () {
        (debug.fn).should.be.ok;
    });

    it('Debug.fn.init should be exist.', function () {
        (debug.fn.init).should.be.ok;
    });

    it('Debug.extend should be exist.', function () {
        (debug.extend).should.be.ok;
    });

    it('Debug.extend should be equl as Debug.fn.extend .', function () {
        (debug.fn.extend).should.equal(debug.extend);
    });

});

describe('#Debug()', function () {

    var debug = window.Debug;

    it('Global instance\'s type should be `Function`.', function () {
        debug(5);
        (typeof debug).should.equal(typeof describe);
    });

    it('Debug.`method` should be exist when debug level is `5`.', function () {
        debug(5);
        (debug.log).should.be.ok;
        (debug.log() === undefined).should.be.true;
        (debug.debug).should.be.ok;
        (debug.debug() === undefined).should.be.true;
        (debug.info).should.be.ok;
        (debug.info() === undefined).should.be.true;
        (debug.warn).should.be.ok;
        (debug.warn() === undefined).should.be.true;
        (debug.error).should.be.ok;
        (debug.error() === undefined).should.be.true;
    });

    it('Debug.log should be return `404`, others should be `undefined` when debug level is `4`.', function () {
        debug(4);
        (debug.log).should.be.ok;
        (debug.log() === 404).should.be.true;
        (debug.debug).should.be.ok;
        (debug.debug() === undefined).should.be.true;
        (debug.info).should.be.ok;
        (debug.info() === undefined).should.be.true;
        (debug.warn).should.be.ok;
        (debug.warn() === undefined).should.be.true;
        (debug.error).should.be.ok;
        (debug.error() === undefined).should.be.true;
    });

    it('Debug.log && Debug.debug should be return `404`, others should be `undefined` when debug level is `3`.', function () {
        debug(3);
        (debug.log).should.be.ok;
        (debug.log() === 404).should.be.true;
        (debug.debug).should.be.ok;
        (debug.debug() === 404).should.be.true;
        (debug.info).should.be.ok;
        (debug.info() === undefined).should.be.true;
        (debug.warn).should.be.ok;
        (debug.warn() === undefined).should.be.true;
        (debug.error).should.be.ok;
        (debug.error() === undefined).should.be.true;
    });

    it('Debug.log && Debug.debug && Debug.info should be return `404`, others should be `undefined` when debug level is `2`.', function () {
        debug(2);
        (debug.log).should.be.ok;
        (debug.log() === 404).should.be.true;
        (debug.debug).should.be.ok;
        (debug.debug() === 404).should.be.true;
        (debug.info).should.be.ok;
        (debug.info() === 404).should.be.true;
        (debug.warn).should.be.ok;
        (debug.warn() === undefined).should.be.true;
        (debug.error).should.be.ok;
        (debug.error() === undefined).should.be.true;
    });

    it('Only Debug.error isn\'t return `404`, others should be `404` when debug level is `1`.', function () {
        debug(1);
        (debug.log).should.be.ok;
        (debug.log() === 404).should.be.true;
        (debug.debug).should.be.ok;
        (debug.debug() === 404).should.be.true;
        (debug.info).should.be.ok;
        (debug.info() === 404).should.be.true;
        (debug.warn).should.be.ok;
        (debug.warn() === 404).should.be.true;
        (debug.error).should.be.ok;
        (debug.error() === undefined).should.be.true;
    });

    it('Every method should return `404` when debug level is `0`.', function () {
        debug(0);
        (debug.log).should.be.ok;
        (debug.log() === 404).should.be.true;
        (debug.debug).should.be.ok;
        (debug.debug() === 404).should.be.true;
        (debug.info).should.be.ok;
        (debug.info() === 404).should.be.true;
        (debug.warn).should.be.ok;
        (debug.warn() === 404).should.be.true;
        (debug.error).should.be.ok;
        (debug.error() === 404).should.be.true;
    });

});

describe('#Debug(), set level by word.', function () {

    var debug = window.Debug;

    it('Global instance\'s type should be `Function`.', function () {
        debug('log');
        (typeof debug).should.equal(typeof describe);
    });

    it('Debug.`method` should be exist when debug level is `\'log\'`.', function () {
        debug('log');
        (debug.log).should.be.ok;
        (debug.log() === undefined).should.be.true;
        (debug.debug).should.be.ok;
        (debug.debug() === undefined).should.be.true;
        (debug.info).should.be.ok;
        (debug.info() === undefined).should.be.true;
        (debug.warn).should.be.ok;
        (debug.warn() === undefined).should.be.true;
        (debug.error).should.be.ok;
        (debug.error() === undefined).should.be.true;
    });

    it('Debug.log should be return `404`, others should be `undefined` when debug level is `\'debug\'`.', function () {
        debug('debug');
        (debug.log).should.be.ok;
        (debug.log() === 404).should.be.true;
        (debug.debug).should.be.ok;
        (debug.debug() === undefined).should.be.true;
        (debug.info).should.be.ok;
        (debug.info() === undefined).should.be.true;
        (debug.warn).should.be.ok;
        (debug.warn() === undefined).should.be.true;
        (debug.error).should.be.ok;
        (debug.error() === undefined).should.be.true;
    });

    it('Debug.log && Debug.debug should be return `404`, others should be `undefined` when debug level is `\'info\'`.', function () {
        debug('info');
        (debug.log).should.be.ok;
        (debug.log() === 404).should.be.true;
        (debug.debug).should.be.ok;
        (debug.debug() === 404).should.be.true;
        (debug.info).should.be.ok;
        (debug.info() === undefined).should.be.true;
        (debug.warn).should.be.ok;
        (debug.warn() === undefined).should.be.true;
        (debug.error).should.be.ok;
        (debug.error() === undefined).should.be.true;
    });

    it('Debug.log && Debug.debug && Debug.info should be return `404`, others should be `undefined` when debug level is `\'warn\'`.', function () {
        debug('warn');
        (debug.log).should.be.ok;
        (debug.log() === 404).should.be.true;
        (debug.debug).should.be.ok;
        (debug.debug() === 404).should.be.true;
        (debug.info).should.be.ok;
        (debug.info() === 404).should.be.true;
        (debug.warn).should.be.ok;
        (debug.warn() === undefined).should.be.true;
        (debug.error).should.be.ok;
        (debug.error() === undefined).should.be.true;
    });

    it('Only Debug.error isn\'t return `404`, others should be `404` when debug level is `\'error\'`.', function () {
        debug('error');
        (debug.log).should.be.ok;
        (debug.log() === 404).should.be.true;
        (debug.debug).should.be.ok;
        (debug.debug() === 404).should.be.true;
        (debug.info).should.be.ok;
        (debug.info() === 404).should.be.true;
        (debug.warn).should.be.ok;
        (debug.warn() === 404).should.be.true;
        (debug.error).should.be.ok;
        (debug.error() === undefined).should.be.true;
    });

    it('Every method should return `404` when debug level is `\'off\'`.', function () {
        debug('off');
        (debug.log).should.be.ok;
        (debug.log() === 404).should.be.true;
        (debug.debug).should.be.ok;
        (debug.debug() === 404).should.be.true;
        (debug.info).should.be.ok;
        (debug.info() === 404).should.be.true;
        (debug.warn).should.be.ok;
        (debug.warn() === 404).should.be.true;
        (debug.error).should.be.ok;
        (debug.error() === 404).should.be.true;
    });

});