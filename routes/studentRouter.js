const express = require("express")
const router = express.Router()
const {createStudent, getAllStudent, getStudent, updateStudent, deleteStudent} = require("../controllers/studentController")
const upload = require("../utils/multer")


router.post( '/createStudent', upload.fields( [ { name: "profile", maxCount: 1 } ] ), createStudent )

router.get("/allStudents", getAllStudent)

router.get("/student/:id", getStudent)

router.put( '/updateStudent/:id', upload.fields( [ { name: "profile", maxCount: 1 } ] ), updateStudent )

router.delete("/deleteStudent/:id", deleteStudent)

module.exports = router