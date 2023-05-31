const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  thumb: {
    type: String,
    required: true,
  },
  author_thumb: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
},{
  collection:"services"
});


const mydb = mongoose.connection.useDb('workdeal');
const service = mydb.model("service", ServiceSchema);

module.exports = service;
