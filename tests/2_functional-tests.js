const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test('Translation with text and locale fields: POST request to /api/translate', (done) => {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: "Mangoes are my favorite fruit.",
                locale: "american-to-british"
            })
            .end((err, res) => {
                assert.equal(res.body.text, "Mangoes are my favorite fruit.");
                assert.include(res.body.translation, '<span class="highlight">favourite</span>');
                done();
            })
    })
    // #2
    test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: "Mangoes are my favorite fruit.",
                locale: "american-to-italian"
            })
            .end((err, res) => {
                assert.equal(res.body.error, 'Invalid value for locale field' )
                // assert.include(res.body.translation, '<span class="highlight">favourite</span>');
                done();
            })
    })
    // #3
    test('Translation with missing text field: POST request to /api/translate', (done) => {
        chai.request(server)
            .post('/api/translate')
            .send({
                locale: "american-to-british"
            })
            .end((err, res) => {
                assert.equal(res.body.error, 'Required field(s) missing')
                done();
            })
    })
//     #4
    test('Translation with missing locale field: POST request to /api/translate', (done) => {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: "Soccer"
            })
            .end((err, res) => {
                assert.equal(res.body.error, 'Required field(s) missing')
                done();
            })
    })


//     #5
    test('Translation with empty text: POST request to /api/translate', (done) => {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: "",
                locale:"american-to-british"
            })
            .end((err, res) => {
                assert.equal(res.body.error, 'No text to translate')
                done();
            })
    })
//     #6
    test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: "Everything is fine.",
                locale: "american-to-british"
            })
            .end((err, res) => {
                assert.equal(res.body.text, "Everything is fine.");
                assert.equal(res.body.translation, "Everything looks good to me!");
                done();
            });
    });

})
