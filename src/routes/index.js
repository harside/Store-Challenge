const express = require('express');

const router = express.Router();

const StoresRouter = require('./stores.routes');

router.use('/stores', StoresRouter);

module.exports = router;
