/* eslint-disable */
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withFonts = require("next-fonts");

require("dotenv").config();

module.exports = withFonts(
  withCSS(
    withSass({
      webpack(config, options) {
        config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 100000
            }
          }
        });
        return config;
      },
      env: {
        API_ENDPOINT: `${ process.env.APP_PROTOCOL }://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
      }
    })
  )
);
