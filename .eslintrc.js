module.exports = {
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "func-names": "off",
    "no-restricted-syntax": "off",
    "prefer-arrow-callback": "off",
    "no-console": "off",
    "import/no-dynamic-require": "off",
    "global-require": "off",
    "no-use-before-define": "off",
    "nonblock-statement-body-position": "off",
    "prefer-template": "off",
    curly: "off",
    quotes: "off",
    "consistent-return": "off",
    "no-await-in-loop": "off",
    "implicit-arrow-linebreak": "off",
    // "max-len": [2, 100, 4, { ignoreUrls: true, ignoreComments: true }],
  },
  overrides: [
    {
      files: ["modules/**/*.js", "src/commands/**/*.js", "src/events/**/*.js"],
    },
  ],
};
