import { useEffect, useState} from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import {BARCHART} from './constants/constants'
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
      <Link to={BARCHART}> Barchart horizontal </Link>
      <Switch>
      <Route path='/' exact>
        <h2>Choosa a data representation</h2>
      </Route>
      <Route path='/home' exact>
        <h2>Choosa a data representation</h2>
      </Route>
      <Route path={BARCHART} >
      <Barchart data={data} />
      </Route>
      </Switch>
    </div>
  );
}

export default App;
