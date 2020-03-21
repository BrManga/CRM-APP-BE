const router = require("express").Router();
const dashboard = require("../controller/dashboard");
const auth = require("../middleware/auth");
/* router.route('/dashboard')
.get( checkAuth, (req, res) => {
    console.log('hello Bora');
        res.json({message:`Hello Bilal! your id is ${req.userId}`});
}); */

//localhost:5000/api/dashboard/
router.get("/", auth.checkAuth, dashboard.home);

router.post("/newPerson", auth.checkAuth, dashboard.newPerson);
router.post("/deletePerson", auth.checkAuth, dashboard.deletePerson);
router.post("/savePerson", auth.checkAuth, dashboard.savePerson);
/* router.get('/edit', (req, res) => {
    console.log('hello Bora');
        res.json({message:`Hello Bilal! your id is ${req.userId}`});
}); */
router.post("/dropzone", (req, res) => {
  console.log("info here", req.body);
  res.send({ status: "done", data: req.body });
});

module.exports = router;
