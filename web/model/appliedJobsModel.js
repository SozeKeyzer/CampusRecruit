import {Schema,model} from "mongoose";

const appliedJobsSchema = new Schema({
    jobId:{
            type: Schema.Types.ObjectId,
            ref: 'job_posting',
    },
    studentId:{
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    skills:{
        type:String
    },
    education:{
        type:String
    },
    experience:{
        type:String
    },
    projects:{
        type:String
    },
    achievements:{
        type:String
    },
    interests:{
        type:String
    },
    appliedDate : {
        type:String
    }
});

export default model("applied_jobs", appliedJobsSchema);