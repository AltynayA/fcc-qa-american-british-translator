const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator()
suite('Unit Tests', () => {
    suite('American to British', () => {
        //     #1
        test('Translate Mangoes are my favorite fruit.', () => {
            const result = translator.toBritishEnglish("Mangoes are my favorite fruit.");
            assert.equal(result[0], "Mangoes are my favourite fruit.");
        });
    //     #2
        test('Translate I ate yogurt for breakfast.', () => {
            const result = translator.toBritishEnglish("I ate yogurt for breakfast.");
            assert.equal(result[0], "I ate yoghurt for breakfast.");
        });
    //     #3
        test("Translate We had a party at my friend's condo. ", () => {
            const result = translator.toBritishEnglish("We had a party at my friend's condo.");
            assert.equal(result[0], "We had a party at my friend's flat.");
        });

        //     #4
        test('Translate Can you toss this in the trashcan for me? ', () => {
            const result = translator.toBritishEnglish("Can you toss this in the trashcan for me?");
            assert.equal(result[0], "Can you toss this in the bin for me?");
        });

        //     #5
        test('Translate The parking lot was full. ', () => {
            const result = translator.toBritishEnglish("The parking lot was full.");
            assert.equal(result[0], "The car park was full.");
        });
        //     #6
        test('Translate Like a high tech Rube Goldberg machine. ', () => {
            const result = translator.toBritishEnglish("Like a high tech Rube Goldberg machine.");
            assert.equal(result[0], "Like a high tech Heath Robinson device.");
        });
    //     #7
        test("Translate To play hooky means to skip class or work.", () => {
            const result = translator.toBritishEnglish("To play hooky means to skip class or work.");
            assert.equal(result[0], "To bunk off means to skip class or work.");
        });
        // #8
        test("Translate No Mr. Bond, I expect you to die.", () => {
            const result = translator.toBritishEnglish("No Mr. Bond, I expect you to die.");
            assert.equal(result[0], "No Mr Bond, I expect you to die.");
        });
        // #9
        test("Translate Dr. Grosh will see you now.", () => {
            const result = translator.toBritishEnglish("Dr. Grosh will see you now.");
            assert.equal(result[0], "Dr Grosh will see you now.");
        });
        // #10
        test("Translate Lunch is at 12:15 today.", () => {
            const result = translator.toBritishEnglish("Lunch is at 12:15 today.");
            assert.equal(result[0], "Lunch is at 12.15 today.");
        });
    })
    suite('British to American', () => {
        test("Translate We watched the footie match for a while.", () => {
            const result = translator.toAmericanEnglish("We watched the footie match for a while.");
            assert.equal(result[0], "We watched the soccer match for a while.");
        });

        test("Translate Paracetamol takes up to an hour to work.", () => {
            const result = translator.toAmericanEnglish("Paracetamol takes up to an hour to work.");
            assert.equal(result[0], "Tylenol takes up to an hour to work.");
        });

        test("Translate First, caramelise the onions.", () => {
            const result = translator.toAmericanEnglish("First, caramelise the onions.");
            assert.equal(result[0], "First, caramelize the onions.");
        });

        test("Translate I spent the bank holiday at the funfair.", () => {
            const result = translator.toAmericanEnglish("I spent the bank holiday at the funfair.");
            assert.equal(result[0], "I spent the public holiday at the carnival.");
        });

        test("Translate I had a bicky then went to the chippy.", () => {
            const result = translator.toAmericanEnglish("I had a bicky then went to the chippy.");
            assert.equal(result[0], "I had a cookie then went to the fish-and-chip shop.");
        });

        test("Translate I've just got bits and bobs in my bum bag.", () => {
            const result = translator.toAmericanEnglish("I've just got bits and bobs in my bum bag.");
            assert.equal(result[0], "I've just got odds and ends in my fanny pack.");
        });

        test("Translate The car boot sale at Boxted Airfield was called off.", () => {
            const result = translator.toAmericanEnglish("The car boot sale at Boxted Airfield was called off.");
            assert.equal(result[0], "The swap meet at Boxted Airfield was called off.");
        });

        test("Translate Have you met Mrs Kalyani?", () => {
            const result = translator.toAmericanEnglish("Have you met Mrs Kalyani?");
            assert.equal(result[0], "Have you met Mrs. Kalyani?");
        });

        test("Translate Prof Joyner of King's College, London.", () => {
            const result = translator.toAmericanEnglish("Prof Joyner of King's College, London.");
            assert.equal(result[0], "Prof. Joyner of King's College, London.");
        });

        test("Translate Tea time is usually around 4 or 4.30.", () => {
            const result = translator.toAmericanEnglish("Tea time is usually around 4 or 4.30.");
            assert.equal(result[0], "Tea time is usually around 4 or 4:30.");
        });
    })
    suite('Highlight', () => {
        test('Highlight Mangoes are my favorite fruit.', () => {
            const result = translator.toBritishEnglish("Mangoes are my favorite fruit.");
            assert.include(result[1], '<span class="highlight">favourite</span>');
        })
        test('Highlight I ate yogurt for breakfast..', () => {
            const result = translator.toBritishEnglish("I ate yogurt for breakfast.");
            assert.include(result[1], '<span class="highlight">yoghurt</span>');
        })
        test('Highlight We watched the footie match for a while.', () => {
            const result = translator.toAmericanEnglish("We watched the footie match for a while.");
            assert.include(result[1], '<span class="highlight">soccer</span>');
        })
        test('Highlight Paracetamol takes up to an hour to work.', () => {
            const result = translator.toAmericanEnglish("Paracetamol takes up to an hour to work.");
            assert.include(result[1], '<span class="highlight">Tylenol</span>');
        })

    })

});
