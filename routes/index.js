const express = require('express');
const router = express.Router();

const contactList =require('../controllers/contactList');
// /* GET home page. */
router.post('/contactList/create',contactList.create);
router.get('/contactList/get',contactList.get);
router.get('/contactList/getContactDetails',contactList.getContactDetails)
router.put('/contactList/update',contactList.update);
router.delete('/contactList/remove',contactList.remove)


module.exports = router;
