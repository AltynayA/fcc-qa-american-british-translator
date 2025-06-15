'use strict';

const Translator = require('../components/translator.js');
const translator = new Translator();

module.exports = function (app) {
    app.route('/api/translate')
        .post((req, res) => {
            const { text, locale } = req.body;

            // missing fields
            if (text === undefined || locale === undefined) {
                return res.json({ error: 'Required field(s) missing' });
            }

            // empty text
            if (text.trim() === '') {
                return res.json({ error: 'No text to translate' });
            }

            // invalid locale
            if (!['american-to-british', 'british-to-american'].includes(locale)) {
                return res.json({ error: 'Invalid value for locale field' });
            }

            // translate
            const result = translator.translate(text, locale);

            // null result or no translation needed
            if (!result || result[0] === text) {
                return res.json({ text, translation: 'Everything looks good to me!' });
            }

            //  return highlighted translation
            return res.json({ text, translation: result[1] });
        });
};
