const Express = require('express');
const router = Express.Router();
const DB = require('../database/init.js');

router.get('/accueil/boutique', (req, res, next) => {
    DB.query("SELECT article.id AS id, article.texte AS texte, image.url AS image, article.titre AS titre FROM article INNER JOIN image ON image.id_article = article.id WHERE image.main = 1 AND article.accueil = 1 AND article.type = 'boutique'", (err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

router.get('/accueil/reportage', (req, res, next) => {
    DB.query("SELECT article.id AS id, article.texte AS texte, image.url AS image, article.titre AS titre FROM article INNER JOIN image ON image.id_article = article.id WHERE image.main = 1 AND article.accueil = 1 AND article.type = 'reportage'", (err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

router.get('/accueil/news', (req, res, next) => {
    DB.query("SELECT article.id AS id, article.texte AS texte, image.url AS image, article.titre AS titre FROM article INNER JOIN image ON image.id_article = article.id WHERE image.main = 1 AND article.accueil = 1 AND article.type = 'news'", (err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

router.get('/accueil/dossier', (req, res, next) => {
    DB.query("SELECT article.id AS id, article.texte AS texte, image.url AS image, article.titre AS titre FROM article INNER JOIN image ON image.id_article = article.id WHERE image.main = 1 AND article.accueil = 1 AND article.type = 'dossier'", (err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

router.get('/accueil/maison', (req, res, next) => {
    DB.query("SELECT article.id AS id, article.texte AS texte, image.url AS image, article.titre AS titre FROM article INNER JOIN image ON image.id_article = article.id WHERE image.main = 1 AND article.accueil = 1 AND article.type = 'maison'", (err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

router.get('/:id', (req, res, next) => {
    DB.query("SELECT titre, auteur, date, lien, texte FROM article WHERE id = ?", [req.params.id], (err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

router.get('/image/:id', (req, res, next) => {
    DB.query("SELECT url FROM image WHERE id_article = ?", [req.params.id], (err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

module.exports.router = router;
