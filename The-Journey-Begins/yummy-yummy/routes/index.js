const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  res.json(req.query);
});

router.get('/reverse/:name', (req, res) => {
  res.send(req.params);
});

module.exports = router;
