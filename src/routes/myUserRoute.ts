import express from 'express';
const router = express.Router();
import { createCurrentUser, getCurrentUserProfile, updateUserController } from "../controllers/user.controller.js"
import { jwtCheck, jwtParse } from '../middleware/auth.middleware.js';
import { validateMyUserRequest } from '../middleware/validation.js';

router.post("/", jwtCheck, createCurrentUser);
router.put("/update-user", jwtCheck, jwtParse, validateMyUserRequest, updateUserController);
router.get("/get-user", jwtCheck, jwtParse, getCurrentUserProfile);
export default router;