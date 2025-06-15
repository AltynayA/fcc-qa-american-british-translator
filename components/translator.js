const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

const reverseDict = (obj) =>
    Object.assign({}, ...Object.entries(obj).map(([k, v]) => ({ [v]: k })));

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

class Translator {
    toBritishEnglish(text) {
        const dict = { ...americanOnly, ...americanToBritishSpelling };
        const titles = americanToBritishTitles;
        const timeRegex = /(\d{1,2}):(\d{2})/g;

        return this.translateInternal(text, dict, titles, timeRegex, 'toBritish');
    }

    toAmericanEnglish(text) {
        const dict = { ...britishOnly, ...reverseDict(americanToBritishSpelling) };
        const titles = reverseDict(americanToBritishTitles);
        const timeRegex = /(\d{1,2})\.(\d{2})/g;

        return this.translateInternal(text, dict, titles, timeRegex, 'toAmerican');
    }

    translateInternal(text, dict, titles, timeRegex, locale) {
        const lowerText = text.toLowerCase();
        const matchesMap = {};

        // Titles (Mr., Dr., etc.)
        for (let [americanTitle, britishTitle] of Object.entries(titles)) {
            const regex = new RegExp(`\\b${escapeRegex(americanTitle)}`, 'gi');
            const matches = text.match(regex);
            if (matches) {
                matches.forEach((match) => {
                    const replacement = britishTitle.charAt(0).toUpperCase() + britishTitle.slice(1);
                    matchesMap[match.toLowerCase()] = replacement;
                });
            }
        }

        // Phrases with spaces
        const phrases = Object.entries(dict).filter(([k]) => k.includes(' '));
        for (let [k, v] of phrases) {
            const regex = new RegExp(`\\b${escapeRegex(k)}\\b`, 'i');
            if (regex.test(lowerText)) {
                matchesMap[k] = v;
            }
        }

        // Single words
        const words = lowerText.match(/\b[\w\-']+\b/g) || [];
        for (let word of words) {
            if (dict[word]) {
                matchesMap[word] = dict[word];
            }
        }

        // Time formats
        const times = text.match(timeRegex);
        if (times) {
            for (let t of times) {
                const replacement =
                    locale === 'toBritish' ? t.replace(':', '.') : t.replace('.', ':');
                matchesMap[t] = replacement;
            }
        }

        if (Object.keys(matchesMap).length === 0) return null;

        const plain = this.replaceAll(text, matchesMap);
        const highlighted = this.replaceAllWithHighlight(text, matchesMap);
        return [plain, highlighted];
    }

    replaceAll(text, matchesMap) {
        const reg = new RegExp(
            Object.keys(matchesMap)
                .map(escapeRegex)
                .sort((a, b) => b.length - a.length)
                .join('|'),
            'gi'
        );

        return text.replace(reg, (match) => {
            const key = match.toLowerCase();
            return matchesMap[key] || match;
        });
    }

    replaceAllWithHighlight(text, matchesMap) {
        const reg = new RegExp(
            Object.keys(matchesMap)
                .map(escapeRegex)
                .sort((a, b) => b.length - a.length)
                .join('|'),
            'gi'
        );

        return text.replace(reg, (match) => {
            const key = match.toLowerCase();
            const replacement = matchesMap[key] || match;
            return `<span class="highlight">${replacement}</span>`;
        });
    }

    // ✅ Dispatcher: choose based on locale field
    translate(text, locale) {
        if (locale === 'american-to-british') {
            return this.toBritishEnglish(text);
        }
        if (locale === 'british-to-american') {
            return this.toAmericanEnglish(text);
        }
        return null;
    }
}

module.exports = Translator;
