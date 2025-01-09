const commentBasicOptions = {
    select: {
        id: true,
        content: true,
        email: true,
        create_date: true
    }
};

const postBasicOptions = {
    select: {
        id: true,
        title: true,
        content: true,
        create_date: true
    }
};

module.exports = {
    commentBasicOptions,
    postBasicOptions
};