'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const nodeSass = require('node-sass');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    sassOptions: {
      implementation: nodeSass,
    },
    postcssOptions: {
      compile: {
        enabled: false,
      },
      filter: {
        enabled: true,
        exclude: ['**/*.css.map'],
        plugins: [
          require('tailwindcss'),
          {
            module: require('autoprefixer'),
            options: {
              browsers: ['last 2 versions'],
            },
          },
        ],
      },
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  if (process.env.EMBROIDER) {
    const { Webpack } = require('@embroider/webpack');
    return require('@embroider/compat').compatBuild(app, Webpack, {
      // staticAddonTestSupportTrees: true,
      // staticAddonTrees: true,
      // staticHelpers: true,
      // staticComponents: true,
      // packagerOptions: {
      //    webpackConfig: { }
      // }
    });
  } else {
    return app.toTree();
  }
};
