export const storeToken = (t) => {
    sessionStorage.setItem('token',t);
}

export const readToken = () => {
    return sessionStorage.getItem('token');
}

export const isAuthenticated = () => {
    return sessionStorage.getItem('token') !== null ;
}