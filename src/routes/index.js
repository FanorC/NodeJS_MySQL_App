const express= require('express')
const router= express.Router();

router.get('/', async (req, res) => {
    res.render('index');
});


//router
module.exports=router;