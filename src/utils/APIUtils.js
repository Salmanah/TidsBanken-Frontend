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




export function createVacationRequest(requestTitle, requestPeriodStart, requestPeriodEnd) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log("SENDING POST REQUEST TO BACKEND ", API_BASE_URL + `/request`)
  return request({
    url: API_BASE_URL + `/request`,
    method: 'POST',
    body: JSON.stringify({
      request_id: -1,
      title: requestTitle,
      period_start: requestPeriodStart,
      period_end: requestPeriodEnd
    }),
  });
}

export function deleteVacationRequestAdmin(id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log("SENDING POST REQUEST TO BACKEND ", API_BASE_URL + `/admin/request/${id}`)
  return request({
    url: API_BASE_URL + `/admin/request/${id}`,
    method: 'PATCH'
  });
}

export function deleteVacationRequest(id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log("SENDING POST REQUEST TO BACKEND ", API_BASE_URL + `/request/{id}`)
  return request({
    url: API_BASE_URL + `/request/${id}`,
    method: 'PATCH'
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

export function getAllUsers() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log("SENDING REQUEST TO BACKEND ", API_BASE_URL + `/users`);
  return request({
    url: API_BASE_URL + `/users`,
    method: 'GET'
  });
}


export function adminEditVacationRequest(id, newStatus) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log(
    `SENDING REQUEST TO BACKEND, 
    ${API_BASE_URL}/admin/request/${id}/edit`
  );
  console.log(`SENDING STATUS ${newStatus}`);
  return request({
    url: API_BASE_URL + `/admin/request/${id}/edit`,
    method: "PATCH",
    body: newStatus
  });
}

// if you are the current user and the request is approved
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

export function createCommentForVacationRequestAsAdmin(id, message) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log("SENDING POST REQUEST TO BACKEND ", API_BASE_URL + `/admin/request/${id}/comment`);
  return request({
    url: API_BASE_URL + `/admin/request/${id}/comment`,
    method: "POST",
    body: JSON.stringify({
      comment_id: -1,
      message: message
    })
  });
}


export function createCommentForVacationRequest(id, message) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log("SENDING POST REQUEST TO BACKEND ", API_BASE_URL + `/request/${id}/comment`);
  return request({
    url: API_BASE_URL + `/request/${id}/comment`,
    method: "POST",
    body: JSON.stringify({
      comment_id: -1,
      message: message
    })
  });
}

export function getAllCommentsByVacationRequestID(r_id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log(
    "SENDING REQUEST TO BACKEND ",
    API_BASE_URL + `/request/${r_id}/comment`
  );
  return request({
    url: API_BASE_URL + `/request/${r_id}/comment`,
    method: "GET"
  });
}


export function getAllCommentsByVacationRequestIDAsAdmin(r_id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log(
    "SENDING REQUEST TO BACKEND ",
    API_BASE_URL + `/admin/request/${r_id}/comment`
  );
  return request({
    url: API_BASE_URL + `/admin/request/${r_id}/comment`,
    method: "GET"
  });
}

export function getAllIneligiblePeriods() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log(
    "SENDING REQUEST TO BACKEND ",
    API_BASE_URL + `/admin/ineligible`
  );
  return request({
    url: API_BASE_URL + `/admin/ineligible`,
    method: "GET"
  });
}

export function createIneligiblePeriod(
  requestPeriodStart,
  requestPeriodEnd
) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log("SENDING POST REQUEST TO BACKEND ", API_BASE_URL + `/admin/ineligible`);
  return request({
    url: API_BASE_URL + `/admin/ineligible`,
    method: "POST",
    body: JSON.stringify({
      request_id: -1,
      period_start: requestPeriodStart,
      period_end: requestPeriodEnd
    })
  });

}

export function getIneligiblePeriodById(ip_id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log(
    "SENDING REQUEST TO BACKEND ",
    API_BASE_URL + `/admin/ineligible/${ip_id}`
  );
  return request({
    url: API_BASE_URL + `/admin/ineligible/${ip_id}`,
    method: "GET"
  });
}

export function deleteIneligiblePeriod(id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log("SENDING POST REQUEST TO BACKEND ", API_BASE_URL + `/admin/ineligible/${id}`)
  return request({
    url: API_BASE_URL + `/admin/ineligible/${id}`,
    method: 'PATCH'
  });
}

export function editUser(id, name, admin, email_verified) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log("SENDING POST REQUEST TO BACKEND ", API_BASE_URL + `/request`)
  return request({
    url: API_BASE_URL + `/user/${id}/edit`,
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      admin: admin,
      email_verified: email_verified,
    }),
  });
}


export function getNotificationForCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log(
    "SENDING REQUEST TO BACKEND ",
    API_BASE_URL + `/notification/`
  );
  return request({
    url: API_BASE_URL + `/notification/`,
    method: "GET"
  });
}

export function getNotificationForAdmin() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log(
    "SENDING REQUEST TO BACKEND ",
    API_BASE_URL + `/admin/notification/`
  );
  return request({
    url: API_BASE_URL + `/admin/notification/`,
    method: "GET"
  });
}

export function setMaxVacationDays(max_vacation_days) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log(
    "SENDING REQUEST TO BACKEND ",
    API_BASE_URL + `/admin/vacationDays/`
  );
  return request({
    url: API_BASE_URL + `/admin/vacationDays/`,
    method: "POST",
    body: JSON.stringify({
      max_vacation_days: max_vacation_days,
    }),
  });
}

export function getMaxVacationDays() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  console.log(
    "SENDING REQUEST TO BACKEND ",
    API_BASE_URL + `/vacationDays/`
  );
  return request({
    url: API_BASE_URL + `/vacationDays/`,
    method: "GET",
  });
}