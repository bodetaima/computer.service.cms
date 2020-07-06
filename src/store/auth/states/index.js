const user = JSON.parse(localStorage.getItem("user"));
export default {
    status: {
        loggedIn: user ? true : false,
    },
    user: user ? user : null,
};
