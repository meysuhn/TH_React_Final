// PUT

// PUT method is called:


// If I clear course state after delete perhaps? Is it that it's not making a new call as it thinks nothing has changed?
// (1) first see what the API response is after an update
// Course detail GET gives 200
// Update course GET gives 304 (fine as client is just taking detail from state)
// Update course PUT gives 200 (the update has been successful)
// Courses Catalogue GET gives 200 (so it's making a fresh call)


// (2) then see what the API response is after an delete
// Course detail GET gives 200
// Courses Catalogue GET gives 304 (so it's not making a fresh call)
  // It's firing before DELETE? or is the response just returned from API before DELETE?
  // Either
// Course detail DELETE gives 202 (so it's successfully be deleted)

// (3) Click on any other course (or the deleted course itself) and...
// Course detail GET gives 200
// Courses Catalogue GET gives 200 (so it's making a fresh call, and finally the deleted course is gone)

// In the DELETE method `this.props.history.push('/courses/')`` isn't needed.
  // Without it the user still gets sent to the catalogue page!! (but Update's PUT does need it)
  // Why? How is that happening? Some auto feature of react or Mongoose?
  // I need to either (a) disable that or
  // (b) somehow force a state update in Catalogue (but I think I've been down that latter route)

  // if it's (a),

/*
The problem I've discovered is to do with a difference between what's happening automatically after a PUT request to what
is happening after a DELETE request.

Walking through a PUT request, the response statuses' from the API in terminal are as follows:
`Course detail GET: 200`
`Update course GET: 304` (fine as client is just taking detail from state)
`Update course PUT: 204` (the update has been successful)
`Courses Catalogue GET: 200` (so it's making a fresh call and disaplying the corrected courses.

When doing a DELETE request however, the responses are as follows:
`Course detail GET: 200`
`Courses Catalogue GET: 304` (so it's not making a fresh call)
`Course detail DELETE: 202`

The problem is that the course detail catalogue component is rendering before the DELETE process has been completed, the .then method is being skipped.

Furthermore, the `this.props.history.push('/courses/')` in the ``.then` block after the DELETE request isn't needed.
Comment this out and the user is still directed back to the list of courses after a DELETE, so something is happening automatically here that I can't see
(whereas the PUT method on the Update section does still need to be pushed to `/courses` else it'll just stick on the course detail page)

What's clear is that as axios is deleting a course, even though I've a `.then` promise React isn't waiting for the 202 response,
rather React is instead defaulting back to the main page and not having detected any state change (as the DELETE 202 response isn't back yet)
the API sees nothing has changed, returns 304 and React is just rendering the same state.






*/
