import { ScatterChart, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, Legend, Scatter } from 'recharts'
import { useEffect, useState } from 'react'
import DataStore from '../../Store/DataStore'



function ScatterGraph() {
  const [passed, setPassed] = useState([])
  const [failed, setFailed] = useState([])
  useEffect(() => {
    const { passed, failed } = DataStore.courses[DataStore.course].reduce((acc, val) => {
      const key = val.pass ? 'passed' : 'failed'
      val.minutes = Number(val.minutes)
      val.score = Math.round(Number(val.score))
      return { ...acc, [key]: [...acc[key], val] }
    }, { passed: [], failed: [] })
    setPassed(passed.sort((a, b) => a - b))
    setFailed(failed.sort((a, b) => a - b))
  }, [])
  return <div style={{ display: 'flex' }}>
    <ScatterChart width={730} height={350}
      margin={{ top: 20, right: 20, bottom: 30, left: 10 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="minutes" name="minutes" unit="min" type="number" />
      <YAxis dataKey="score" name="score" unit="%" type="number" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend verticalAlign="bottom" wrapperStyle={{position: 'relative', marginTop: '20px'}} />
      <Scatter name="likely pass" data={passed} fill="#8884d8" />
      <Scatter name="likely fail" data={failed} fill="#82ca9d" />
  </ScatterChart>
  </div>
}

export default ScatterGraph