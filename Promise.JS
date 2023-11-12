const posts = [];
let lastActivityTime = null;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createPost(postTitle) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push({ title: postTitle });
            resolve();
        }, 2000);
    });
}

function updateLastUserActivityTime() {
    return new Promise((resolve) => {
        setTimeout(() => {
            lastActivityTime = new Date();
            resolve(lastActivityTime);
        }, 1000);
    });
}

function deletePost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (posts.length > 0) {
                const deletedPost = posts.pop();
                resolve(deletedPost);
            } else {
                reject("ERROR: ARRAY IS EMPTY");
            }
        }, 1000);
    });
}


createPost("First Post")
    .then(() => updateLastUserActivityTime())
    .then((updatedActivityTime) => {
        console.log("Posts after creating the first post:", posts);
        console.log("Last Activity Time:", updatedActivityTime);
        return createPost("Second Post");
    })
    .then(() => updateLastUserActivityTime())
    .then((updatedActivityTime) => {
        console.log("Posts after creating the second post:", posts);
        console.log("Last Activity Time:", updatedActivityTime);
        return Promise.all([deletePost(), updateLastUserActivityTime()]);
    })
    .then(([deletedPost, updatedActivityTime]) => {
        console.log("Deleted Post:", deletedPost);
        console.log("Remaining Posts:", posts);
        console.log("Last Activity Time after deletion:", updatedActivityTime);
    })
    .catch((error) => console.log(error));
