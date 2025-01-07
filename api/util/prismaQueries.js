const {prisma} = require("../config/client");

exports.getPosts = async () => {
    const allPosts = await prisma.post.findMany();
    return allPosts;
};

exports.createPost = async (data, user=false, options={}) => {
    const createdPost = await prisma.post.create({
        data: {
            ...data,
            ...(Number.isInteger(user) ? {author: {connect: {id : user}}} : {})
        },
        ...options
    });

    return createdPost;
};

exports.updatePost = async (where, data, options={}) => {
    const updatedPost = await prisma.post.update({
        where: {
            ...where
        },
        data: {
            ...data
        },
        ...options
    });

    return updatedPost;
};

exports.deletePost = async (where, options={}) => {
    const deletedPost = await prisma.post.delete({
        where: {
            ...where
        },
        ...options
    });

    return deletedPost;
};

exports.getPost = async (where, options={}) => {
    const foundPost = await prisma.post.findFirst({
        where: {
            ...where
        },
        ...options
    });

    return foundPost;
};

exports.getUser = async (where, options={}) => {
    const foundUser = await prisma.user.findFirst({
        where: {
            ...where
        },
        ...options
    });

    return foundUser;
};

exports.createUser = async (data, options={}) => {
    const createdUser = await prisma.user.create({
        data: {
            ...data
        },
        ...options
    });

    return createdUser;
};

exports.getComments = async (where, options={}) => {
    const postComments = await prisma.comment.findMany({
        where: {
            ...where
        },
        ...options
    });

    return postComments;
};

exports.createComment = async (data, post, user=false, options={}) => {
    const createdComment = await prisma.comment.create( {
        data: {
            ...data,
            ...(Number.isInteger(user) ? {author: {connect: {id : user}}} : {}),
            post: {
                connect: {
                    id: post
                }
            }
        },
        ...options
    });

    return createdComment;

};

exports.updateComment = async(where, data, options={}) => {
    const updatedComment = await prisma.comment.update({
        data: {
            ...data
        },
        where: {
            ...where
        },
        ...options
    });

    return updatedComment;

};

exports.deleteComment = async(where, options={}) => {
    const deletedComment = await prisma.comment.delete({
        where: {
            ...where
        },
        ...options
    });

    return deletedComment;
};

exports.getComment = async(where, options={}) => {
    const foundComment = await prisma.comment.findFirst({
        where: {
            ...where
        },
        ...options
    });

    return foundComment;
};

exports.deleteUser = async(where, options={}) => {
    const deletedUser = await prisma.user.delete({
        where: {
            ...where
        },
        ...options
    });

    return deletedUser;
};

///SPECIFIC QUERIES
exports.getUserPosts = async(user, options={}) => {
    const userPosts = await prisma.post.findMany({
        where: {
            authorid: user
        },
        ...options
    });

    return userPosts;
};

exports.getUserComments = async(user, options={}) => {
    const userComments = await prisma.comment.findMany({
        where: {
            authorid: user
        },
        ...options
    });

    return userComments;
};