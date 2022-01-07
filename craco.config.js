const webpack = require('webpack');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        {
          add: [
            new webpack.DefinePlugin({
              process: {env: {}}
            })
          ]
        }
      ],
      
    },
  },
}