import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'
import Header from '../../components/Header/Header'
import InstructorDashboard from '../Dashboard/InstructorDashboard'
import Login from '../Login/Login'
import PageNotFound from '../../components/PageNotFound/PageNotFound'
import NewSurvey from '../NewSurvey/NewSurvey';
import RecipientForm from '../RecipientForm/RecipientForm'
import StudentDashboard from '../StudentDashboard/StudentDashboard'
import StudentSurvey from '../StudentSurvey/StudentSurvey'
import { fetchCohorts } from '../../thunks/fetchCohorts'

export class App extends Component {
  componentDidMount() {
    this.props.fetchCohorts()
  }

  render() {
    return (
      <div className="App">
        <div>
          <Header />
        </div>
        <div className="route-container">
          <Switch>
            <Route exact path='/' component={Login}
            />
            <Route exact path='/dashboard' component={InstructorDashboard}
            />
            <Route exact path='/new-survey' component={NewSurvey}
            />
            <Route exact path='/student-dashboard' component={StudentDashboard}
            />
            <Route path='/student-survey' component={StudentSurvey}
            />
            <Route exact path='/recipients' component={RecipientForm}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  fetchCohorts: PropTypes.func
}

export const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  error: state.error
})

export const mapDispatchToProps = (dispatch) => ({
  fetchCohorts: () => dispatch(fetchCohorts()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
