import express from 'express';
import { deletecontact, getcontact, getcontactbyid, postcontact, putcontact } from '../controler/contactController.js';
import { ValidateToken } from '../middleware/Validatetokenhandler.js';
export const router=express.Router();

router.use(ValidateToken);
router.route("/").get(getcontact).post(postcontact);
router.route("/:id").get(getcontactbyid).put(putcontact).delete(deletecontact);




