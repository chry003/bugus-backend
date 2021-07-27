var firebase = require('firebase');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var bodyParser = require('body-parser');

var firebaseConfig = {
	apiKey: "",
	authDomain: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: "",
	measurementId: ""
};

firebase.initializeApp(firebaseConfig);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
	firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
	  .then((userCredential) => {
	    // Signed in 
	    var user = userCredential.user;
	    res.status(200).send(user);
	    // ...
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;

	    res.status(400).send(
	    	{
	    		"code": errorCode,
	    		"message": errorMessage
	    	}
	    )
	    // ..
	  });
});


app.post('/api/signup', (req, res) => {
	firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
	  .then((userCredential) => {
	    // Signed in
	    var user = userCredential.user;
	    res.status(200).send(user);
	    // ...
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;

	    res.status(400).send(
	    	{
	    		"code": errorCode,
	    		"message": errorMessage
	    	}
	    )
	  });
})

io.on('connection', (socket) => {
	// handle user method here
});


http.listen(3000, function() {
   console.log('listening on *:3000');
});
