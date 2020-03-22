const multer = require("multer");
const path = require("path");
const Contacts = require("../model/contactsSchema");
let fileName;

const storage = multer.diskStorage({
  destination: "public/avatars",
  filename: function(req, file, cb) {
    fileName = "a" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  }
});

var upload = multer({ storage: storage }).single("file");

exports.home = (req, res) => {
  Contacts.find({ referanceId: req.userId }).then((data, err) => {
    if (err) {
      res.json({ status: "failed", message: err });
    } else {
      res.json({ status: "success", message: data });
    }
  });
};

exports.newPerson = (req, res) => {
  //console.log("req", JSON.stringify(req.body));
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      //console.log("req from backend", req.body);
      // A Multer error occurred when uploading.
      console.log(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(err);
    }
    const { name, email, phone, notes } = req.body;
    const contacts = new Contacts({
      referanceId: req.userId,
      avatar: fileName,
      name,
      email,
      phone,
      notes
    })
      .save()
      .then((result, err) => {
        if (err) {
          res.json({ status: "failed", message: err });
        } else {
          Contacts.find({ referanceId: req.userId }).then((data, err) => {
            if (err) {
              res.json({ status: "failed", message: err });
            } else {
              res.json({ status: "success", message: data });
            }
          });
        }
      });

    //console.log("controller", req.body);
  });

  //res.json({ status: "success", message: "Your request has been received" });
};

exports.deletePerson = (req, res) => {
  //  console.log('deletePerson function in BE', req.body.id);

  Contacts.findOneAndRemove({ _id: req.body.id }).then((result, err) => {
    if (err) {
      res.json({ status: "failed", message: err });
    } else {
      Contacts.find({ referanceId: req.userId }).then((data, err) => {
        if (err) {
          res.json({ status: "failed", message: err });
        } else {
          res.json({ status: "success", message: data });
        }
      });
    }
  });
};
exports.savePerson = (req, res) => {
  //console.log("FROM BE savePerson function", req.body);

  Contacts.findOneAndUpdate({ _id: req.body.id }, req.body.data).then((result, err) => {
    if (err) {
      res.json({ status: "failed", message: err });
    } else {
      Contacts.find({ referanceId: req.userId }).then((data, err) => {
        if (err) {
          res.json({ status: "failed", message: err });
        } else {
          res.json({ status: "success", message: data });
        }
      });
    }
  }); 
};
