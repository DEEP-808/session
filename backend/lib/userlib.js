const userModel  = require('../models/usermodel');
const mongoose =require('mongoose');
module.exports.isUserValid = function(userJson, cb){
    // Select * from users where username="" and password=""
    // if req.body = {username:'username'}
    //var query = {username: userJson.username, password:userJson.password, isDeleted:false};

    var query = {username: userJson.username, password:userJson.password, isDeleted:{$ne : true}};

    userModel.find(query, function(err, collections){
        var response = {success: false, message: 'Login Failed', user: null };
        if(err){
            response.message = 'Server Side Error Occured, Try again after some time';
            return cb(response);
        }
        if(collections.length==0){
            response.message = 'Invalid username/password';
            return cb(response);
        }
        response.success = true;
        response.message = 'Login Successful';
        response.user = {username: collections[0].username,role:collections[0].role};
        cb(response);
    })
}

module.exports.isUserExisting = function(userJson,cb){
    var query={username:userJson.username};
    userModel.find(query,function(err,collections){
        console.log(collections.length);
        var response={success:false,message:'User not created'};
        if(err)
        {
            response.message='Server Side Error Occured, Try again after some time';
            return cd(response);
        }
        else if(collections.length==0)
        {
            response.success=true;
            response.message="User created successfully!";
            userModel.create({username:userJson.username,role:'user',email:userJson.email,password:userJson.password})
            return cb(response);
        }
        else
        {
            response.message="User already exists! try different credentials";
            return cb(response);
        }
    })
}