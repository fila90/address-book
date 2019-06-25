import React from "react";
import { observer } from "mobx-react"
import MainHeader from './../components/MainHeader'
import UsersGrid from './../components/UsersGrid'
import UserDetails from './../components/UserDetails'
import MoreLoader from './../components/MoreLoader'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeUser: null
    }

    this.throttle = 0;
    this.handleScroll = this.handleScroll.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleUserClick = this.handleUserClick.bind(this)
    this.handleCloseDetails = this.handleCloseDetails.bind(this)
  }

  /**
   * @desc fetch users if there aren't any
   */
  componentDidMount() {
    const { appStore } = this.props;

    if (!appStore.users.length) {
      appStore
        .getUsers()
        .then(_ => {
          appStore.setUsers()
        })
    }
  }

  /**
   * @desc clear search when leaving Home
   * clear search timeout so we don't update unmounted component
   */
  componentWillUnmount() {
    this.props.appStore.setSearch('')
    clearTimeout(this.throttle)
  }

  /**
   * @desc make search case insensitive
   * throttle the action so we don't filter users too often
   * @param {Object} e
   */
  handleSearch(e) {
    const search = e.target.value.toLowerCase();
    clearTimeout(this.throttle)
    this.throttle = setTimeout(() => {
      this.props.appStore.setSearch(search)
    }, 250);
  }

  /**
   * @desc set active user and show modal
   * @param {Object} user
   */
  handleUserClick(user) {
    this.setState({
      activeUser: user
    })
  }

  /**
   * @desc remove active user/close modal
   */
  handleCloseDetails() {
    this.setState({
      activeUser: null
    })
  }

  /**
   * @desc witchcraft to handle preloading and adding new users
   * a bit tricky one because with bad internet connection we
   * could be at the bottom of the list and still fetching users
   * @param {Object} e
   */
  handleScroll(e) {
    const { appStore } = this.props;
    const { clientHeight, scrollHeight, scrollTop } = e.target;
    const tillEnd = Math.abs(clientHeight - (scrollHeight - scrollTop));

    // don't even bother, we have it all
    if (appStore.users.length === 1000) return

    // we're 800px from bottom of users list, go and fetch new users if we're not already fetching/fetched
    if (tillEnd < 800 && !appStore.loading && !appStore.nextBatch.length) {
      appStore
        .getUsers()
        .then(_ => {
          // data is fetched, if we reached bottom of list, add users right away
          if (appStore.addBatch) appStore.setUsers();
        })
    }

    // we're at the bottom of users list
    // if we've already fetched users show them
    // else add flag for adding users as soon as request completes
    if (tillEnd === 0) {
      if (appStore.nextBatch.length) appStore.setUsers();
      else appStore.setAddBatch(true);
    }
  }

  render() {
    const { activeUser } = this.state;
    const { displayUsers, loading, addBatch } = this.props.appStore;

    return (
      <main className="route route--home">
        <MainHeader handleSearch={this.handleSearch} />
        <UsersGrid
          users={displayUsers}
          handleScroll={this.handleScroll}
          handleUserClick={this.handleUserClick}
        />
        {loading && addBatch && <MoreLoader />}
        {activeUser && <UserDetails user={activeUser} handleCloseDetails={this.handleCloseDetails} />}
      </main>
    )
  }
}

export default observer(Home)
