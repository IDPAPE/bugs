import { Auth0Provider } from "@bcwdev/auth0provider";
import { trackedBugsService } from "../services/TrackedBugsService.js";
import BaseController from "../utils/BaseController.js";


export class TrackedBugsController extends BaseController{
constructor(){
  super('api/trackedbugs')
  this.router
  .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createTrackedBug)
}

async createTrackedBug(request, response, next){
  try {
const trackedBugData = request.body
const userData = request.userInfo
trackedBugData.creatorId = userData.id
const createdTrackedBug = await trackedBugsService.createTrackedBug(trackedBugData)

  response.send(createdTrackedBug)
} catch (error) {
  next(error)
}
}










  
}