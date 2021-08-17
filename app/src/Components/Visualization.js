import ScatterGraph from "./Charts/ScatterGraph";
import BarGraph from "./Charts/BarGraph";
import PieGraph from "./Charts/PieGraph"

function Visualization () {
  return <div style={{ padding: '40px' }}>
    <div style={{ display: 'flex' }}>
      <ScatterGraph />
      <PieGraph />
    </div>
    <div>
      <BarGraph />
    </div>

  </div>
}

export default Visualization