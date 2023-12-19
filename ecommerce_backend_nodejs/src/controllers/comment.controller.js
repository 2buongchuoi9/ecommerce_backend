import { SuccessResponse } from "../core/success.response.js"
import commentService from "../services/comment.service.js"

const commentController = {
    addComment: async (req, res, next) => {
        return new SuccessResponse({
            message: "add comment ok",
            metadata: await commentService.addComment(req.body),
        }).send(res)
    },
}
export default commentController
