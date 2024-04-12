import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService.js";
import BaseController from "../utils/BaseController.js";


export class NotesController extends BaseController{
constructor(){
super('api/notes')
this.router
.use(Auth0Provider.getAuthorizedUserInfo)
  .post('', this.createNote)
.delete('/:noteId', this.deleteNote)
  .get('/:noteId', this.getNoteById)

}



async createNote(request, response, next){
try {
  const noteData = request.body
  const userData = request.userInfo
  noteData.creatorId = userData.id
  const note = await notesService.createNote(noteData)
  response.send(note)
} catch (error) {
  next(error)
}
  
}

async getNoteById(request, response, next){
  try {
const noteId = request.params.noteId
const note = await notesService.getNotesById(noteId)
  response.send(note)
} catch (error) {
  next(error)
}
}


async deleteNote(request, response, next){
  try {
    const noteId = request.params.noteId
    const userId = request.userInfo.id
    const deletedNote = await notesService.deleteNote(noteId, userId)
    response.send(deletedNote)
  } catch (error) {
    next(error)
  }
}





}