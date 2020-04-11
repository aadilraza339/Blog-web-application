var express = require('express')
var app = express()
app.use(express.json())

const path = require('path')
var firebaseConfig = {
    apiKey: "AIzaSyBac2gBPQJDn35rGNUIJV0JLpVvSRz_gHs",
    authDomain: "blogerapi-78d06.firebaseapp.com",
    databaseURL: "https://blogerapi-78d06.firebaseio.com",
    projectId: "blogerapi-78d06",
    storageBucket: "blogerapi-78d06.appspot.com",
    messagingSenderId: "227826449024",
    appId: "1:227826449024:web:c6b552997c11b365b18465",
    measurementId: "G-1FF6P74VCM"
};


app.use('/', login = express.Router())
require('./route/login')(login, path, firebaseConfig)

app.use('/', blog = express.Router())
require('./route/post')(blog, path)

app.listen(9000, () => {
    console.log('running on 9000');

})