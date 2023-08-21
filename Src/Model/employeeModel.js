const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = Schema(
    {
        employeeId: { type: String, unique: true },
        name: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = {
    employeeSchema,
    EmployeeModel: mongoose.model("Employee", employeeSchema)
}
