const express = require('express');
const bodyParser = require('body-parser');
const readability = require('node-readability');
const app = express();
const Article = require('./db').Article;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);
        res.send(articles);
    });
});

app.post('/articles', (req, res, next) => {
    const url = req.body.url;
    readability(url, (err, result) => {
        if (err || !result) res.status(500).send('Error downloading article');
        Article.create(
            {title: result.title, content: result.content},
            (err, article) => {
                if (err) return next(err);
                res.send('OK');
            }
        )
    });
});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.find(id, (err, article) => {
        if (err) return next(err);
        res.send(article);
    });
});

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.delete(id, err => {
        if (err) return next(err);
        res.send({message: 'Deleted'});
    });
});

app.listen(process.env.PORT || 3000);

module.exports = app;
