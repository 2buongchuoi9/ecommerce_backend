import commentModel from "../models/comment.model.js"
import { BadRequestError, NotFoundError } from "../core/error.response.js"
import productRepo from "../models/repositories/product.repo.js"

/**
 *  add comment [user,shop]
 *  get list of comment [user,shop]
 *  delete [user, shop, admin]
 */
const commentService = {
    addComment: async ({ productId, userId, content, parentCommentId = null }) => {
        let rightValue
        if (parentCommentId) {
            // reply comment
            const parentComment = await commentModel.findById(parentCommentId)
            if (!parentComment) throw new BadRequestError("parent comment not found")

            rightValue = parentComment.comment_right
            // update many comment
            await commentModel.updateMany(
                {
                    comment_productId: productId,
                    comment_right: { $gte: rightValue },
                },
                { $inc: { comment_right: 2 } }
            )

            await commentModel.updateMany(
                {
                    comment_productId: productId,
                    comment_left: { $gt: rightValue },
                },
                { $inc: { comment_left: 2 } }
            )
        } else {
            const maxRightValue = await commentModel.findOne(
                { comment_productId: productId },
                "comment_right", // chi lay comment_right
                {
                    sort: { comment_right: -1 }, // sort comment_right giam dan
                }
            )
            rightValue = maxRightValue ? maxRightValue + 1 : 1
        }

        return await commentModel.create({
            comment_productId: productId,
            comment_userId: userId,
            comment_content: content,
            comment_parentId: parentCommentId,
            comment_left: rightValue,
            comment_right: rightValue + 1,
        })
    },

    getCommentsByParentId: async ({ productId, parentCommentId = null, limit, page }) => {
        if (parentCommentId) {
            const parent = await commentModel.findById(parentCommentId)
            if (!parent) throw new NotFoundError("not found comment for product")

            return await commentModel
                .find({
                    comment_productId: productId,
                    comment_left: { $gt: parent.comment_left },
                    comment_right: { $lte: parent.comment_right },
                })
                .sort({ comment_left: 1 })
        }
        return await commentModel
            .find({
                comment_productId: productId,
                comment_parentId: parentCommentId,
            })
            .sort({ comment_left: 1 })
    },

    deleteComment: async ({ commentId, productId }) => {
        const foundProduct = await productRepo.findById(productId)
        if (!foundProduct) throw new NotFoundError("not found product")

        const comment = await commentModel.findById(commentId)
        if (!comment) throw new NotFoundError("not found comment")

        const leftValue = comment.comment_left
        const rightValue = comment.comment_right
        // tinh width
        const width = rightValue - leftValue + 1
        // xoa
        await commentModel.deleteMany({
            comment_productId: productId,
            comment_left: { $gte: leftValue, $lte: rightValue },
        })
        // cap nhat gia tri left va rigth
        await commentModel.updateMany(
            {
                comment_productId: productId,
                comment_right: { $gt: rightValue },
            },
            { $inc: { comment_right: -width } }
        )
        await commentModel.updateMany(
            {
                comment_productId: productId,
                comment_left: { $gt: rightValue },
            },
            { $inc: { comment_right: -width } }
        )
        return true
    },
}
export default commentService
