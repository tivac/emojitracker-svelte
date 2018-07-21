"use strict";

const { processor, preprocess } = require("modular-css-svelte")({

});

module.exports = {
    input : "./src/index.js",

    output : {
        file   : "./dist/bundle.js",
        format : "iife",
        name   : "emojitracker",

        assetFileNames : "[name][extname]",
    },

    plugins : [
        require("rollup-plugin-node-resolve")({ browser : true }),
        require("rollup-plugin-commonjs")(),

        require("rollup-plugin-svelte")({
            preprocess,

            dev : true,
        }),

        require("modular-css-rollup")({
            processor,
        }),

        require("rollup-plugin-serve")({
            contentBase : [
                "./dist",
                "./static",
            ],
        }),
    ],
};
