import './App.css'
import { useEffect, useState } from 'react'
import { AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import test from 'mobx-react'
import DataStore from './Store/DataStore'

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
          <Typography>{children}</Typography>
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
  const { courses } = DataStore
  console.log({ courses: toJS(courses) })
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className='App'>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
          <Tab label='Item One' {...a11yProps(0)} />
          <Tab label='Item Two' {...a11yProps(1)} />
          <Tab label='Item Three' {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  )
}

export default observer(App)
