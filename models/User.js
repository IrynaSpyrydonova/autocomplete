const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user models and Schemas
const UserSchema = new Schema({
    firstname: {
        type: String,
        required:[true, 'Name field is required']
    },

    lastname: {
        type: String,
        required:[true, 'Last name field is required']
    },
    password:{
        type: String,
        required:[true, 'Password is required']
    },
    email:{
        type: String,
        required:[true, 'Email is required']
    },
    phone:{
        type: Number,
        required:false
    },
    loc: {
        type: {
            type: "String",
            required: true,
            enum: ['Point', 'LineString', 'Polygon'],
            default: 'Point'
        },
        coordinates: [Number]
    },
    lists:{
        type: [],
        required:false
    },
    admin: Boolean,
    date: {
        type: Date,
        default: Date.now()
    }

})
// UserSchema.index({ domain_data: '2dsphere' });
const User = mongoose.model('user', UserSchema);

module.exports = User;