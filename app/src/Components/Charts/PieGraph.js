import React, { PureComponent } from 'react';
import { PieChart, Pie, Label, Tooltip } from 'recharts';
import DataStore from '../../Store/DataStore'

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

export default class Example extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const { passed, failed } = DataStore.courses[DataStore.course].reduce((acc, val) => {
      const key = val.pass ? 'passed' : 'failed'
      val.minutes = Number(val.minutes)
      val.score = Math.round(Number(val.score))
      return { ...acc, [key]: [...acc[key], val] }
    }, { passed: [], failed: [] })
    this.setState({ data: [{ name: 'Pass', value: passed.length }, { name: 'Fail', value: failed.length }] }) 
  }

  render() {
    return (
        <PieChart width={400} height={400}>
          <Tooltip />
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={this.state.data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
          <Label value="Pass/Fail" offset={0} color="white" position="bottom" />
          </Pie>
        </PieChart>
    );
  }
}