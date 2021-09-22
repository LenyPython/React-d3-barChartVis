import { useRef, useEffect, useState} from 'react'
import * as d3 from 'd3'

function App() {
  const [data, setData] = useState<number[]>([])
  const svgRef = useRef(null)
  const generateArray = (): number[] => new Array(20).fill(1).map((item, idx)=>Math.floor(Math.random()*idx+item))

  useEffect(():void => {
    setData(generateArray())
  }, [])

  const handleClick = (): void => setData(generateArray())

  return (
    <div className="App">
      <svg ref={svgRef}></svg>
      <button onClick={handleClick}>Generate new array</button>
      {data}
    </div>
  );
}

export default App;
