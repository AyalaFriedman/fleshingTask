export const getUsersList = async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/users';
        const response = await fetch(url);
        const users = await response.json();
        console.log(users);
        return users;
    }
    catch (err) {
        console.error(err);
    }
}

export const getPostFromApi = async (userId) => {
    try {
        debugger
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const response = await fetch(url);
        let posts = await response.json();
        console.log(posts);
        posts = posts.filter(post => post.userId === userId);
        return posts;
    }
    catch (err) {
        console.error(err);
    }
}