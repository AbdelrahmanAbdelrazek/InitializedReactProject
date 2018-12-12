module.exports = {
  parser: "babel-eslint",
  extends: ["google", "eslint:recommended", "plugin:react/recommended"],
  plugins: ["require-jsdoc-except", "class-property", "react"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  globals: {
    window: true,
    esri: true,
    localStorage: true,
    document: true,
    navigator: true,
    console: true,
    setTimeout: true,
    Promise: true,
    require: true,
    module: true,
    __dirname: true
  },
  rules: {
    "no-console": ["error", { allow: ["warn", "error", "log"] }],
    strict: 0,
    "require-jsdoc": [
      "error",
      {
        require: {
          FunctionDeclaration: false,
          MethodDefinition: false,
          ClassDeclaration: false,
          ArrowFunctionExpression: false,
          FunctionExpression: false
        }
      }
    ],
    "max-len": [2, { code: 300, tabWidth: 4, ignoreUrls: true }],
    semi: [0, "never"],
    "react/prop-types": [0],
    "linebreak-style": [0, require("os").EOL === "\r\n" ? "windows" : "unix"],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  }
};
