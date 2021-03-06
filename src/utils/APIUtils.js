import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ",API_BASE_URL+"/user/me")
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}
 
export function getOtherUser(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ", API_BASE_URL + `/user/${id}`)
    return request({
        url: API_BASE_URL + `/user/${id}`,
        method: 'GET'
    }); 
}
export function getOtherUserAsAdmin(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ",API_BASE_URL+`/admin/user/${id}`)
    return request({
        url: API_BASE_URL +`/admin/user/${id}`,
        method: 'GET'
    });
}


export function createVacationRequest() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ",API_BASE_URL+`/request`)
    return request({
        url: API_BASE_URL +`/request`,
        method: 'POST',
        body: JSON.stringify({
        request_id : -1,
        title: "Second Request",
        period_start: "04042020",
        period_end: "08082020",
  }),
    });
}

export function getUserRequestsById(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ",API_BASE_URL+`/user/${id}/requests`)
    return request({
        url: API_BASE_URL +`/user/${id}/requests`,
        method: 'GET'
    });
}

export function getUserRequestAndApproved(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ",API_BASE_URL+`/request`)
    return request({
        url: API_BASE_URL +`/request`,
        method: 'GET'
    });
}
export function getAllVacationRequestsAsAdmin() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ",API_BASE_URL+`/admin/request`)
    return request({
        url: API_BASE_URL +`/admin/request`,
        method: 'GET'
    });
}



export function login(loginRequest) {
    console.log("HERE IS THE REQUEST ", loginRequest)
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}