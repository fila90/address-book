import {
  observable,
  configure,
  flow,
  action,
} from "mobx";
import { fetchUsers } from './../api'

// don't allow state modifications outside actions
configure({ enforceActions: "always" });

// nationalities are kept after refresh
const nat = localStorage.getItem('nat') ?
  JSON.parse(localStorage.getItem('nat'))
  : ['CH', 'ES', 'FR', 'GB'];

const state = observable({
  nat,
  loading: true,
  fetchingBatch: false,
  search: '',
  page: 0,
  users: [],
  nextBatch: [],
  /**
   * @desc computed value that filters users by search keyword
   */
  get displayUsers() {
    return this.users.filter(u =>
      u.name.first.includes(this.search) ||
      u.name.last.includes(this.search)
    )
  },
  /**
   * @desc fetch users from external API
   * increment page for next fetch, if page at max don't fetch
   * put username inside of name object and remove login object
   */
  getUsers: flow(function* () {
    const page = this.incremetPage();
    if(!page) return;

    this.fetchingBatch = true;
    const nat = this.nat.join(',')
    const res = yield fetchUsers(this.page, nat)
    const users = res.results.map(u => {
      u.name.username = u.login.username;
      delete u.login
      return u
    })
    console.log(users);

    this.nextBatch = [...users]
    this.fetchingBatch = false;
    return users
  }),
  /**
   * @desc 20 is max page for 1000 users
   */
  incremetPage: action(function() {
    if(this.page === 20) return false
    this.page = this.page + 1;
    return this.page
  }),
  /**
   * @desc set users to state
   * setTimeout simulates high load
   */
  setUsers: action('setUsers', function () {
    this.users = [
      ...this.users,
      ...this.nextBatch
    ]
    this.nextBatch = []
  }),
  setSearch: action(function (search) {
    this.search = search;
  }),
  /**
   * @desc toggle nationalities filter and store in localStorage
   * rest page to 0
   * empty users list
   */
  toggleNat: action(function (nat) {
    if (this.nat.includes(nat)) {
      this.nat = this.nat.filter(n => n !== nat)
    } else {
      this.nat = [
        ...this.nat,
        nat
      ]
    }
    this.page = 0;
    this.users = [];
    localStorage.setItem('nat', JSON.stringify(this.nat))
  })
})

export default state
