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
    console.log("SENDING REQUEST TO BACKEND ", API_BASE_URL + "/user/me")
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
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ", API_BASE_URL + `/admin/user/${id}`)
    return request({
        url: API_BASE_URL + `/admin/user/${id}`,
        method: 'GET'
    });
}

export function adminEditVacationRequest(id,newStatus) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ", API_BASE_URL + `/admin/request/${id}/edit`)
    console.log("SENDING STATUS ",`${newStatus}`)
    return request({
        url: API_BASE_URL + `/admin/request/${id}/edit`,
        method: 'PATCH',
        body:JSON.stringify({
           status: newStatus
        })
    });
}


export function createVacationRequest(requestTitle, requestPeriodStart, requestPeriodEnd) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING POST REQUEST TO BACKEND ", API_BASE_URL + `/request`)
    return request({
        url: API_BASE_URL + `/request`,
        method: 'POST',
        body: JSON.stringify({
        request_id : -1,
        title: "First Request",
        period_start: "03042020",
        period_end: "03082020",
  }),
    });
}

export function getAllUsers() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ",API_BASE_URL+`/users`)
    return request({
        url: API_BASE_URL +`/users`,
        method: 'GET'
    });
}

export function deleteVacationRequest(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING POST REQUEST TO BACKEND ", API_BASE_URL + `/admin/request/{id}`)
    return request({
        url: API_BASE_URL + `/admin/request/${id}`,
        method: 'PATCH'
    });
}

export function createCommentForVacationRequest(id, message) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set.");
    }
    console.log(
      "SENDING POST REQUEST TO BACKEND ",
      API_BASE_URL + `/request/${id}/comment`
    );
    return request({
      url: API_BASE_URL + `/request/${id}/comment`,
      method: "POST",
      body: JSON.stringify({
        comment_id: -1,
        message: message
      })
    });
  }
  
  export function createCommentForVacationRequestAsAdmin(id, message) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set.");
    }
    console.log(
      "SENDING POST REQUEST TO BACKEND ",
      API_BASE_URL + `/admin/request/${id}/comment`
    );
    return request({
      url: API_BASE_URL + `/admin/request/${id}/comment`,
      method: "POST",
      body: JSON.stringify({
        comment_id: -1,
        message: message
      })
    });
  }

export function login(loginRequest) {
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

export function getUserRequestsById(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ", API_BASE_URL + `/user/${id}/requests`)
    return request({
        url: API_BASE_URL + `/user/${id}/requests`,
        method: 'GET'
    });
}

export function getUserRequestAndApproved() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ", API_BASE_URL + `/request`)
    return request({
        url: API_BASE_URL + `/request`,
        method: 'GET'
    });
}

export function getAllVacationRequestsAsAdmin() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ", API_BASE_URL + `/admin/request`)
    return request({
        url: API_BASE_URL + `/admin/request`,
        method: 'GET'
    });
}

export function getVacationRequestByID(id) {
if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
}
console.log("SENDING REQUEST TO BACKEND ", API_BASE_URL + `/request/${id}`);
return request({
    url: API_BASE_URL + `/request/${id}`,
    method: "GET"
});
}


export function getVacationRequestByIDasAdmin(id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ", API_BASE_URL + `/admin/request/${id}`);
    return request({
      url: API_BASE_URL + `/admin/request/${id}`,
      method: "GET"
    });
  }



export function getVacationRequestCommentByIDasAdmin(r_id, c_id) {
if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
}
console.log("SENDING REQUEST TO BACKEND ", API_BASE_URL + `/admin/request/${r_id}/comment/${c_id}`);
return request({
    url: API_BASE_URL + `/admin/request/${r_id}/comment/${c_id}`,
    method: "GET"
});
}


export function getVacationRequestCommentByID(r_id, c_id) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set.");
    }
    console.log("SENDING REQUEST TO BACKEND ", API_BASE_URL + `/request/${r_id}/comment/${c_id}`);
    return request({
      url: API_BASE_URL + `/request/${r_id}/comment/${c_id}`,
      method: "GET"
    });
  }
