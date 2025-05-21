
import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const internetaccessSchema = new Schema({
   firstname: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },

    username: {
    type: String,
  
  },
  daterequested: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  daterequired: {
    type: Date,
    required: true,
  },
  device: {
    type: String,
    default: "",  // usually set by ICT later
    trim: true,
  },
  ipaddress: {
    type: String,
    default: "",
    trim: true,
  },
  macaddress: {
    type: String,
    default: "",
    trim: true,
  },
  businessjustification: {
    type: String,
    trim: true,
  },

  itmanagerapproval: {
    type: String,
    enum: ["pending", "approved", "rejected", ""],
    default: "pending",
  },
  itexcapproval: {
    type: String,
    enum: ["pending", "approved", "rejected", ""],
    default: "pending",
  },
}, {
  timestamps: true,
  collection: 'internetaccess'
});


export default model('internetaccess', internetaccessSchema);

