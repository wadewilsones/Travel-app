const updateUIcurrent = require ('../src/client/js/app.js');

describe('Get function', () => {
    
    test('Check that the function is not undefined', () => {
        expect(updateUIcurrent).toBeDefined();
    });
});
