const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const collection = require('./mongodb');
const port = 3000;

const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine","ejs");
app.set("views", templatePath);

app.get('/',(req,res)=>{
    res.render('login');
});

app.get('/signup',(req,res)=>{
    res.render('signup');
});

app.get('/home',(req,res)=>{
    res.render('home');
})

app.post("/signup", async (req,res)=>{
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    await collection.insertMany([data]);

    res.render('home');
});


app.post("/login", async (req,res)=>{
    
    try {
        const checkData = await collection.findOne({name: req.body.name})

        if(checkData.password === req.body.password){
            res.render('home');
        }else{
            res.send("wrong password");
        }
    } catch{
        res.send("wrong details");
    }
})

app.listen(port,()=>{
    console.log(`app running on ${port}`);
})