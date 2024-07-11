const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password:{
        type: String,
        required: true,
        minlenght: 8
    },
    name: {
        type: String,
        required: true
    },
    DNI: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{7,8}$/,
        maxlength: 11
    },
    phone: {
        type: Number,
        required: true
    },
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }],
    Adoption: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Adoption'
    }]

}, { collection: 'users' });


userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;

