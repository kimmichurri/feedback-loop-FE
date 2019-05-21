import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Header from '../../components/Header/Header';
import Question from '../../components/Question/Question'
import shortid from 'shortid'

export class NewSurvey extends Component {
  constructor() {
    super();
    this.state = {
      surveyName: '',
      surveyExpiration: new Date(),
      questions: [],
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
    const { name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleDate = (date) => {
    console.log(date)
    this.setState({
      surveyExpiration: date
    })
  }

  updateQuestions = (newQuestion) => {
    console.log(newQuestion)
    if(this.state.questions.length) {
      const updatedQuestions = this.state.questions.map(question => {
        if (question.id === newQuestion.id) {
          question = newQuestion
        }
        return question
      })
      this.setState({
        questions: updatedQuestions
      })
    }
  }

  addQuestion = () => {
    this.setState({
      questions: [...this.state.questions, { id: shortid() }]
    })
  }

  displayQuestion = (question) => (
    <Question 
      key={question.id} 
      {...question}
      updateQuestions={this.updateQuestions} />
  )
  
  render() {

    let questionCards
    if (this.state.questions.length) {
      questionCards = this.state.questions.map(question => this.displayQuestion(question))
    }

    return(
      <div>
        <Header />
        <form onSubmit={this.handleSubmit} className='new-survey-landing-form'>
          <label className="begin-create-survey-label">
            Survey Name:
            <input 
              type="text"
              name="surveyName"
              value={this.state.surveyName}
              onChange={this.handleChange}
            />
            <DatePicker 
              selected={this.state.surveyExpiration}
              onChange={this.handleDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="Time"
            />
          </label>
          <label className="begin-create-survey-label">
            Expiration Date:
          </label>
        </form>
        {questionCards}
        <button className="begin-new-survey-button">ok</button>
        <button className="begin-new-survey-button" onClick={this.addQuestion}>Add a Question</button>
      </div>
    )
  }
}