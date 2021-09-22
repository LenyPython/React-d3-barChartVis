import { useEffect, useState} from 'react'
import { Barchart } from './components/Barchart/Barchart'

function App() {
  const [data, setData] = useState<number[]>([])
  const generateArray = (): number[] => new Array(20).fill(1).map((item, idx)=>Math.floor(Math.random()*idx+item))

  useEffect(():void => {
    setData(generateArray())
  }, [])

  const handleClick = (): void => setData(generateArray())

  return (
    <div className="App">
      <button onClick={handleClick}>Generate new array</button>
      {data}
      <br />
      <Barchart data={data} />
    </div>
  );
}

export default App;
