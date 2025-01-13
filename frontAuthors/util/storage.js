function checkStorage() {
    return localStorage.getItem("token");
};

function saveInStorage(tokenData) {
    localStorage.setItem("token", tokenData.token);
    localStorage.setItem('id', tokenData.id);
};

function clearStorage() { 
    localStorage.removeItem("token");
    localStorage.removeItem("id");
}

function getIdFromStorage() {
    return localStorage.getItem("id");
}

export {checkStorage, saveInStorage, clearStorage, getIdFromStorage};