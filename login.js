var express = require("express");
var bodyParse = require("body-parser");
var mongoose = require("mongoose");

const app = express()

app.use(bodyParse.json())
app.use(express.static('public'))
app.use(bodyParse.urlencoded({
    extended: true
}))

//connect database in login form
mongoose.connect('mongodb://0.0.0.0:27017/Database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
var db = mongoose.connection;
//check connection
db.on('error', () => console.log("error in connecting Database"));
db.once('open', () => console.log("Connected to Database"));
//create checking page
app.get("/", (req, res) => {
    return res.redirect("index.html");
}).listen(3000);

app.post("/login", (request, response) => {
    // console.log("entered in post")
    try {
        // console.log("entered in try")
        // get the data from index.html
        const name = request.body.name;
        // console.log('USERNAME>>> ' + username)
        const password = request.body.password;
        //console.log('PASSWORD>>> ' + password)
        // lets check it
        const usermail = db.collection('users').findOne({ email: name }, (err, res) => {
            if (res === null) {
                response.send("Information not matched. please create account first");
            }
            else if (err) throw err;
            if (res.password === password) {
                console.log("login Successfully");
                return response.redirect("home.html")
            }
            else {
                console.log("password not matched");
                response.send("password not matched");
            }
        })
        // console.log("username " + JSON.stringify(usermail))
    } catch (error) {
        console.log("invalid  information");
    }
})