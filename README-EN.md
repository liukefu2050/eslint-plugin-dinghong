# eslint-plugin-dinghong

DINGHONG ESLint Rules

[简体中文](./README.md) | English

#### Supported Rules
- no-date-parse  Disallow formatting date strings with Date.parse
- no-new-date-single When new Date is prohibited, a single parameter is passed in
- no-todo-comment  The use of todo comments is prohibited and should be checked for features that need to be improved
- no-var  Disallow variable declaration with var

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-dinghong`:

```sh
npm install eslint-plugin-dinghong --save-dev
```

## Usage
#### Introduced by configuring extends
```json
{
    "extends": [
        "plugin:dinghong/recommended"
    ]
}
```
Configured in this way, all rules take effect. If you need to adjust a rule, you can override it in `rules` alone

#### Or, introduce by configuring plugins and rules
Add `dinghong` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "dinghong"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "dinghong/no-todo-comment": 2 // 0 = off, 1 = warn, 2 = error
    }
}
```
