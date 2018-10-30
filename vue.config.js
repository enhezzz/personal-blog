// vue.config.js
module.exports = {
    devServer: {
        port: 8080,
        proxy: {
            '/*': {
                target: 'http://localhost:80',
                bypass: function(req) {
                    if (req.headers.accept.indexOf("html") !== -1) {
                      console.log("Skipping proxy for browser request.");
                      return "/index.html";
                    }
                  }
            }
        }
    }
  }