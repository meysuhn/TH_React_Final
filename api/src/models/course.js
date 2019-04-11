const mongoose = require('mongoose');

// _id (ObjectId) is auto-generated and so doesn't need to be declared in the model schema.

const CourseSchema = new mongoose.Schema({
  user: { // _id from the users collection
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: 'A course title must be provided',
    trim: true,
    minlength: [1, 'Course title must not be blank.'],
    unique: 'Course title already exists. Please choose a unique title.', // ensures email address does not already appear in the database.
  },
  description: {
    type: String,
    required: 'Please provide a course description',
    trim: true,
    minlength: [1, 'Course description must not be blank.'],
  },
  estimatedTime: {
    type: String,
    trim: true,
  },
  materialsNeeded: {
    type: String,
    trim: true,
  },
});

// Validations on PUT methods don't work automatically. You've to add a flag or a pre hook as you've done below
// otherwise users can PUT courses with blank titles and descriptions
// https://stackoverflow.com/questions/15627967/why-mongoose-doesnt-validate-on-update
CourseSchema.pre('findOneAndUpdate', function (next) {
  this.options.runValidators = true // turn validations on for PUT method
  next();


});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
