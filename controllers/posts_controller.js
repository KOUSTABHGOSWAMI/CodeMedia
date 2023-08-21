const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
    } catch (err) {
        console.log('error in catching a post')
        return;
    }

    return res.redirect('back');
}

module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        //.id means converting the object id to string
        if (post.user == req.user.id) {
            // post.remove();
            //  try {
            //     const comment = await Comment.deleteMany({ post: req.params.id });
            //     return res.redirect('back');
            // } catch (err) {
            // console.log('error in deleting comment', err);
            // return res.redirect('back');
            // }
            await Post.deleteOne({ _id: req.params.id });
            await Comment.deleteMany({ post: req.params.id });

        }
        return res.redirect('back');
    } catch (err) {
        console.log('error in deleting post', err);
        return res.redirect('back');
    }

}