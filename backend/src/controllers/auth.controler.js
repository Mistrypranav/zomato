const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function register (req, res) {

    const {fullName, email, password} = req.body;

    const existingUser = await userModel.findOne({email});
    
    if(existingUser){
        return res.status(400).json({message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        fullName,
        password: hashedPassword,
        email
    })

    const token = jwt.sign({
        id: newUser._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email
        }
    });
}

async function loginUser (req, res) {

    const {email, password}  = req.body;
    const existingUser = await userModel.findOne({email});

    if(!existingUser){
        return res.status(400).json({message: "Invalid credentials"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid credentials"});
    }

    const token = jwt.sign({
        id: existingUser._id,

    },process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: existingUser._id,
            fullName: existingUser.fullName,
            email: existingUser.email

        }
    })
}

function logoutUser (req, res) {
    res.clearCookie("token");
    res.status(200).json({message: "User logged out successfully"});
}


// Food Partner Controllers

async function registerFoodPartner(req, res) {

    const { name, email, password, phone, address, contactName } = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })

    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "Food partner account already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        contactName
    })

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "Food partner registered successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            address: foodPartner.address,
            contactName: foodPartner.contactName,
            phone: foodPartner.phone
        }
    })

}

async function loginFoodPartner(req, res) {

    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if (!foodPartner) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "Food partner logged in successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    });
}


module.exports = {
    register,
    loginUser,
    logoutUser, 
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner 
}