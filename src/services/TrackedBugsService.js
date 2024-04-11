import { dbContext } from "../db/DbContext.js"

class TrackedBugsService {
  async createTrackedBug(trackedBugData) {
    const createdTrackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await createdTrackedBug.populate('bug')
    await createdTrackedBug.populate('tracker')
    return createdTrackedBug
  }












}

export const trackedBugsService = new TrackedBugsService()