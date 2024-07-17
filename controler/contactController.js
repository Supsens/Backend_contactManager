import asyncHandler from "express-async-handler";
import { Contact } from "../models/contatctModel.js";
export const getcontact = asyncHandler(async (req, res) => {

    const contacts= await Contact.find({user_id:req.user.id});
    res.status(200).json({contacts});
})
export const getcontactbyid = asyncHandler(async (req, res) => {

    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json({ contact });
})
export const postcontact = asyncHandler(async (req, res) => {
    const body = req.body;
    const { name, email, phone } = body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All field are mandatory");
    }
    const contact=await Contact.create({
            name,
            email,
            phone,
            user_id:req.user.id,
    })
    res.status(201).json({ "msg": "created contact", "data":contact  });
})
export const putcontact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact)
        {
            res.status(404);
            throw new Error("contact not found");
        }

    if(contact.user_id.toString()!==req.user.id)
    {
        throw new Error("Unauthorized")
    }
    const updatedcontact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(200).json({updatedcontact});
})
export const deletecontact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact)
        {
            res.status(404);
            throw new Error("contact not found");
        }
        if(contact.user_id.toString()!==req.user.id)
            {
                throw new Error("Unauthorized")
            }
        await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ contact });
})