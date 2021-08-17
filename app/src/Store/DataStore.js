import { observable, action } from 'mobx'

class DataStore {
  @observable courses = {}
  @observable course = null
  @observable prediction = null

  constructor() {
    this.baseURL = process.env.REACT_APP_API
  }

  @action
  getCourses() {
    fetch(`${this.baseURL}/courses`, { mode: 'cors' })
      .then(res => res.json()).then(({ courses }) => {
        this.courses = courses
      })
  }
  @action
  setCourse(course) {
    this.course = course
  }
  @action
  getPrediction(minutes) {
    fetch(`${this.baseURL}/ml?minutes=${minutes}${this.course ? `&course=${this.course}` : ''}`)
      .then(res => res.json()).then(({ passPrediction }) => {
        this.prediction = passPrediction === 'True'
      })
  }
  @action
  resetPrediction() {
    this.prediction = null
  }
}

export default new DataStore()
