module.exports = {
  env: {
    node: true,
    browser: false,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "prefer-arrow-callback": "warn",
    "no-console": "warn",
  },
};
