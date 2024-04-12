import { Db } from "mongodb"
import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class BugsService {

  async createBug(bugData){
    const bug = (await dbContext.Bugs.create(bugData)).populate('creator')
    return bug
  }
  
  async getBugs() {
    const bugs = await dbContext.Bugs.find().populate('creator')
    return bugs
  }
  
  async getBugsById(bugId) {
    const bugs = await dbContext.Bugs.findById(bugId).populate('creator')
    if(!bugs) throw new Error(`There is no ${bugs}`)
    return bugs
  }
  
  async editBug(bugId, bugData, userId) {
    const bugToEdit = await dbContext.Bugs.findById(bugId)

    if(userId != bugToEdit.creatorId) throw new Forbidden (`Cannot edit, not yours ${bugToEdit}`)

    bugToEdit.title = bugData.title ?? bugToEdit.title
    bugToEdit.description = bugData.description ?? bugToEdit.description
    bugToEdit.priority = bugData.priority ?? bugToEdit.priority
    bugToEdit.closed = bugData.closed ?? bugToEdit.closed
    bugToEdit.closedDate = bugData.closedDate ?? bugToEdit.closedDate
    
    await bugToEdit.save()

    return bugToEdit

  }
  
  
  async squashedBug(bugId, userId) {
    const squashedBug = await dbContext.Bugs.findById(bugId)
    if( squashedBug.creatorId != userId) throw new Error (`Not allowed to squash ${squashedBug}`)
    await squashedBug.deleteOne()
    return squashedBug
  }
  

// async getNotesByBugId(bugId){
// const notes = await dbContext.Notes.find({bugId : bugId})
// return notes

// }



}

export const bugsService = new BugsService()