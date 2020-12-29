import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
  registerDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(6, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
});
// eslint-disable-next-line max-len
userSchema.methods.comparePassword = (password, user) => bcrypt.compareSync(password, user.password);

// userSchema.methods.comparePassword = function (password) {
//   const user = this;
//   bcrypt.compareSync(password, user.password);
// };
const User = mongoose.model('User', userSchema);

export default User;
