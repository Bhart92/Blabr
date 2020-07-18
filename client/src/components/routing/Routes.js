import React, {Fragment} from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import NewFeedWidget from '../newsfeed/NewFeedWidget';
import Post from '../post/Post';
import Dashboard from '../dashboard/Dashboard';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import DashboardNavBar from '../dashboard/DashboardNavBar';
import DashboardWidgets from '../dashboard/DashboardWidgets';
import { connect } from 'react-redux';
import RepostForm from '../posts/RepostForm';


const Routes = ({isAuthenticated}) => {
  return (
    <section className='container'>
      <Alert />
      {isAuthenticated && (
        <Fragment>
        <DashboardNavBar />
        <DashboardWidgets />
        </Fragment>
      )}
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/news' component={Dashboard} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/explore' component={NewFeedWidget} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <PrivateRoute exact path='/repost/:id' component={RepostForm} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Routes);