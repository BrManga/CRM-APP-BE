const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const userSchema = require("./model/userSchema");
const connectDB = require("./config/db");
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let JWTSecretKey = "dsadsadsada";

//DB Connection
connectDB();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const signToken = id => {
  console.log("SigninToken ID", id);
  return jwt.sign({ id }, JWTSecretKey, { expiresIn: 36000 }); //10 saat
};

let checkAuth = (req, res) => {
  const userToken = req.header("x-auth-header");
  //console.log(userToken);
  if (!userToken) {
    return res
      .status(401)
      .json({ status: "failed", message: "Authorization problem 5012" });
  }
  try {
    jwt.verify(userToken, JWTSecretKey, (err, decodedResult) => {
      if (err) res.status(401).json({ status: "failed", message: err });
      else {
        console.log("Decoded Result:", decodedResult);

        req.userId = decodedResult.id;

        next();
      }
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error occured" });
  }
};
//Routings

app.get("/", (req, res, next) => res.json({ message: { name: "Bora" } }) );

app.post("/register", async (req, res) => {
  let { name, email, pass } = req.body;
  console.log(req.body);
  localStorage.setItem("bora", 5);
  //BCRYPT PART
  pass = await bcrypt.hash(pass, saltRounds);

  const newUser = new userSchema({
    name,
    email,
    pass
  });
  newUser.save(err => {
    if (err) {
      res.json({ status: "failed", message: err });
    } else {
      res.json({ status: "success", message: "Congrats succesfully saved" });
    }
  });
});
//INBOX
app.get("/inbox", checkAuth, (req, res) => {
  console.log("inbox", res);
});
//LOGIN
app.post("/login", (req, res, next) => {
  const { email, pass } = req.body;
  console.log(req.body);
  userSchema.findOne({ email }, (err, result) => {
    /* 
    result { _id: 5e319fb753e87247b8b0ebf5,
      name: 'ahmet',
      email: 'ahmet@alexis.com',
      pass:
       '$2b$10$yCpTtVnS0IIlS/6o1X85suUq.lq/cNeM5RAqlTMHPBGEk/0iqA1xu',
      __v: 0 } */

    if (!email) {
      res.send({ status: "failed", message: err });
    } else if (!result) {
      res.send({ status: "failed", message: "wrong user or password" });
    } else {
      bcrypt.compare(pass, result.pass, async (err, resultFromB) => {
        if (err) {
          res.send({ status: "failed", message: "wrong user or password" });
        } else {
          console.log(resultFromB);
          if (resultFromB) {
            console.log("Response from DB: ", result);
            var id=result.id
            let token = await jwt.sign({ id }, JWTSecretKey, { expiresIn: 36000 });

            res.send({
              status: "success",
              message: "Succesfully Logged In",
              token: token
            });
          } else {
            res.send({ status: "failed", message: "wrong user or password" });
          }
        }
      });
    }
  });
});

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
