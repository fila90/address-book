const BASE_URL = 'https://randomuser.me/api/?inc=name,location,phone,cell,email,login,picture&seed=addressbook&results=50';

/**
 * @desc get users from API
 * @param {Number} page page number
 * @param {String} nat nationalities
 */
export function fetchUsers(page, nat) {
  let URL = `${BASE_URL}&page=${page}`
  if (nat) {
    URL = `${URL}&nat=${nat}`
  }

  return fetch(URL, {
    method: 'GET',
  })
    .then(res => res.json())
}
