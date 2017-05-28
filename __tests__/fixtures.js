const json2ts = require('../').json2ts;
const fs = require('fs');
const data = (name) => fs.readFileSync(name, 'utf8');

it('matches gmaps', function () {
    const gmaps = data('__tests__/gmaps/in.json');
    expect(json2ts(gmaps)).toMatchSnapshot();
});

it('matches magento', function () {
    const gmaps = data('__tests__/magento/product.json');
    expect(json2ts(gmaps)).toMatchSnapshot();
});

it('matches magento categories', function () {
    const magentoCategories = data('__tests__/magento/categories.json');
    expect(json2ts(magentoCategories)).toMatchSnapshot();
});

it('matches petition', function () {
    const gmaps = data('__tests__/petition/input.json');
    expect(json2ts(gmaps)).toMatchSnapshot();
});

it('matches swagger', function () {
    const gmaps = data('__tests__/swagger/schema.json');
    expect(json2ts(gmaps)).toMatchSnapshot();
});

