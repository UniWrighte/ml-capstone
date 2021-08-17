import DataStore from "../Store/DataStore"
import { Card, Select, MenuItem, TextField, Button } from "@material-ui/core"
import { useState } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'

const Plate = ({ children }) => {
  return <Card style={{ display: 'flex', flexDirection: 'row', height: '100%', alignItems: 'center', width: '50vw', justifyContent: 'center' }}>
    <div>{children}</div>
  </Card>
}

function Predict () {
  const [select, setSelect] = useState("default")
  const [input, setInput] = useState(0)
  return <div style={{ display: 'flex', justifyContent: 'space-between', height: '80vh' }}>
    <Plate>
      <h1>{DataStore.course}</h1>
      <div>course</div>
    </Plate>
    <Plate>
    { DataStore.prediction !== null && <h2>Prediction: <span style={{ color: DataStore.prediction ? 'green' : 'red' }}>{DataStore.prediction ? 'PASS' : 'FAIL'}</span></h2> }
    <h3>Select Student: </h3>
    <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      value={select}
      onChange={e => {
        DataStore.resetPrediction()
        setSelect(e.target.value)
        setInput(DataStore.courses[DataStore.course].find(student => student.uid === e.target.value).minutes)
      }}
      style={{ minWidth: '100px' }}
    >
      <MenuItem value="default" >
       <em>None</em>
      </MenuItem>
      {(DataStore.courses[DataStore.course] || []).map((student, i) => {
        return <MenuItem key={i} value={student.uid}>
          {`${student.firstName} ${student.lastName}`}
        </MenuItem>
      })}
    </Select>
    <div>or</div>
    <h3>Enter minutes to predict outcome:</h3>
    <TextField 
      inputProps={{min: 0, style: { textAlign: 'center' }}}
      onChange={e => {
        DataStore.resetPrediction()
        setInput(e.target.value)
      }} type="number" value={input} />
    <br />
    <br />
    <Button onClick={() => {
      DataStore.getPrediction(input)
    }} color="primary" variant="outlined">predict</Button>
    </Plate>
  </div>
}

export default observer(Predict)
