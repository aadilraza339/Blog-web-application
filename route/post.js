var firebase = require("firebase-admin");
var serviceAccount = require("./service.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://blogerapi-78d06.firebaseio.com"
});
var db = firebase.database()
var ref = db.ref("blog")

module.exports = (blog, path) => {
    blog.post('/blog', (req, res) => {
        var name = req.body.username
        var comment = req.body.comment
        if (name != "" && comment != "") {
            var usersRef = ref.child("user");
            usersRef.push({
                username: name,
                blog: comment
            });
            res.redirect("/home/")
        }
        else {
            res.send('pleasefile')
        }

    })

    blog.get('/get_blog', (req, res, next) => {
        ref.once('value', (snapshot) => {
            res.send(snapshot.val()["user"]);
        })

    });


    blog.get('/home', (req, res, next) => {
        res.sendFile(path.join(__dirname + '/view/home.html'));
    })

    blog.get('/logout', (req, res, next) => {
        res.sendFile(path.join(__dirname + '/view/login.html'));
    })


    blog.get('/create', (req, res, next) => {
        res.sendFile(path.join(__dirname + '/view/post.html'));

    })
}








