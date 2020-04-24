import Constants from "expo-constants";
// TODO - refactor in future
const { manifest } = Constants;
// We have to use dynamic Dev ip because localhost is not supported
const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;
const basePath = `${uri}/api/v1`;

// DEMO for how to user a service

// GET
/*
*getMarker({markerId: '5ea2f2095969213f2095ed31'})
        .then( docs => {
          console.debug(docs);
        })
        .catch(err => {
          console.debug(err);
        })
*/

/*

// POST
*addMarker({userId: 'mingiID', latitude: 0, longitude: 0, description: 'mingi description'})
.then( res => {
    //do sth here with res
})
.catch(err => {
    console.log(err);
})
*/


/*
    MARKERS SERVICES
*/

export const getMarkers = () =>{
    return fetch(`${basePath}/markers`, {
        method: "GET",
    })
        .then(res => {
            if(!res.ok) throw "failed to get Markers";
            return res.json();
        });
};

export const getMarker = ({markerId}) =>{
    return fetch(`${basePath}/markers/${markerId}`, {
        method: "GET",
    })
        .then(res => {
            if(!res.ok) throw "Get marker failed";
            return res.json();
        });
};

// TODO - add google maps api and after success POST
export const addMarker = ({userId, description, address}) =>{
    return fetch(`${basePath}/markers`, {
        method: "POST",
        headers:{
            "Content-type": "Application/json"
        },
        body: JSON.stringify({userId, description})
    })
        .then(res => {
            if(!res.ok) throw "Add marker failed";
            return true;
        })
};

export const deleteMarker = ({markerId}) =>{
    return fetch(`${basePath}/markers/${markerId}`, {
        method: "DELETE",
    })
        .then(res => {
            if(!res.ok) throw "delete marker failed";
            return true;
        });
};

/*
    USER SERVICES
*/

export const getUsers = () =>{
    return fetch(`${basePath}/users`, {
        method: "GET",
    })
        .then(res => {
            if(!res.ok) throw "failed to get users";
            return res.json();
        });
};

export const getUser = ({userId}) =>{
    return fetch(`${basePath}/users/${userId}`, {
        method: "GET",
    })
        .then(res => {
            if(!res.ok) throw "Get user failed";
            return res.json();
        });
};

export const addUser = ({deviceId, fullName, markerIds}) =>{
    return fetch(`${basePath}/users`, {
        method: "POST",
        headers:{
            "Content-type": "Application/json"
        },
        body: JSON.stringify({deviceId, fullName, markerIds})
    })
        .then(res => {
            if(!res.ok) throw "Add user failed";
            return true;
        })
};

export const deleteUser = ({userId}) =>{
    return fetch(`${basePath}/users/${userId}`, {
        method: "DELETE",
    })
        .then(res => {
            if(!res.ok) throw "delete user failed";
            return true;
        });
};

export const addMarkerToMarkerIds = ({userId, markerId}) =>{
    return fetch(`${basePath}/users/${userId}/markers/${markerId}`, {
        method: "PUT",
    })
        .then(res => {
            if(!res.ok) throw "add marker to markers failed";
            return true;
        });
};

export const removeMarkerFromMarkerIds = ({userId, markerId}) =>{
    return fetch(`${basePath}/users/${userId}/markers/${markerId}`, {
        method: "DELETE",
    })
        .then(res => {
            if(!res.ok) throw "delete marker to markers failed";
            return true;
        });
};