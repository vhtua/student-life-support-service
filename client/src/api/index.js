// Define constants
const username = localStorage.getItem("username"); 

// User API
const getUserByUserName = `/api/v1/users/${username}`;


export default { getUserByUserName };