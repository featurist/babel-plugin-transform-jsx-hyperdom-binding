var jsx = require('babel-plugin-syntax-jsx')
var babylon = require('babylon')

module.exports = function (babel) {
  return {
    inherits: jsx,

    visitor: {
      JSXAttribute: function (path) {
        var namePath = path.get('name')
        var valuePath = path.get('value')
        if (valuePath.node && valuePath.node.type == 'StringLiteral' && namePath.node.type == 'JSXIdentifier' && namePath.node.name == 'binding') {
          var match = /^(.*)\.([a-z_][a-z0-9_]*$)/.exec(valuePath.node.value)
          if (match) {
            var parsed = babylon.parse(match[1])
            var expression = parsed.program.body[0].expression
            valuePath.replaceWith(babel.types.jSXExpressionContainer(babel.types.arrayExpression([expression, babel.types.stringLiteral(match[2])])))
          }
        }
      },
    }
  };
};
