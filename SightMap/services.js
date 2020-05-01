/* eslint-disable no-const-assign */
/* eslint-disable no-console */
import Constants from 'expo-constants';
// TODO - refactor in future
const { manifest } = Constants;
// We have to use dynamic Dev ip because localhost is not supported
const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;
const basePath = `${uri}/api/v1`;

/*
    MARKERS SERVICES
*/

export const getMarkers = () => fetch(`${basePath}/markers`, {
  method: 'GET',
})
  .then((res) => {
    if (!res.ok) throw new Error('getting all markerks failed');
    return res.json();
  }).catch((err) => {
    console.log('getting markers error : ', err);
  });


export const getMarkerById = (markerId) => fetch(`${basePath}/markers/${markerId}`, {
  method: 'GET',
})
  .then((res) => {
    if (!res.ok) throw new Error('getting marker by id failed');
    return res.json();
  })
  .catch((err) => {
    console.log('getting marker by id error : ', err);
  });


// eslint-disable-next-line no-unused-vars
export const addMarker = (userID, description, address) => {
  fetch(`${basePath}/markers`, {
    method: 'POST',
    headers: {
      'Content-type': 'Application/json',
    },
    body: JSON.stringify({ userID, description, address }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Add marker failed');
      return res.json();
    })
    .catch((err) => {
      console.log('adding marker error : ', err);
    });
};


export const deleteMarker = (markerId, userId) => fetch(`${basePath}/markers/${markerId}`, {
  method: 'DELETE',
  body: JSON.stringify({ userId }),
})
  .then((res) => {
    if (!res.ok) throw new Error('deleting marker by id failed');
    return true;
  });


/*
    USER SERVICES
*/

export const getUsers = () => fetch(`${basePath}/users`, {
  method: 'GET',
})
  .then((res) => {
    if (!res.ok) throw new Error('failed to get users');
    return res.json();
  })
  .catch((err) => {
    console.log('getting all users error : ', err);
  });

export const getUserById = (userId) => fetch(`${basePath}/users/${userId}`, {
  method: 'GET',
})
  .then((res) => {
    if (!res.ok) throw new Error('failed to get user by id');
    return res.json();
  })
  .catch((err) => {
    console.log('getting user by id error : ', err);
  });


export const addUser = ({ deviceId, fullName }) => fetch(`${basePath}/users`, {
  method: 'POST',
  headers: {
    'Content-type': 'Application/json',
  },
  body: JSON.stringify({ deviceId, fullName }),
})
  .then((res) => {
    if (!res.ok) throw new Error('failed to add user');
    return res.json();
  })
  .catch((err) => {
    console.log('adding user error : ', err);
  });

export const deleteUser = (userId) => fetch(`${basePath}/users/${userId}`, {
  method: 'DELETE',
})
  .then((res) => {
    if (!res.ok) throw new Error('failed to delete user by id');
    return res.json();
  })
  .catch((err) => {
    console.log('deleting user error : ', err);
  });
