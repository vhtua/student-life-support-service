const clearLocalStorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roleName');
    localStorage.removeItem('fullName');
    localStorage.removeItem('username');
}

export default clearLocalStorage;