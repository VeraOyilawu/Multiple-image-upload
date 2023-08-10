const studentModel = require("../models/studentsModel")
const Validator = require("fastest-validator")
const fs = require("fs")

const createStudent = async(req, res) => {
    try {
        const {name, age, gender, email} = req.body;

        const studentDetails= new studentModel( {
            name,
            age, 
            gender,
            email,
            profile: req.files["profile"][0].filename,
            
        })

        const validateSchema = {
            name:{
                type:"string",optional:false},
            age:{
                type:"number",optional:false,max:20,min:10},
           email:{
                type:"string",optional:false},
           gender:{
                    type:"string",optional:false},
            profile:{
                   type:"string",optional:false}
        }

        const V = new Validator()
        const validate = V.validate(studentModel,validateSchema)

        const savedStudent = await studentDetails.save()

        res.status(201).json({
            message: "student created sucessfully",
            data: savedStudent
        })
    } catch (error) {
        res.status(404).json({
            message: error.message,
            error: validate[0].message
        })
    }
} 

const getAllStudent = async(req, res) => {
    try {
        const students = await studentModel.find()
        if (students) {
            res.status(500).json({
                message: "students",
                totalStudents: students.length,
                data: students,
                
            })   
        } else {
            res.status( 200 ).json( {
                message: "no students found "
            }) 
        }
    } catch (error) {
        res.status( 500 ).json( {
            message: e.message
        }) 
    }
}


const getStudent = async ( req, res ) => {
    const studentId = req.params.id;
    const student = await studentModel.findById( studentId );
    try {
        if ( !student) {
            res.status( 404 ).json( {
                message: "No student found."
            })
        } else {
            res.status( 200 ).json( {
                data: student,
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}


const updateStudent = async ( req, res ) => {
    try {
        const studentId = req.params.id;
        const details = await studentModel.findById(studentId );

        const { name, age, gender, email } = req.body;
        const bodyData = {
            name: name || details.name,
            age: age || details.age,
            gender: gender || details.gender,
            email: email || details.email,
            profile: details.profile
        }

        if ( req.files && req.files[ "profile" ] ) {
            const oldProfile = `uploads/${ details.profile }`
            if ( fs.existsSync( oldProfile ) ) {
                fs.unlinkSync(oldProfile)
            }

            bodyData.profile = req.files.profile[ 0 ].filename;
        }

        const newProfile = await studentModel.findByIdAndUpdate( studentId, bodyData, { new: true } )

        res.status( 200 ).json( {
            message: "Updated successfully.",
            data: newProfile
        })
           
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}


const deleteStudent = async ( req, res ) => {
    try {
        const studentId = req.params.id;
        const details = await studentModel.findById(studentId );

        if ( req.files && req.files[ "profile" ] ) {
            const oldProfile = `uploads/${ details.profile }`
            if ( fs.existsSync( oldProfile ) ) {
                fs.unlinkSync(oldProfile)
            }
        }

        const deleteStudent = await studentModel.findByIdAndDelete( studentId)

        res.status( 200 ).json( {
            message: "deleted successfully.",
            data: deleteStudent
        })
           
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

module.exports = {
    createStudent,
    getAllStudent,
    getStudent,
    updateStudent,
    deleteStudent
    
}