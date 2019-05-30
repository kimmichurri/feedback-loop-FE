import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGet } from '../../thunks/handleGet'
import StudentSurvey from '../StudentSurvey/StudentSurvey'
import StudentResult from '../StudentResult/StudentResult'
import { setStudentSurveys } from '../../actions/'
import { setClosedSurveys } from '../../actions/'
import PropTypes from 'prop-types'
import Surveys from '../../utils/sampleSurveys'

export class StudentDashboard extends Component {

  async componentDidMount() {
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/pending?api_key=${localStorage.getItem('currentUser')}`
    const closedUrl = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/closed?api_key=${localStorage.getItem('currentUser')}`
    const surveys = await this.props.handleGet(url)
    const closedSurveys = await this.props.handleGet(closedUrl)
    this.props.setStudentSurveys(surveys)
    this.props.setClosedSurveys(closedSurveys)
  }

  renderSurvey = (survey) => {
    this.props.history.push(`/student-survey/${survey.id}`)
    return <StudentSurvey key={survey.id} />
  }

  render() {
    let surveyButtons
    if (this.props.studentSurveys) {
      surveyButtons = this.props.studentSurveys.map(survey => {
        return <button className='response-button' key={survey.id} onClick={() => {this.renderSurvey(survey)}}>{survey.surveyName}</button>
      })
    }

    return(
      <div className='dashboard-container'>
        <article className='pending-student-surveys'>
          {surveyButtons}
        </article>
        <article className='pending-student-surveys'>
          {this.props.closedSurveys && this.props.closedSurveys.map(survey => {
            return <StudentResult key={survey.id}
                           survey={survey}/>
          })}
        </article>
      </div>
     )
  }
}

StudentDashboard.propTypes = {
  user: PropTypes.string,
  studentSurveys: PropTypes.array,
  handleGet: PropTypes.func,
  setStudentSurveys: PropTypes.func
}

export const mapStateToProps = (state) => ({
  user: state.user,
  studentSurveys: state.studentSurveys,
  closedSurveys: state.closedSurveys
})

export const mapDispatchToProps = (dispatch) => ({
  handleGet: (url) => dispatch(handleGet(url)),
  setStudentSurveys: (surveys) => dispatch(setStudentSurveys(surveys)),
  setClosedSurveys: (closedSurveys) => dispatch(setClosedSurveys(closedSurveys))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)
