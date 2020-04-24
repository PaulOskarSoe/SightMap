const express = require('express');
const router = express.Router();

router.get('/markers', (req, res) => {
    res.send('MARKERS ROUTE');
});

module.exports=router;