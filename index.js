const express = require("express");
const mongoose   = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 8001;

const storage = multer.diskStorage({
       destination: function(req,file,cb){
       return cb(null, "./uploads");
    },
    filename: function(req,file,cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({storage});

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get("/",(req,res)=>{
    res.render("homepage");
})

// app.post("/upload", upload.single("profileImage"),(req,res)=>{
    app.post("/upload",upload.fields([{name:"profileImage"},{name:"coverImage"}]),(req,res)=>{;
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
})

app.listen(PORT,()=>
console.log(`server is working on ${PORT}`));