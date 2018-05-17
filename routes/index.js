const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Feedback'
    });
});

router.post('/sendFeedback', (req, res, next) => {

    let body = '';

    req
        .on('readable', () => {
            let test = req.read();

            if (test !== null) {
                body += test;

                if (body.length > 1e4) {
                    req.destroy();
                    res.statusCode = 413;
                    res.end('413 too big request');
                }
            }
        })
        .on('end', () => {
            try {
                body = JSON.parse(body);
            } catch (e) {
                res.statusCode = 400;
                res.end('400 bad request');
            }

            try {
                require('../send')(body, res);
            } catch (e) {
                console.error(e.message);
                res.statusCode = 500;
                res.end('server-side error');
            }
        })
});

module.exports = router;