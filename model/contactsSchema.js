const mongoose = require("mongoose");
const contactsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  notes: { type: String },
  avatar: { type: String },
  referanceId: { type: String }
});

module.exports = mongoose.model("contacts", contactsSchema);
