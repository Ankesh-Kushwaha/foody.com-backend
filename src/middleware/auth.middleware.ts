import type { NextFunction,Response,Request } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import jwt from 'jsonwebtoken'
import User from '../models/user.js';

declare global{
  namespace Express{
    interface Request{
      userId: string
      auth0Id: string
     }
  }
}

const audience = process.env.Auth0_AUDIENCE;
const issuerBaseURL = process.env.Auth0_issuerBaseURL;
const tokenSigningAlg = process.env.Auth0_tokenSigningAlg;

if (!audience || !issuerBaseURL || !tokenSigningAlg) {
  throw new Error('Missing Auth0 environment variables');
}

export const jwtCheck = auth({
  audience,
  issuerBaseURL,
  tokenSigningAlg
});

export const jwtParse = async (req:Request,res:Response,next:NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) return res.status(401);
  const token = authorization.split(" ")[1]; //get the token from the autorization headers

  try {
    const decoded = jwt.decode(token as string) as jwt.JwtPayload;
    const auth0Id = decoded.sub;
    const user = await User.findOne({auth0Id});
    if (!user) return res.status(401);

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  }
  catch (err) {
    throw new Error("authorization error: " + (err instanceof Error ? err.message : String(err)));
    res.status(401);
  }
}



