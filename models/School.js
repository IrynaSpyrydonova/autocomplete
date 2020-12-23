const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
    type:{
        type:String,
        default:"Point"
    },
    coordinates: {
        type: [Number],
        // index: '2dsphere'
    }
})



// Create user models and Schemas
const SchoolSchema = new Schema({
    name: {
        type: String,
        required:[true, 'Name field is required']
    },

    geometry: GeoSchema,

    phone: {
        type: String,
        required:[true, 'Phone number field is required']
    },

    email:{
        type: String,
        required:[true, 'Email is required']
    },

    rating: {
        type: Number,
        required:false
    },

    // Public, Private
    types:{
        type: String,
        required:[true, 'Types is required']
    },

    // General, Technical, Vocational , Art Secondary Education
    areas:{
        type: String,
        required:[true, 'Areas is required']
    },

    // Community education, Official subsidized education, Free subsidized education, Private schools
    network:{
        type: String,
        required:[true, 'Network is required']
    },

    languages: {
        type: String,
        required:[true, 'Languages is required']
    },
    comments:{
        type: [String],
        required:false
    },

    admin: Boolean,

    date: {
        type: Date,
        default: Date.now()
    }

})


// const schoolsSchema = new mongoose.Schema({})
GeoSchema.index({coordinates: '2dsphere'});

const School = mongoose.model('School',SchoolSchema, 'schools');

module.exports = School;