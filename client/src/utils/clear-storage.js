const clearLocalStorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roleName');
}

export default { clearLocalStorage };