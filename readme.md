# babel-plugin-transform-jsx-hyperdom-binding [![npm version](https://img.shields.io/npm/v/babel-plugin-transform-jsx-hyperdom-binding.svg)](https://www.npmjs.com/package/babel-plugin-transform-jsx-hyperdom-binding) [![npm](https://img.shields.io/npm/dm/babel-plugin-transform-jsx-hyperdom-binding.svg)](https://www.npmjs.com/package/babel-plugin-transform-jsx-hyperdom-binding) [![Build Status](https://travis-ci.org/featurist/babel-plugin-transform-jsx-hyperdom-binding.svg?branch=master)](https://travis-ci.org/featurist/babel-plugin-transform-jsx-hyperdom-binding)

> Turns binding attributes into hyperdom bindings

## Example

In

```jsx
<input type="text" binding="item[n].method().name" />
```

Out

```js
hyperdom.jsx("input", { type: "text", binding: [item[n].method(), "name"] });
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-jsx-hyperdom-binding

# for babel 6
npm install --save-dev babel-plugin-transform-jsx-hyperdom-binding@1.5.0
```

## Usage

.babelrc

```json
{
  "plugins": [
    ["transform-react-jsx", {
      "pragma": "hyperdom.jsx"
    }],
    "babel-plugin-transform-jsx-hyperdom-binding"
  ]
}
```

## We're Hiring!
Featurist provides full stack, feature driven development teams. Want to join us? Check out [our career opportunities](https://www.featurist.co.uk/careers/).
