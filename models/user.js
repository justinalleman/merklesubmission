const mongoose = require('mongoose');

const statesArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
const countryArray = ["US"];

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 100,
        trim: true,
        required: [true, 'First Name Required']
        },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 100,
        trim: true,
        required: [true, 'Last Name Required']
        },
    Address1: {
        type: String,
        minlength: 2,
        maxlength: 100,
        trim: true,
        required: [true, 'Address Required']
        },
    Address2: {
        type: String,
        trim: true,
        default: "N/A",
        required: false
        },
    City: {
        type: String,
        trim: true,
        required: [true, 'City Required']
        },
    State: {
        type: String,
        minlength: 2,
        maxlength: 2,
        uppercase: true,
        trim: true,
        required: [true, 'State Required'],
        enum: statesArray
        },
    Zip: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
              return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(v);
            },
            message: props => `Your entry, ${props.value}, must be a 5 Digits or 9 Digit Zip Separated by -!`
            },
          required: [true, 'Zip Required']
        },
    Country: {
        type: String,
        minlength: 2,
        maxlength: 2,
        uppercase: true,
        trim: true,
        required: [true, 'Country Required'],
        enum: countryArray
        },
    Date: {
        type: Date,
        default: Date.now,
        },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;