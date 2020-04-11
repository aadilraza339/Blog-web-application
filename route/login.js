var firebase = require('firebase');

var bodyParser = require("body-parser");
module.exports = (login, path, firebaseConfig) => {
    firebase.initializeApp(firebaseConfig);
    var auth = firebase.auth()
    firebase.auth.Auth.Persistence.LOCAL;
    login.use(bodyParser.urlencoded({ extended: true }));

    login.post('/signup', (req, res) => {
        var email = req.body.email
        var password = req.body.password

        var promise = auth.createUserWithEmailAndPassword(email, password)
        promise.then(() => {
            res.sendFile(path.join(__dirname + '/view/login.html'));
        })
        promise.catch((err) => {
            res.send(err.code)
        })

    })

    login.post('/login', (req, res) => {
        var email = req.body.username
        var password = req.body.password
        if (email != "" && password != "") {
            var result = firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    res.sendFile(path.join(__dirname + '/view/home.html'));
                })
            result.catch((err) => {
                res.send(err.code)
            })

        }


    })

    login.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/view/login.html'));
    })

    login.get('/singup', (req, res) => {
        res.sendFile(path.join(__dirname + '/view/signup.html'));
    })

}


