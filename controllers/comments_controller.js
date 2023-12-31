const Comment = require('../models/comment');
const Post = require('../models/post');
// module.exports.create = async function(req, res) {
//     try {
//         const post = await Post.findById(req.body.post);
//         if (post) {
//             try {
//                 const comment = await Comment.create({
//                     content: req.body.content,
//                     post: req.body.post,
//                     user: req.user._id
//                 });
//                 //console.log(comment);
//                 post.comments.push(comment);
//                 post.save();
//                 return res.redirect('/');
//             } catch (err) {
//                 console.log('error in creating comment', err);
//                 return;
//             }
//         }
//     } catch (err) {
//         console.log('error in finding post', err);
//         return;
//     }
// }
module.exports.create = async function(req, res) {
    try {
        const post = await Post.findById(req.body.post);
        if (!post) {
            console.log('Post not found');
            return res.redirect('/');
        }

        const comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });

        // console.log(comment);

        post.comments.push(comment);
        await post.save(); // Make sure to await the save operation

        return res.redirect('/');
    } catch (err) {
        console.log('Error:', err);
        return res.redirect('/');
    }
};

module.exports.destroy = async function(req, res) {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            //storing the post id to where this comment belongs to so that we can remove this comment from the post
            const postId = comment.post;
            await Comment.deleteOne({ _id: comment._id });
            try {
                //pulling out that comment from the Post 
                const post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
                return res.redirect('back');

            } catch (err) {
                console.log('error in updating comment in post', err);
                return res.redirect('back');
            }

        } else
            return res.redirect('back');
    } catch (err) {
        console.log('error in destroying comment', err);
        return res.redirect('back');
    }
}