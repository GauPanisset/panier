const Express = require('express');
const router = Express.Router();

router.get('/accueil', (req, res, next) => {
    DB.query("SELECT article.texte AS texte, image.url AS image, article.titre AS titre FROM article INNER JOIN image ON image.id_article = article.id WHERE image.main = 1 AND article.accueil = 1", (err, data) => {
        if (err) {
            return next(err);
        } else {
            return res.json(data);
        }
    });
});

module.exports.router = router;
