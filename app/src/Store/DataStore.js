import { observable, action } from 'mobx'

class DataStore {

  @observable courses = {}

  @action getCourses() {
    fetch(process.env.REACT_APP_API + '/courses', { mode: 'cors' })
      .then(res => res.json()).then(courses => this.courses = courses)
  }
}

export default new DataStore()
