var Firebase = require('firebase');
var prettyjson = require('prettyjson');

var isNewUser = true;
var ref = new Firebase("https://glowing-heat-963.firebaseio.com/");

ref.onAuth(function(authData) {
	if (authData && isNewUser) {
		ref.child('users').child(authData.uid).set({
			provider: authData.provider,
			name: getName(authData)
		});
	}
});

function getName(authData) {
	switch (authData.provider) {
		case 'password':
			return authData.password.email.replace(/@.*/, '');
		case 'twitter':
			return authData.twitter.displayName;
		case 'facebook':
			return authData.facebook.displayName;
	}
}

function createAuthUser(firebase, email, password){
	firebase.createUser({
		password: password,
		email: email,
	}, function(err, userData) {
		if(err) {
			console.log("Error creating user: ", err);
		} else {
			console.log("successfully created user: ", prettyjson.render(userData));
		}
	});;

}

ref.child('people').on('value', function(snapshot) {
	console.log(prettyjson.render(snapshot.val()));
});

//createAuthUser(ref, 'motdidr@gmail.com', 'password');
