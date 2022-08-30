import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const { AUTH0_DOMAIN, AUTH0_AUDIENCE } = process.env;

console.log('AUTH0_DOMAIN', AUTH0_DOMAIN);
console.log('AUTH0_AUDIENCE', AUTH0_AUDIENCE);

export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: AUTH0_AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

export const logToken = (req, res, next) => {
  console.log(`headers: ${req.headers}`);
  next();
};
