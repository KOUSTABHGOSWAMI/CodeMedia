const Post = require('../models/post');
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