var express = require('express');
var app = express();

/*handlebars模板引擎配置*/
var hbs = require('express-hbs');
app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + '/views/layouts/main.hbs',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

/*监听端口*/
app.set('port', process.env.PORT); // || 3000);

/*静态文件目录*/
app.use(express.static(__dirname + '/public'));

/*路由*/
app.get('/', function(req, res) {
    res.render('home');
});
app.get('/about', function(req, res) {
    var fortunes = [
        "Conquer your fears or they will conquer you.",
        "Rivers need springs.",
        "Do not fear what you don't know.",
        "You will have a pleasant surprise.",
        "Whenever possible, keep it simple.",
    ];
    var randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {
        fortune: randomFortune
    });
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});