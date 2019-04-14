
const express = require('express');
const User = require('../models/user');
const Course = require('../models/course');
const mid = require('../middleware');

const router = express.Router();

// GET /api/users 200
  // Returns the currently authenticated user
router.get('/', mid.requiresLogin, (req, res) => { // Passes request to middleware's requiresLogin function
  res.status(200).json(res.req.AuthorisedUser); // return the authorised user as json to the client
});


// POST /api/users 201
  // Creates a user, sets the Location header to "/", and returns no content
router.post('/', (req, res, next) => {
  User.findOne({ emailAddress: req.body.emailAddress }).exec((err, user) => {
    if (user) { // if there's an email match then error. No duplicates allowed.
    let myErrors = [];
    // Build new error object
      err = new Error();
      err.message = 'Email already exists in database';
      // if you're adding the message here then what's the point of having it in the schema too?
      err.status = 400; // this status gets through.
      myErrors.push(err.message); // DOES THIS ACTUALY DO ANYTHING?
      // pass contructed error object off.
      return res.status(400).json({ errors: myErrors });
      // next(err);

      // You've got to pass it off here
      // Here it will only be about the email field

    } else {
    User.create(req.body, (err, user) => {
      if (user) {// If a user has been created
        if (!user.emailAddress || !user.firstName || !user.lastName || !user.password) {

          // if any fields missing then reject...
          // ...this code block isn't working properly...it never activates.
          // Is it because Mongoose is automatically rejecting and thus sending to Else clause alpha below?
          // In which case this is entirely redundant?
          // Build out the error validation further below and fix this bit up later.
          // console.log('this doesnt work');
          // return next(err);

        }
        if (err) { // Any others errors pathway
          console.log("fired");
          return next(err);
        }
        return res.status(201).location('/').json();
    } else {
      // Else clause alpha
      // console.log("whatev");

      let myErrors = [];
      // console.log(err); // The info you need is on the err object...
      // ...thus you don't need to create a new error object.
      // error = new Error();
      // error.status = 400;
      // console.log(error);

      // This is dreadful code. It's not DRY nor agile.
        // It's working at least but you need to refine later.

      if (err.errors.firstName) {
        let errorObject = err.errors.firstName;
        // console.log(Object.values(errorObject));
        let titleArray = Object.values(errorObject); // convert object values to an array
        // console.log(titleArray[0]);
        myErrors.push(titleArray[0]);

      }
      if (err.errors.lastName) {
        let errorObject2 = err.errors.lastName;
        // console.log(Object.values(errorObject2));
        let descArray = Object.values(errorObject2);
        // console.log(descArray[0]);
        myErrors.push(descArray[0]);
      }
      if (err.errors.emailAddress) {
        let errorObject = err.errors.emailAddress;
        // console.log(Object.values(errorObject));
        let titleArray = Object.values(errorObject); // convert object values to an array
        // console.log(titleArray[0]);
        myErrors.push(titleArray[0]);

      }
      if (err.errors.password) {
        let errorObject2 = err.errors.password;
        // console.log(Object.values(errorObject2));
        let descArray = Object.values(errorObject2);
        // console.log(descArray[0]);
        myErrors.push(descArray[0]);
      }

      // console.log(myErrors);
      return res.status(400).json({ errors: myErrors }); // this way skips the global error handler so 'next' not required

      // return next(err);
    };
    });
  }
  }); // Don't put return next() to satisfy 'consistent-return' rule. It will break route.
});

// ///////////////////////////////
// Extra routes (i.e. Not in the Challenge requirmenets)
// ///////////////////////////////

// Delete User
router.delete('/:userId', (req, res, next) => {
  User.findByIdAndRemove(req.params.userId, (err) => {
    console.log(req.params);
    if (err) {
      err.status = 400;
      return next(err);
    }
  return res.status(202).json();
  });
});

// ///////////////////////////////
// Dummy Function
// ///////////////////////////////
// const chrisOK = function () {
//   return 1;
// };

function checkForShip (player, coordinates) {
	var shipPresent, ship;

	for (var i = 0; i < player.ships.length; i++) {
		ship = player.ships[i];

		shipPresent = ship.locations.filter(function (actualCoordinate) {
			return (actualCoordinate[0] === coordinates[0]) && (actualCoordinate[1] === coordinates[1]);
		})[0];

		if (shipPresent) {
			return ship;
		}
	}

	return false;
}

module.exports.checkForShip = checkForShip;
// module.exports.chrisOK = chrisOK;
module.exports = router;
