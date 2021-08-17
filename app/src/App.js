import './App.css'
import { useEffect, useState } from 'react'
import { AppBar, Tabs, Tab, Box, Chip } from '@material-ui/core'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import DataStore from './Store/DataStore'

import Courses from "./Components/Courses"
import Predict from "./Components/Predict"
import Visualization from './Components/Visualization'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function App () {
  useEffect(() => {
    // fetch(process.env.REACT_APP_API + '/courses', { mode: 'cors' })
      // .then(res => res.json()).then(courses => setCourses(courses))
    DataStore.getCourses()
  }, [])
  console.log({ courses: toJS(DataStore.courses) })
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    console.log('here: ', !DataStore.course)
    if (!DataStore.course) return setValue(0)
    setValue(newValue)
  }
  return (
    <div className='App'>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
          <Tab label='Course Select' {...a11yProps(0)} />
          <Tab label='Predict' {...a11yProps(1)} disabled={!DataStore.course} />
          <Tab label='Visualization' {...a11yProps(2)} disabled={!DataStore.course} />
        </Tabs>
        {DataStore.course && <Chip onDelete={() => {
          DataStore.setCourse(null)
          setValue(0)
        }} label={DataStore.course} style={{ maxWidth: '230px' }} />}
      </AppBar>
      <TabPanel value={value} index={0}>
        <Courses />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Predict />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Visualization />
      </TabPanel>
    </div>
  )
}

export default observer(App)
