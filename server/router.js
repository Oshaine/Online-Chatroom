const express = require('express');
const router = express.Router();

router.get('/', (request, response) =>{
    response.send('server is running');
});

module.exports = router;