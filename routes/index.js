var express = require('../../lib/express');

var app = module.exports = express();

app.map = function(a, route){
  route = route || '';
  for (var key in a) {
    switch (typeof a[key]) {
      // { '/path': { ... }}
      case 'object':
        app.map(a[key], route + key);
        break;
      // get: function(){ ... }
      case 'function':
        console.log('%s %s', key, route);
        app[key](route, a[key]);
        break;
    }
  }
};

var veggies = {
  uneaten: function(req, res){
    ;
  },

  get: function(req, res){
    res.send('user ' + req.params.uid);
  },

  delete: function(req, res){
    res.send('delete users');
  }
};

var pets = {
  list: function(req, res){
    res.send('user ' + req.params.uid + '\'s pets');
  },

  delete: function(req, res){
    res.send('delete ' + req.params.uid + '\'s pet ' + req.params.pid);
  }
};

app.map({
  '/': { get: res.render('index.js')}
});