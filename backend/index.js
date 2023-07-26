import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



/* mongoose.connect("mongodb+srv://root:mongodb123@demoapi.mxpavw4.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => console.log('DB Connected'))

.catch(error => console.error(error)); */

mongoose.connect("mongodb://127.0.0.1:27017/test")

.then(() => console.log('DB Connected'))

.catch(error => console.error(error));



//user schema 
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

//routes routes
app.post("/Login",async (req,res)=>{
    const {email,password} =req.body;
    /* User.findone({email:email},(err,user)=>{
        if(user){
           if(password === user.password){
               res.send({message:"login sucess",user:user});
           }else{
               res.send({message:"wrong credentials"});
           }
        }else{
            res.send("not register");
        }
    }) */

    try{
        let result = await findUser({ email : req.body.formValues.email, password : req.body.formValues.password });

        if(JSON.stringify(result) === '[]')
       {
          res.send({ message : "Incorrect Username or Password !", firstName : null });
       }else{

        res.send({ message: "successfull", firstName : result[0].fname });

       }
    }
    catch(error){
        console.error(error);
    }
});

var findUser = async (searchKey) => {
    /* var abc = await User.findOne(searchKey);
    return abc; */
    let result = await User.find(searchKey).exec();
    return result;
}

const insertData = async (details,res) =>{
    
    const user = new User();
    user.fname = details.formValues.fname;
    user.lname = details.formValues.lname;
    user.email = details.formValues.email;
    user.password = details.formValues.password;
    const saveData = await user.save();
    res.send({message: "successfull"});
}

app.post("/Register",async (req,res)=>{
    
    try{
        let result = await findUser({email : req.body.formValues.email});

        if(JSON.stringify(result) === '[]')
       {
          insertData(req.body,res);
       }else{
        res.send({message:"Email already exists !"});
       }
    }
    catch(error){
        console.error(error);
    }
    
})



app.listen(9002,()=>{
    console.log("started");
});