# babel-plugin-transform-jsx-hyperdom-binding

> Turns binding attributes into hyperdom bindings

## Example

In

```jsx
<input type="text" binding={item[n].method().name}/>
```

Out

```js
hyperdom.jsx("input", { type: "text", binding: [item[n].method(), "name"] });
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-jsx-hyperdom-binding
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
