module.exports = {
    extends: ["@react-native-community", "eslint:recommended", "prettier"],
    plugins: ["import"],
    rules: {
        "no-param-reassign": ["error", { props: true }],
        "no-debugger": "error",
        "no-redeclare": "error",

        "no-unused-vars": "error",
        "no-nested-ternary": "error",
        "no-extra-boolean-cast": 0,

        "import/no-unresolved": "error",
        "import/default": "error",
        "import/no-self-import": "error",
        "import/no-unused-modules": "error",
        "import/no-duplicates": "error",
        "import/first": "warn",

        "react-hooks/exhaustive-deps": "warn",
        "react-native/no-inline-styles": "off",
        "react/no-did-mount-set-state": "warn",
        "react/jsx-curly-brace-presence": "error",
        "prettier/prettier": "error",
    },
};
