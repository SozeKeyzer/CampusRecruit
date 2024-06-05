import multer from "multer";

export const multerFun = ()=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'resume-model/resume');
        },
        filename: function (req, file, cb) {
            cb(null,'resume.pdf');
        }
    });
    
    const upload = multer({
        storage: storage
    });
    
    return upload;
}