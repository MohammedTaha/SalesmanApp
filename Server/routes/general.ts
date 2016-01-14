
import express = require("express");
import Firebase = require("firebase");
let ref = new Firebase("https://saylani101.firebaseio.com/users");
import {saveUser, findUser} from "../DBRepo/UserModel";


let router = express.Router();


router.post("/signup", (req:express.Request, res:express.Response)=>{

		ref.createUser({
			email    : req.body.data.Email,
  			password : req.body.data.Password
		}, function(err, success){
			if(err){
				res.send(err);
			} else {
				req.body.data.FirebaseToken = success.uid;
				saveUser(req.body.data)
					.then((userInstance)=>{
						res.send({status : true, user : userInstance});
					}, (err)=>{
						res.send({status: false, message : err});
					});
			}
		});
			

		
});


router.post("/login", (req:express.Request, res:express.Response)=>{
		console.log("On Login In");
		
		let user = req.body.data;
		findUser({Email : user.email})
			.then((userInstance)=>{
				if(!userInstance){
					res.send("No user found with supplied email");
					return;
				}
				
				
				if(userInstance.Password == user.password){
					res.send({message : "Logged In successfully", token : userInstance.FirebaseToken});
				} else {
					res.send("Wrong Password");
				}			
				
			}, (err)=>{
				res.send({status: false, message : err});
			});
});
	
router.get("/salesmen", (req, res)=>{
	console.log(req.user);
	var salesmenArr = [{name : "S 01", id : 1}, {name : "S 02", id : 2}, {name : "S 03", id : 3}];
	res.send({status : true, data : salesmenArr});
});



module.exports = router;


