import React from "react";
import { observer } from "mobx-react"
import MainHeader from './../components/MainHeader'
import UsersGrid from './../components/UsersGrid'
import UserDetails from './../components/UserDetails'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeUser: null
    }
    console.log(this.props);

    this.throttle = 0;
    this.handleLoadMore = this.handleLoadMore.bind(this)
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

  handleLoadMore() {
    this
      .props.appStore.getUsers()
      .then(res => this.props.appStore.setUsers())
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
    const { fetchingBatch, nextBatch } = this.props.appStore;
    const { clientHeight, scrollHeight, scrollTop } = e.target;
    const tillEnd = Math.abs(clientHeight - (scrollHeight - scrollTop));

    if (tillEnd < 800 && !fetchingBatch && !nextBatch.length) {
      console.log('end');
      this.props.appStore.getUsers();
    }

    if (tillEnd === 0 && nextBatch.length) {
      console.log('set');
      this.props.appStore.setUsers();
    }
  }

  render() {
    console.log('RENDER');

    const { activeUser } = this.state;
    const { displayUsers } = this.props.appStore;

    return (
      <main className="route route--home">
        <MainHeader handleSearch={this.handleSearch} />
        <UsersGrid
          users={displayUsers}
          handleScroll={this.handleScroll}
          handleUserClick={this.handleUserClick}
        />
        {activeUser && <UserDetails user={activeUser} handleCloseDetails={this.handleCloseDetails} />}
      </main>
    )
  }
}

export default observer(Home)
