import mongoose = require("mongoose");
import q 		= require("q");
let Schema		= mongoose.Schema;

let UserSchema  = new Schema({
	FirstName 	: String,
	LastName 	: String,
	Email 		: {type: String, unique : true, required : true},
	Password 	: String,
	CreatedOn 	: {type : Date, default : Date.now()}  ,
	FirebaseToken : String
});


let UserModel = mongoose.model("users", UserSchema);


function saveUser(userProps){
	let deferred = q.defer();
	let user 	 = new UserModel(userProps);
	
	user.save((err, data)=>{
		
		if(err){
			console.log("Error in saving User");
			console.log(err);
			deferred.reject("Error occurred while saving user");
		} else{
			console.log("User Saved Succesfully");
			deferred.resolve(data);
		}		
	});
	
	return deferred.promise; 
}

function findUser(query){
	let deferred = q.defer();
	UserModel
		.findOne(query, function(err, record){
			if(err){
				console.log("Error in finding User");
				console.log(err);
 	 			deferred.reject("Error in finding User"); 
			} else {
				deferred.resolve(record);
			}
		});
	return deferred.promise; 
}


export {saveUser, findUser};