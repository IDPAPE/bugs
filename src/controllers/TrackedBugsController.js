import { Auth0Provider } from "@bcwdev/auth0provider";
import { trackedBugsService } from "../services/TrackedBugsService.js";
import BaseController from "../utils/BaseController.js";


export class TrackedBugsController extends BaseController{
constructor(){
  super('api/trackedbugs')
  this.router
  .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createTrackedBug)
    .delete('/:trackedBugId', this.squashedTrackedBug)
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


async squashedTrackedBug(request, response, next){
try {
  const trackedBugId = request.params.trackedBugId
  const userId = request.userInfo.id
  const squashedTrackedBug = await trackedBugsService.squashedTrackedBug(trackedBugId, userId)
  response.send(squashedTrackedBug)
} catch (error) {
  next(error)
}

}







  
}