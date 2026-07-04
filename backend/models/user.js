//admin
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"]
    }
}, { timestamps: true });

userSchema.pre("save", async function(next){
    const user = this;
    
    const salt = await bcrypt.genSalt(10);
    user.salt = salt;

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    // next(); //why???????????
});

userSchema.methods.genAuthToken = async function(){
    //token creation process: this token will be send to frontend with role, depending upon which particular dashboard will be displayed.
    try {
        return jwt.sign(
            { id: this._id, email: this.email, role: this.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
    } catch (error) {
        console.log(error);
    }
}

const USER = model("user", userSchema);

module.exports = USER;