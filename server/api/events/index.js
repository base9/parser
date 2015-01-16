var controller = require('./events.controller');
var router = require('express').Router();


router.get('/spoof', controller.addManySpoofs);

//these two endpoints (kimono and eventbrite) are for dev testing purposes only.
//TODO: they should be secured or removed at some point.
router.get('/kimono', controller.fetchBatchDataFromKimonoAPI);
router.get('/eventbrite', controller.fetchBatchDataFromEventbriteAPI);

router.post('/', controller.addOne);

module.exports = router;
