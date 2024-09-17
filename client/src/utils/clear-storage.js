const clearLocalStorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roleName');
    localStorage.removeItem('fullName');
}

export default clearLocalStorage;