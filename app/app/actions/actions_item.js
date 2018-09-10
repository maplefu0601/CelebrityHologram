
const APIURL = '/api/items/';
const errMsg = 'Please try again later, server is not responding';

export async function getItems() {
  return fetch(APIURL)
    .then(resp => {
      if(!resp.ok) {
        if(resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: errMsg};
          throw err;
        }
      }

      return resp.json();
    })
}
// findItem by id or name
export async function findItem(name) {
  let findURL = APIURL + name;
  return fetch(findURL)
    .then(resp => {
      if(!resp.ok) {
        if(resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: errMsg};
          throw err;
        }
      }

      return resp.json();
    })
}

export async function createItem(val, imageData){
  return fetch(APIURL, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({name: val, imageData: imageData})
  })
    .then(resp => {
      if(!resp.ok) {
        if(resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: errMsg};
          throw err;
        }
      }

      return resp.json();
    })
}

export async function removeItem(id) {
  const deleteURL = APIURL + id;
  return fetch(deleteURL, {
    method: 'DELETE'
  })
    .then(resp => {
      if(!resp.ok) {
        if(resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: errMsg};
          throw err;
        }
      }

      return resp.json();
    })
}
