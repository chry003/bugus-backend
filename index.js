var firebase = require('firebase');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var bodyParser = require('body-parser');

var firebaseConfig = {
	apiKey: "AIzaSyA2lJ0ZeRPklWR9DMucX01PN-9PHb1_CtU",
	authDomain: "bugus-64626.firebaseapp.com",
	projectId: "bugus-64626",
	storageBucket: "bugus-64626.appspot.com",
	messagingSenderId: "1080745234898",
	appId: "1:1080745234898:web:42b3b87915130326ffb80b",
	measurementId: "G-E9CT48Q4HS"
};

firebase.initializeApp(firebaseConfig);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
	login(req.body.username, req.body.password);
})


io.on('connection', (socket) => {
	// handle user method here
});


http.listen(3000, function() {
   console.log('listening on *:3000');
});


const login = (email, password) => {
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			console.log(userCredential);
		})

		.catch((err) => {
			console.log(err);
		})
}