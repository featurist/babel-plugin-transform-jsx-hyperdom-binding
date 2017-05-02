var jsx = require('babel-plugin-syntax-jsx')
var babylon = require('babylon')

module.exports = function (babel) {
  function transform(path, expression) {
    if (expression.type === 'MemberExpression') {
      var property = !expression.computed && expression.property.type === 'Identifier'
        ? babel.types.stringLiteral(expression.property.name)
        : expression.property

      path.replaceWith(babel.types.jSXExpressionContainer(babel.types.arrayExpression([expression.object, property])))
    }
  }

  return {
    inherits: jsx,

    visitor: {
      JSXAttribute: function (path) {
        var namePath = path.get('name')
        var valuePath = path.get('value')

        if (valuePath.node && namePath.node.type == 'JSXIdentifier' && namePath.node.name == 'binding') {
          if (valuePath.node.type == 'StringLiteral') {
            var parsed = babylon.parse(valuePath.node.value)
            if (parsed.program.body.length === 1 && parsed.program.body[0].type === 'ExpressionStatement') {
              var expression = parsed.program.body[0].expression
              transform(valuePath, expression)
            }
          } else {
            transform(valuePath, valuePath.node.expression)
          }
        }
      },
    }
  };
};
