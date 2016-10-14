const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const isDeveloping = process.env.NODE_ENV !== 'production';
const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });

} else {
  //this serves the minified ugly compressed dist file and tells the browser is a gzip file to read it accordingly.
  app.get('*.min.js', function (req, res, next) {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  });
  app.use(express.static(__dirname + '/dist'));

  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

console.info('Server environment', process.env.NODE_ENV);

const port = isDeveloping ? 3000 : 80;
app.listen(port, function (error) {
  if (error) {
    console.error(error); // eslint-disable-line
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);// eslint-disable-line
  }
});
