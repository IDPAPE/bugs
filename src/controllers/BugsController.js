import { Auth0Provider } from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext.js";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";


export class BugsController extends BaseController{
constructor(){
  super('api/bugs')
  this.router
  .use(Auth0Provider.getAuthorizedUserInfo)
  .post('', this.createBug)
  .get('', this.getBugs)
  .get('/:bugId', this.getBugsById)
  .put('/:bugId', this.editBug)
  .delete('/:bugId', this.squashedBug)
  
  .get('/:bugId/notes', this.getNotesByBugId)


}

async createBug(request, response, next){
  try {
  const bugData = request.body
  const userInfo = request.userInfo
  bugData.creatorId = userInfo.id
  const bug = await bugsService.createBug(bugData)
  response.send(bug)
} catch (error) {
  next(error)
}

}

async getBugs(request, response, next){
try {
  const bugs = await bugsService.getBugs()
response.send(bugs)
} catch (error) {
  next(error)
}

}

async getBugsById(request, response, next){
try {
  const bugId = request.params.bugId
  const bugs = await bugsService.getBugsById(bugId)
  response.send(bugs)
} catch (error) {
  next(error)
}

}

async editBug(request, response, next){
  try {
    const bugId = request.params.bugId
    const bugData = request.body
    const editedBug = await bugsService.editBug(bugId, bugData)
    response.send(editedBug)
  } catch (error) {
    next(error)
  }
}


async squashedBug(request, response, next){
  try {
    const bugId = request.params.bugId
    const userInfo = request.userInfo
    const squashedBug = await bugsService.squashedBug(bugId, userInfo.id)
    response.send(squashedBug)

  } catch (error) {
    next(error)
  }
}

async getNotesByBugId(request, response, next){
try {
  const bugId = request.params.bugId
  const notes = await notesService.getNotesByBugId(bugId)
  response.send(notes)
} catch (error) {
  next(error)
}


}


}