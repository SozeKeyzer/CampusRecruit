import {Schema,model} from "mongoose";

const jobPostingSchema = new Schema({
    jobId:{
        type:String
    },
    jobTitle:{
        type:String
    },
    jobType:{
        type:String
    },
    jobLocation:{
        type:String
    },
    workplaceType:{
        type:String
    },
    company:{
        type:String
    },
    description:{
        type:String
    },
    requiredCgpa:{
        type:String
    },
    requiredSkill:{
        type:String
    },
    lastDate:{
        type:String
    },
    batch:{
        type:String
    },
    qualification:{
        type:String
    },
    year:{
        type:String
    },
    role:{
        type:String
    },
    salary:{
        type:String
    },
    companyWebsite:{
        type:String
    },
    imageUrl:{
        type:String
    },
});

export default model("job_posting", jobPostingSchema);