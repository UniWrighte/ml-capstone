import { observer } from 'mobx-react'
import DataStore from '../Store/DataStore'
import { Card } from '@material-ui/core'
import '../style/Courses.css'

function Courses () {
  const { courses } = DataStore
  return <div>
    <h1> Course Selection </h1>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.keys(courses).map((course, i) => {
        const extraStyle = DataStore.course === course ? { backgroundColor: '#3f51b5', color: 'white' } : {}
        return <Card onClick={e => {
          DataStore.setCourse(course)
        }} className='card' key={i} style={{ padding: '40px', margin: '40px', width: '200px', ...extraStyle }}>
          <h2>{course}</h2>
          <div>students: {courses[course].length}</div>
        </Card>
      })}
    </div>
  </div>
}

export default observer(Courses)