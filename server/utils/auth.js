const jwt = require('jsonwebtoken')

// secret enables the server to verify whether it recognizes this token but the expiration and secret are optional
const secret = 'mysecretsshhhhh'
const expiration = '2h'

module.exports = {
    // signToken function  expects a user object and will add that users username email and _id properties to the token
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id }

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
    },

    authMiddleware: function({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
      
        // separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
          token = token
            .split(' ')
            .pop()
            .trim();
        }
      
        // if no token, return request object as is
        if (!token) {
          return req;
        }
      
        // try catch statement mutes the error so users without a token can still see all thoughts
        try {
          // decode and attach user data to request object
          // if jwt veryify doesn't match jwt sign, error will be thrown
          const { data } = jwt.verify(token, secret, { maxAge: expiration });
          req.user = data;
        } catch {
          console.log('Invalid token');
        }
      
        // return updated request object
        return req;
    }
}