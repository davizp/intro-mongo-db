const Post = require('./post');

const postByTitle = (title) => {
  return Post.findOne({ title }).exec();
};

const postsForAuthor = (authorId) => {
  return Post.find({ author: authorId }).exec();
};

const fullPostById = (id) => {
  return Post.findById(id).populate('author').exec();
};

const allPostsSlim = (fieldsToSelect) => {
  return Post.find({}).select(fieldsToSelect).exec();
};

const postByContentLength = (maxContentLength, minContentLength) => {
  return Post.find({
    contentLength: { $gt: minContentLength, $lt: maxContentLength },
  }).exec();
};

const addSimilarPosts = (postId, similarPosts) => {
  return Post.findByIdAndUpdate(
    postId,
    {
      $push: { similarPosts: { $each: similarPosts } },
    },
    { new: true }
  )
    .populate('post')
    .exec();
};

module.exports = {
  postByTitle,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  postByContentLength,
  addSimilarPosts,
};
