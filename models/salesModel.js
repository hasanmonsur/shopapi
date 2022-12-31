const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const salesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Must enter a Name"],

        },
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            trim: true,
            // validate(value) {
            //     const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
            //     if (!passRegex.test(value)) {
            //         throw new Error("Password must contain big and small characters so as numbers");
            //     }
            // },
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        courses: [
            {
                course: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Course"
                }
            }
        ]
    },
    {
        timestamps: true,
    }
);

salesSchema.pre("save", async function (next) {
    const products = this;
    
    next();
});

/*
productsSchema.statics.funcUserLogin = async (email, password) => {
    const user = await Auth.findOne({ email });

   // console.log('Data:', email);

    if (!user) {
        throw new Error("unable to login");
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
        throw new Error("unable to login");
    }

    

    return user;
};*/

salesSchema.methods.toJSON = function () {
    const sales = this;
    const salesObj = sales.toObject();

    return salesObj;
};

const Sales = mongoose.model("Sales", salesSchema);

module.exports = Sales;