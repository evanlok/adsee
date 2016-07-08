module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jasmine": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:jasmine/recommended"
  ],
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "off"
    ],
    "semi": [
      "error",
      "always"
    ]
  },
  "plugins": [
    "jasmine"
  ],
  "globals": {
    "$": true,
    "_": true,
    "angular": true,
    "Sortable": true,
    "Paloma": true,
    "jwplayer": true,
    "emojione": true
  }
};
