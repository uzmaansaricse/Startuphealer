
import Employee from "../models/Employee.js";
import User from "../models/User.js";

export const addEmployee = async (req,res) =>{
    try{
        const {firstName,lastName,location,contactNumber,email,role} = req.body;

        if(!firstName || !lastName || !location || !contactNumber || !email || !role){
           return res.status(403).json({
                success: false,
                message: "All Fields are required",
            });
        }

        const employee = await Employee.create({
            contactNumber,
            location,
            role
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            employeeDetails : employee._id,
        })

        res.status(200).json({
            success:true,
            message:"employee created successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message:error.message
        })
    }
}

export const editEmployee = async (req, res) => {
    try {
        const { id } = req.params; // Employee user ID
        const {
            firstName,
            lastName,
            location,
            contactNumber,
            role
        } = req.body;

        // Validate employee ID
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Employee ID is required"
            });
        }

        // Find the user
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        // Check if user is an employee
        if (user.position !== 'Employee') {
            return res.status(403).json({
                success: false,
                message: "User is not an employee"
            });
        }

        // Check if employee details exist
        if (!user.employeeDetails) {
            return res.status(404).json({
                success: false,
                message: "Employee details not found"
            });
        }

        // Update user basic info
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        await user.save();

        // Update employee details
        const employeeDetails = await Employee.findById(user.employeeDetails);
        
        if (!employeeDetails) {
            return res.status(404).json({
                success: false,
                message: "Employee details not found"
            });
        }

        if (location) employeeDetails.location = location;
        if (contactNumber) employeeDetails.contactNumber = contactNumber;
        if (role) employeeDetails.role = role;
        
        await employeeDetails.save();

        // Get updated employee with populated details
        const updatedEmployee = await User.findById(id)
            .select('-password')
            .populate('employeeDetails')
            .exec();

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            employee: updatedEmployee
        });

    } catch (error) {
        console.error("Edit employee error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params; // Employee user ID

        // Validate employee ID
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Employee ID is required"
            });
        }

        // Find the user
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        // Check if user is an employee
        if (user.position !== 'Employee') {
            return res.status(403).json({
                success: false,
                message: "User is not an employee"
            });
        }

        // Store employee details ID before deletion
        const employeeDetailsId = user.employeeDetails;

        // Delete user first
        await User.findByIdAndDelete(id);

        // Delete associated employee details if exists
        if (employeeDetailsId) {
            await Employee.findByIdAndDelete(employeeDetailsId);
        }

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });

    } catch (error) {
        console.error("Delete employee error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await User.find({ position: 'Employee' })
            .select('-password')
            .populate('employeeDetails')
            .exec();

        res.status(200).json({
            success: true,
            count: employees.length,
            employees
        });

    } catch (error) {
        console.error("Get employees error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await User.findById(id)
            .select('-password')
            .populate('employeeDetails')
            .exec();

        if (!employee || employee.position !== 'Employee') {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            employee
        });

    } catch (error) {
        console.error("Get employee error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

