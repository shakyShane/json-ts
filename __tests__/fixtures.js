const {json2ts} = require('../');
const {readFileSync} = require('fs');
const data = (name) => readFileSync(name, 'utf8');

it('matches gmaps', function () {
    const gmaps = data('__tests__/gmaps/in.json');
    expect(json2ts(gmaps)).toMatchSnapshot();
});

it('matches magento', function () {
    const gmaps = data('__tests__/magento/product.json');
    expect(json2ts(gmaps)).toMatchSnapshot();
});

it('matches petition', function () {
    const gmaps = data('__tests__/petition/input.json');
    expect(json2ts(gmaps)).toMatchSnapshot();
});