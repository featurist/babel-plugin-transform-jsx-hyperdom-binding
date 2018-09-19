var expect = require('chai').expect
var babel = require('@babel/core');
var syntaxJsx = require('@babel/plugin-syntax-jsx');
var transformReactJsx = require('@babel/plugin-transform-react-jsx');
var bindingTransform = require('..');

function trimIndentation(line) {
  return line.replace(/^ */g, '')
}

function toSingleLine(text) {
  return text.split('\n').map(trimIndentation).join(' ')
}

describe('hyperdom binding JSX transform', function () {
  function compile(source) {
    return babel.transform(source, {
      plugins: [
        syntaxJsx,
        [transformReactJsx, {pragma: 'hyperdom.jsx'}],
        bindingTransform
      ]
    }).code
  }

  function expectCompilation(input, expectedOutput) {
    expect(toSingleLine(compile(input))).to.equal(expectedOutput)
  }

  it('converts a simple property access into a binding', function () {
    expectCompilation(
      '<input binding="object.property"/>',
      'hyperdom.jsx("input", { binding: [object, "property"] });'
    )
  })

  it('multiple property accesses result in only the last being the binding property', function () {
    expectCompilation(
      '<input binding="a.b.c.d.property"/>',
      'hyperdom.jsx("input", { binding: [a.b.c.d, "property"] });'
    )
  })

  it('preperty can have numbers and capitals', function () {
    expectCompilation(
      '<input binding="object.bigPropertyName123"/>',
      'hyperdom.jsx("input", { binding: [object, "bigPropertyName123"] });'
    )
  })

  it('property can be an array index with variable', function () {
    expectCompilation(
      '<input binding="object[propertyName]"/>',
      'hyperdom.jsx("input", { binding: [object, propertyName] });'
    )
  })

  it('property can be an array index with number', function () {
    expectCompilation(
      '<input binding="object[1]"/>',
      'hyperdom.jsx("input", { binding: [object, 1] });'
    )
  })

  describe('ignoring non-properties', function () {
    it("doesn't transform if the property is a method", function () {
      expectCompilation(
        '<input binding="object.method()"/>',
        'hyperdom.jsx("input", { binding: "object.method()" });'
      )
    })

    it("doesn't transform if there is no property", function () {
      expectCompilation(
        '<input binding="object"/>',
        'hyperdom.jsx("input", { binding: "object" });'
      )
    })
  })
})
