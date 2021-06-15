var express = require('express');
var router = express.Router();
const userLib = require('../backend/lib/userlib');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',(req,res)=>{
   console.log(req.body);
   userLib.isUserValid(req.body,function(resultJson){
      console.log(resultJson);
      if(resultJson.success==true)
        req.session.user = {username: resultJson.username};
      res.send(resultJson);
   })
})

router.get('/logout',(req,res)=>{
    req.session=null;
})

router.post('/signup',(req,res)=>{
  console.log(req.body.username);
  userLib.isUserExisting(req.body,function(resultJson){
        console.log(resultJson.message);
        res.send(resultJson);
  })
  
})

module.exports = router;
