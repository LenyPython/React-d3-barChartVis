import { useRef, useEffect, useState} from 'react'

function App() {
  const [data, setData] = useState<number[]>([])
  const md: {current?:JSX.Element[]} = useRef()
  const generateArray = (): number[] => new Array(20).fill(1).map((item, idx)=>Math.floor(Math.random()*idx+item))

  useEffect(():void => {
    setData(generateArray())
  }, [])

  useEffect((): void =>{
  md.current = data.map((item, idx) =>  <p key={idx}>{item}</p>)
  },[data])
  const handleClick = (): void => setData(generateArray())

  return (
    <div className="App">
      <button onClick={handleClick}>Generate new array</button>
      {md.current}
    </div>
  );
}

export default App;
