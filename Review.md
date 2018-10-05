# Review Questions

## What is Node.js?
   It is a server-side JavaScript platform that helps buidling scalable network application quickly.

## What is Express?
   Express is a light and unopinionated web application framework that sits on top of Node.js.
   It provides routing and middleware support and makes creating an API simple.

## Mention two parts of Express that you learned about this week.
   Routing and middleware.

## What is Middleware?
   Functions that intercept a request and response. Middleware can change, return, or pass the intercepted request/response to the next middleware.

## What is a Resource?
   Data from the API

## What can the API return to help clients know if a request was successful?
   It can return a status code, and/or a json object.

## How can we partition our application into sub-applications?
   Routing.

## What is express.json() and why do we need it?
   It is a middleware for express. it formats req.body's shape. We use it to validate user-controlled input and keep things consistent.
