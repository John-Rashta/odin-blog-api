const commentBasicOptions = {
    select: {
        content: true,
        email: true,
        create_date: true
    }
};

const postBasicOptions = {
    select: {
        title: true,
        content: true,
        create_date: true
    }
};

module.exports = {
    commentBasicOptions,
    postBasicOptions
};