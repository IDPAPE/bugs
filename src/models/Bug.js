import { Schema } from "mongoose";



export const BugSchema = new Schema({

title: { type: String, required: true, minLength: 10, maxLength: 50 },
description: { type: String,  minLength: 10, maxLength: 500 },
priority: { type: Number,  min: 1, max: 5},
closed: { type: Boolean, required: true, default: false },
closedDate: { type: Date },
creatorId: { type: Schema.ObjectId, required: true, ref: 'Account'},



}, { timestamps: true, toJSON: { virtuals: true}})



BugSchema.virtual('creator' , {
  localField: 'creatorId',
  ref: 'Account',
  foreignField:'_id',
  justOne: true

})


