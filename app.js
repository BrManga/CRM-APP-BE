
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;


app.use(express.json());

app.get("/", (req, res, next) => res.json({ message: "Helllo" }));
app.post("/register", (req, res) => {
  const { firstName, lastName } = req.body;
  res.send(`First name is ${firstName}, last name is ${lastName}  `);
});


app.listen(port, () => console.log(`Server is listening on port: ${port}`));
