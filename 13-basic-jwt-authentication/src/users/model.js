const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const { Schema, model } = mongoose;
const UserSchema = new Schema(
  {
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
    // TODO: Add activation field
  },
  {
    timestamps: true
  }
);

UserSchema.index({ text: 'username' });

UserSchema.pre('save', function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      this.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

const User = model('users', UserSchema);

module.exports = User;
