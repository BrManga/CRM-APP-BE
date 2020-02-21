exports.home = (req, res) => {
  console.log("hello Bora");
  res.json({
    status: "success",
    message: `Hello Bilal! your id is ${req.userId}`
  });
};
