let mongoose = require('mongoose');
let employeeSchema = mongoose.Schema({
    empid:{
        type:Number,
        required:true
    },
    empname:{
        type:String,
        required:true
    },
    empdep:{
        type:String,
        required:true
    },
    empsalary:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Employee",employeeSchema);
 