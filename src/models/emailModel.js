import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
});

const Email = mongoose.model('Email', emailSchema);

export default Email;
