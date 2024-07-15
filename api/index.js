const express=require('express');
const jwt=require('jsonwebtoken');
const cors=require('cors');
const bodyParser=require('body-parser');
const fs=require('fs');
const multer=require('multer');
const localStorage=require('node-localstorage');
const { v4: uuidv4 } = require('uuid');
const app=express();
app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true,parameterLimit:50000}));

secretKey='893454';

const storage=multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'Images');
    },
    filename:(req,file,cb) =>{
        cb(null,file.originalname);
    }
})
const upload=multer({storage:storage});

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.userId = user.userId;
            next();
        })
    }
}

app.post('/api/register',async (req,res)=>{
    const User = req.body;
    let existingData = [];
    try {
        const dataFile = fs.readFileSync("Registerdb.json", "utf8");
        existingData = JSON.parse(dataFile);
    } catch (error) {
        console.error("Error reading data file:", error);
    }
    const user = existingData.find((user) => {
        if (user.Patient_Name == User.username) {
            return res.status(400).send({ message: 'User already exists' });
        }
    });
    const userId = uuidv4();
    User.userId = userId;
    existingData.push(User);
    fs.writeFileSync("Registerdb.json", JSON.stringify(existingData));
  
    const token = jwt.sign({ userId: User.userId }, secretKey, { expiresIn: '24h' });
    res.status(200).send({ userId: User.userId, accessToken: token });
});

app.post('/api/login',async(req,res)=>{
    const { username, password } = req.body;
    const dataFile = fs.readFileSync("Registerdb.json", "utf8");
    data = JSON.parse(dataFile);
    const user = data.find((user) => {
        if (user.Patient_Name == username && user.Password == password)
            return user;
    });
    if (user) {
        const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '24h' });
        res.status(200).send({ userId: user.userId, accessToken: token });
    }
    else {
        res.status(401).json({ message: "Invalid User Credentials" });
    }
})
app.post('/api/personaldetails', authenticateUser, upload.array('p_pic'),async (req,res)=>{
    const PatientDetails = req.body;
    const files = req.files;
    PatientDetails.p_pic = [];
    files.forEach((file) => { PatientDetails.p_pic.push(file.originalname) });
    let existingData = [];
    try {
        const dataFile = fs.readFileSync("db.json", "utf8");
        existingData = JSON.parse(dataFile);
    } catch (error) {
        console.error("Error reading data file:", error);
    }
    PatientDetails.userId = req.userId;
    existingData.push({ Patient_Details: PatientDetails });
    fs.writeFileSync("db.json", JSON.stringify(existingData));
    res.status(200).json({ message: "User data saved successfully!" });
})
app.post('/api/familydetails', authenticateUser, upload.any(), async (req, res) => {
    const familyDetails = req.body;
    let existingData = [];
    try {
        const dataFile = fs.readFileSync("db.json", "utf8");
        existingData = JSON.parse(dataFile);
    } catch (error) {
        console.error("Error reading data file:", error);
    }

    const patient = existingData.find((user, userIndex) => {
        if ('userId' in user.Patient_Details && user.Patient_Details.userId == req.userId) {
            return true;

        }
    });
    const index = existingData.indexOf(patient)
    existingData[index].FamilyDetails = familyDetails.FamilyDetails;
    existingData[index].FamilyDetails.forEach((member, memberIndex) => {
        existingData[index].FamilyDetails[memberIndex].f_pic = [];
    })
    req.files.forEach((image, imageIndex) => {
        const fieldname = image.fieldname;
        const [key, value] = fieldname.split("[");
        let tempIndex = parseInt(value.replaceAll("]", ""));
        existingData[index][key][tempIndex].f_pic.push(image.originalname);
    })
    fs.writeFileSync("db.json", JSON.stringify(existingData));

    res.status(200);
    res.json({ message: "Updated Family Details" })
}
)

app.post('/api/memorygames/guess',  authenticateUser, async (req,res)=>{

})

app.listen(3001);
