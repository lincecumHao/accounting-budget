module.exports = {
    "presets": [
        "@babel/preset-env",
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ],
    "env": {
        "development": {
            "plugins": ["@babel/plugin-transform-modules-commonjs"]
        },
        "test": {
            "plugins": ["@babel/plugin-transform-modules-commonjs"]
        }
    }
};