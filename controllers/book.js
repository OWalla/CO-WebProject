var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
    var name = req.params.name;
    var author = req.params.author;
    var afterYear = req.params.afterYear;
    res.json();
});

module.exports = router;