import {Schema,model} from "mongoose";

const studentSchema = new Schema(
    {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      studentId:{
        type:Number
      },
      email: {
        type: String,
        unique: true,
      },
      contact: {
        type: String,
        unique: true,
      },
      course:{
        type:String,
      },
      branch:{
        type:String,
      },
      currentYear:{
        type:Number
      },
      currentSem:{
        type:Number
      },
      verified:{
        type:Boolean,
        default:false
      },
      password:{
        type:String,
        default:null
      }
    },
    {
      timestamps: true,
    }
  );
  
  export default model("student", studentSchema);