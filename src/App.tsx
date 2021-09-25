import { useEffect, useState} from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import {
  BARCHARTV,
  BARCHARTH
} from './constants/constants'
import { Barchartv } from './components/Barchart/Barchartv'
import { Barcharth } from './components/Barchart/Barcharth'

function App() {
  const [data, setData] = useState<number[]>([])
  const generateArray = (): number[] => new Array(20).fill(1).map((item, idx)=>Math.floor(Math.random()*idx+item))

  useEffect(():void => {
    setData(generateArray())
  }, [])

  const handleClick = (): void => setData(generateArray())

  return (
    <div className="App">
      <nav>
      <button onClick={handleClick}>Generate new array</button>
      {data}
      <br />
        <ul>
          <li>
          <Link to={BARCHARTV}> Barchart vertical </Link>
          </li>
          <li>
          <Link to={BARCHARTH}> Barchart horizontal </Link>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </nav>
      <Switch>
      <Route path='/' exact>
        <h2>Choosa a data representation</h2>
      </Route>
      <Route path='/home' exact>
        <h2>Choosa a data representation</h2>
      </Route>
      <Route path={BARCHARTH} >
      <Barcharth data={data} />
      </Route>
      <Route path={BARCHARTV} >
      <Barchartv data={data} />
      </Route>
      </Switch>
    </div>
  );
}

export default App;
