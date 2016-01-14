var mongoose = require("mongoose");
var q = require("q");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: { type: String, unique: true, required: true },
    Password: String,
    CreatedOn: { type: Date, default: Date.now() },
    FirebaseToken: String
});
var UserModel = mongoose.model("users", UserSchema);
function saveUser(userProps) {
    var deferred = q.defer();
    var user = new UserModel(userProps);
    user.save(function (err, data) {
        if (err) {
            console.log("Error in saving User");
            console.log(err);
            deferred.reject("Error occurred while saving user");
        }
        else {
            console.log("User Saved Succesfully");
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}
exports.saveUser = saveUser;
function findUser(query) {
    var deferred = q.defer();
    UserModel
        .findOne(query, function (err, record) {
        if (err) {
            console.log("Error in finding User");
            console.log(err);
            deferred.reject("Error in finding User");
        }
        else {
            deferred.resolve(record);
        }
    });
    return deferred.promise;
}
exports.findUser = findUser;
