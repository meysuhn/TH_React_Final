
const express = require('express');
const User = require('../models/user');
const Course = require('../models/course');
const mid = require('../middleware');
var cors = require('cors')

const router = express.Router();



// GET /api/courses 200
  // Returns the Course "_id" and "title" properties
router.get('/', (req, res, next) => {
  Course.find({}, 'course_id title', (err, courses) => {
    // This one I need to come back to
    if (err) {
      err.status = 400; // 400 Bad Request response status code indicates that the server could not understand the request due to invalid syntax.
      return next(err);
    } // else (no longer needs to be stated)

    return res.status(200).json(courses);
  }).populate('user', ['firstName', 'lastName']); // Deep Population: Include matched user but return only the user properties stated in the array.
});



// GET /api/course/:courseId 200
  // Returns all Course properties and related documents for the provided course ID
  // populate returns related documents, not only the ids.
router.get('/:courseId', (req, res, next) => {

  Course.findById(req.params.courseId)
    .populate('user', ['firstName', 'lastName']) // Deep Population: Include matched user but return only the user properties stated in the array.
    .exec((err, course) => { // find course by id (using Express's params)

    if (err) {
      err.status = 400;
      return next(err);
    }

  return res.status(200).json(course);
  });
});


// POST /api/courses 201
  // Creates a course, sets the Location header, and returns no content
router.post('/', mid.requiresLogin, (req, res, next) => {
  req.body.user = res.locals.user._id; // add authorised user id to new course body
  Course.create(req.body, (error) => {
    if (error) {
      // error.status = 400; // will fire if Mongoose validation fails
      // If more than one validation error Mongoose will lump messages together in one string

      // the code below could be refined, but does the job for now...
      // ...it's going through each of the required error objects and pulling out the messages then pushing to a new array 'myErrors'
      // 'myErrors' is then added to the error object returned to the client (but not via global error handler)
      // Could be refind by using a loop over the object instead of two different code blocks (title & description)
      // Also further refined by checking for any validation objects, not just title and description, incase you add extra required fields in future.
      let myErrors = [];
      if (error.errors.title) {
        let errorObject = error.errors.title;
        // console.log(Object.values(errorObject));
        let titleArray = Object.values(errorObject); // convert object values to an array
        console.log(titleArray[0]);
        myErrors.push(titleArray[0]);

      }
      if (error.errors.description) {
        let errorObject2 = error.errors.description;
        console.log(Object.values(errorObject2));
        let descArray = Object.values(errorObject2);
        console.log(descArray[0]);
        myErrors.push(descArray[0]);
      }


      return res.status(400).json({ errors: myErrors }); // this way skips the global error handler so 'next' not required
      // attach myErrors array to the returned error object

      // return next(error); // if you don't use 'next' then the error won't get to the client.
      // return (err); // 'next' is sending to global I think? Is 'next' the problem?
      // I need to return an error response to the API here, not via Global Handler
    }
  return res.status(201).location('/').json(); // Returns no content
  });
});



// Updates (edits) a course and returns no content
// PUT /api/courses/:courseId 204
router.put('/:courseId', mid.requiresLogin, (req, res, next) => {
  runValidators: true, // Mongoose doesn't run validations on updates by default.
  Course.findByIdAndUpdate(req.params.courseId, req.body, (error) => {

    if (error) {
      let myErrors = [];
      if (error.errors.title) {
        let errorObject = error.errors.title;
        // console.log(Object.values(errorObject));
        let titleArray = Object.values(errorObject); // convert object values to an array
        console.log(titleArray[0]);
        myErrors.push(titleArray[0]);

      }
      if (error.errors.description) {
        let errorObject2 = error.errors.description;
        console.log(Object.values(errorObject2));
        let descArray = Object.values(errorObject2);
        console.log(descArray[0]);
        myErrors.push(descArray[0]);
      }

      return res.status(400).json({ errors: myErrors }); // this way skips the global error handler so 'next' not required
    }
    return res.status(204).json();
  });
});



// Delete Course
router.delete('/:courseId', (req, res, next) => {
  console.log(req.params.courseId); // this is the course id
  // console.log(req.AuthorisedUser);
  // how to the get the current logged in users id?
  Course.findByIdAndRemove(req.params.courseId, (err) => {
    if (err) {
      err.status = 400;
      return next(err);
    }
  return res.status(202).json();
  });
});


module.exports = router;
