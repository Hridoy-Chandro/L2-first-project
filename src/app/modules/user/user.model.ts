import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcryptjs';


const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress'
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);





// pre save middleware / hook : will work on create () and save ()
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data');
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});


// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});





export const User = model<TUser>('User', userSchema);





