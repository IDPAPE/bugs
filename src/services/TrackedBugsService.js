import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TrackedBugsService {
  async createTrackedBug(trackedBugData) {
    const createdTrackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await createdTrackedBug.populate('bug')
    await createdTrackedBug.populate('tracker')
    return createdTrackedBug
  }
  
  
  
 async getUsersTrackingBug(bugId) {
   const getUsersTrackingBug = await dbContext.TrackedBugs.find({bugId : bugId}).populate('tracker').populate('bug')
   if(!getUsersTrackingBug) throw new Error(`Couldn't find ${getUsersTrackingBug}`)
   return getUsersTrackingBug
  }
  
  
  async getMyTrackedBugs(userData){
    const userId = userData.id
    const myTrackedBugs = await dbContext.TrackedBugs.find({accountId : userId}).populate('bug')
    if(!myTrackedBugs) throw new Error(`Couldn't find ${myTrackedBugs}`)
    return myTrackedBugs
  }
  
  
 async squashedTrackedBug(trackedBugId, userId) {
   const foundTrackedBug = await dbContext.TrackedBugs.findById(trackedBugId)

if (userId != foundTrackedBug.accountId) throw new Forbidden (`Couldn't squash bug ${foundTrackedBug}`)

 await foundTrackedBug.deleteOne()
 return foundTrackedBug
  }




}

export const trackedBugsService = new TrackedBugsService()