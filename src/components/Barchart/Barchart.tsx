import * as d3 from 'd3'
import {useRef, useEffect} from 'react'

interface PropsInterface {
  data: number[]
}
interface marginInterface {left:number,
    right: number,
    top:number,
    bottom:number
    }

    export const Barchart: React.FC<PropsInterface> = ({data}) => {
  const svgRef = useRef(null)

  const margin: marginInterface = {left:50,
    right: 50,
    top: 50,
    bottom:50
    }

    const svgHeight = 500
    const svgWidth = 800

    const drawBarChart = ():void => {
      const SVG = d3.select(svgRef.current)
      SVG.attr('width', svgWidth)
      .attr('height', svgHeight)

      SVG.selectAll('rect')
      .remove()
      const xScale = d3.scaleLinear()
        .domain([0,data.length])
        .range([margin.left, svgWidth - margin.right])
      const yScale = d3.scaleLinear()
        .domain([0,Math.max(...data) + 2])
        .range([svgHeight - margin.bottom, margin.top])

      SVG.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: number, i: number) => xScale(i))
      .attr('y', (d: number) => yScale(d))
      .attr('width', (d: number) => svgWidth / data.length - 10)
      .attr('height', (d: number) => svgHeight - margin.bottom - yScale(d))
      .attr('fill', 'navy')
    }

    useEffect(():void => drawBarChart() , [data])

  return <>
      <svg ref={svgRef}></svg>
  </>
}
