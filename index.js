var jsx = require('@babel/plugin-syntax-jsx').default
var babylon = require('babylon')

module.exports = function (babel) {
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
              if (expression.type === 'MemberExpression') {
                var property = !expression.computed && expression.property.type === 'Identifier'
                  ? babel.types.stringLiteral(expression.property.name)
                  : expression.property

                valuePath.replaceWith(babel.types.jSXExpressionContainer(babel.types.arrayExpression([expression.object, property])))
              }
            }
          }
        }
      },
    }
  };
};
