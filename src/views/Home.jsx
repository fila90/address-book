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

  componentDidMount() {
    const { users } = this.props.appStore;

    // for first render and when coming back from settings
    // if nothing changed in settings, don't fetch users
    if (!users.length) {
      this.props.appStore
        .getUsers()
        .then(res => {
          this.props.appStore.setUsers()
        })
    }
  }

  componentWillUnmount() {
    this.props.appStore.setSearch('')
    clearTimeout(this.throttle)
  }

  handleSearch(e) {
    const search = e.target.value.toLowerCase();
    clearTimeout(this.throttle)
    this.throttle = setTimeout(() => {
      this.props.appStore.setSearch(search)
    }, 250);
  }

  handleUserClick(user) {
    this.setState({
      activeUser: user
    })
  }

  handleCloseDetails() {
    this.setState({
      activeUser: null
    })
  }

  handleScroll(e) {
    const { appStore } = this.props;
    const { clientHeight, scrollHeight, scrollTop } = e.target;
    const tillEnd = Math.abs(clientHeight - (scrollHeight - scrollTop));

    // don't even bother, we have it all
    if (appStore.users.length === 1000) return
    if (tillEnd < 800 && !appStore.loading && !appStore.nextBatch.length) {
      console.log('START FETCH');
      appStore
        .getUsers()
        .then(_ => {
          console.log('LOADED');

          if (appStore.addBatch) appStore.setUsers();
        })
    }

    if (tillEnd === 0) {
      console.log('SCROLL END');
      if (appStore.nextBatch.length) appStore.setUsers();
      else appStore.setAddBatch(true);
    }
  }

  render() {
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

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
        {activeUser && <UserDetails user={activeUser} handleCloseDetails={this.handleCloseDetails} />}
        {loading && addBatch && <MoreLoader />}
      </main>
    )
  }
}

export default observer(Home)
