import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { BugSchema } from "../models/bug.js";
import { NoteSchema } from "../models/Note.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Bugs = mongoose.model('Bug', BugSchema)

  Notes = mongoose.model('Note', NoteSchema)

  TrackedBugs = mongoose.model('TrackedBug', BugSchema)
}

export const dbContext = new DbContext()
