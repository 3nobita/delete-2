const express = require("express");
const bcrypt = require("bcrypt");
const collection = require('./config');
const app = express();

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get("/home", (req, res) => {
    res.render('home')
})

app.get("/login", (req, res) => {
    res.render('login')
})

app.get('/', (req, res) => {
    res.render('signup')
})

// Register
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
    }

    // allready exits user 

    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send('user allready existing.!!')
    } else {
        const saltRounds = 10;
        const hashpassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashpassword // convert in hash
        const userdata = await collection.insertMany(data);
        res.redirect('/login')
        console.log(userdata)
    }
})

app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send('User not found')
        }
        const ispasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (ispasswordMatch) {
            res.render('home')
        } else {
            res.send('wrong password')
        }
    } catch {
        res.send('something wrong')
    }
})

const port = 5000
app.listen(port, () => {
    console.log(`Running Port ${port}`)
}) 