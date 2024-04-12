import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class NotesService {
  
  
  async createNote(noteData, userData){
    const note = (await dbContext.Notes.create(noteData)).populate('creator')
    return note
    
  }
  
async getNotesByBugId(bugId){
  const notes = await dbContext.Notes.find({bugId : bugId}).populate('bug')
  if(!notes) throw new Error (`Couldn't find notes ${notes}`)
  return notes

}

async getNotesById(noteId) {
  const notes = await dbContext.Notes.findById(noteId)
  if(!notes) throw new Error (`Couldn't find notes ${notes}`)
  return notes
}
  
 async deleteNote(noteId, userId) {

    const noteToDelete = await dbContext.Notes.findById(noteId)
    if(noteToDelete.creatorId != userId) throw new Forbidden (`Cannot delete, not yours ${noteToDelete}`)

    await noteToDelete.deleteOne()
    return noteToDelete
  }



}

export const notesService = new NotesService()