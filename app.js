var express = require('express');
var app = express();
var mysql = require('mysql');
var helpers = require('./helpers');
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'my_db'
});

//connexion a la base de donées
connection.connect();
console.log('Connexion etablie avec la base de donées.');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'twig');
app.get('/', function(req, res) {

    connection.query('SELECT * FROM post LIMIT 5', function(error, rows, fields) {
       if(error) throw error;
        connection.query('SELECT COUNT(*) AS count FROM post', function(error, result, fields) {
            if(error) throw error;
            global.pagination = helpers.pagination(1, result[0].count);
                res.render('index', {articles: rows, pagination: global.pagination});
        });
    });

});

app.get('/tags', function(req, res) {
    res.render('tags');
});


app.get('/:id', function(req, res) {

    var limit_t = 5 * (req.params.id - 1);

    var sql_r = 'SELECT * FROM post LIMIT ' + limit_t + ', 5';

    connection.query('SELECT COUNT(*) AS count FROM post', function(error, result, fields) {
        if(error) throw error;

        if(req.params.id > helpers.max_page(result[0].count)) {
            res.status(404)        // HTTP status 404: NotFound
            .send('Not found');
        }
        else {
            global.pagination = helpers.pagination(req.params.id, result[0].count);
            connection.query(sql_r, function(error, rows, fields) {
                if(error) throw error;
                res.render('index', {articles: rows, pagination: global.pagination});
            });
        }
    });
});

app.get('/post/:id', function(req, res) {

    connection.query('SELECT * FROM post WHERE id=' + connection.escape(req.params.id),
    function(error, rows, fields) {
        if(error) throw error;

        if(rows == "") //Le post selectioné est vide ou n'existe pas donc on doit afficher une erreur 404
        {
            console.log("ici");
        }
        else
        {
            connection.query('SELECT * FROM post ORDER BY RAND() LIMIT 2',
            function(error, result, fields) {
                if(result[0].id != req.params.id)
                {
                    global.rand_title = result[0].title;
                    global.rand_id = result[0].id;
                }
                else
                {
                    global.rand_title = result[1].title;
                    global.rand_id = result[1].id;
                }
                return rend();
            });

            var rend = function() {
                res.render('post', {
                    title: rows[0].title,
                    content: rows[0].content,
                    date: helpers.formatDate(rows[0].date),
                    read_t: rows[0].read_t,
                    image: rows[0].image,
                    source: rows[0].source,
                    source_url: rows[0].source_url,
                    tags: rows[0].tags.split(','),
                    f_post_title: global.rand_title,
                    f_post_id: global.rand_id
                });
            };
        }
    });
});

app.listen(8080); //port d'ecoute du serveur
console.log('Serveur en ecoute sur le port 80');