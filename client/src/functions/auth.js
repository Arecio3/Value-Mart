import axios from 'axios'

// Sends token to backend
export const createOrUpdateUser = async (authToken) => {
    // Leave body empty because the token is in header
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
        headers: {
            authToken: authToken,
        }
    })
};
// Gets current user
export const currentUser = async (authToken) => {
    // Leave body empty because the token is in header
    return await axios.post(`${process.env.REACT_APP_API}/current-user`, {}, {
        headers: {
            authToken: authToken,
        }
    })
};