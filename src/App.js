import React from 'react'
import { Suspense } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import styles from './App.module.css';
import FriendsContainer from './components/Friends/FriendsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import NavContainer from './components/Nav/NavContainer';
import Preloader from './components/Preloader/Preloader';
import LoginContainer from './pages/Login/LoginContainer';
import News from './pages/News/News';
import ProfileContainer from './pages/Profile/ProfileContainer';
import Settings from './pages/Settings/Settings';
import { initializeApp } from './redux/app-reducer'

const MessagesContainer = React.lazy(() => import('./pages/Messages/MessagesContainer'));
const UsersContainer = React.lazy(() => import('./pages/Users/UsersContainer'));

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.isInitialized) {
      return <Preloader />
    }
    return (
      <div className={styles.wrapper}>
        <HeaderContainer />
        <aside className={styles.sidebar}>
          <NavContainer />
          <FriendsContainer />
        </aside>
        <div className={styles.content}>
          <Route exact path="/"><ProfileContainer /></Route>
          <Route path="/profile/:userID?"><ProfileContainer /></Route>
          <Route path="/messages"><Suspense fallback={<Preloader />}><MessagesContainer /></Suspense></Route>
          <Route path="/news"><News /></Route>
          <Route path="/users"><Suspense fallback={<Preloader />}><UsersContainer /></Suspense></Route>
          <Route path="/settings"><Settings /></Route>
          <Route path="/login"><LoginContainer /></Route>
        </div>
      </div>
    );
  }
  
}

let mapStateToProps = (state) => {
  return {
    isInitialized: state.app.isInitialized
  }
}

export default connect(mapStateToProps, {initializeApp})(App);

