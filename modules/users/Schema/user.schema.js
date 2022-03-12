const mongoose = require("mongoose");
const bcrypt= require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {type: String},
    email: { type: String, required: true },
    password: { type: String },
    level: { type: Number },
    Department: {type: String},
    
    //for defin user or admin
    role :{type: String },

    //for active user
    verified :{type:Boolean,defult:false }
  },
  {
    timestamps: true,
  }
);

//hooks to hash password
userSchema.pre('save',async function(next){
  this.password= await bcrypt.hash( this.password,7);
next();
})
module.exports = userSchema;
