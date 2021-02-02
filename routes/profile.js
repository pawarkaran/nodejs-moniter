const express = require('express');
const router = express.Router();

/* GET PROFILE HOME*/
router.get('/', async (req, res, next) => {
  res.send('GET /profile');
  console.log(req.body);
});


/* POST Proile */
router.post('/', async (req, res, next) => {
  res.send('POST /profile/');
  console.log(req.body);
});

/* PUT Proile - profile/:user_id */
router.put('/:user_id', async (req, res, next) => {
    res.send('PUT /profile/:user_id');
    console.log(req.body);
  });
  




module.exports = router;