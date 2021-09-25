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
      SVG.selectAll('g')
      .remove()

      const xScale = d3.scaleLinear()
        .domain([0,data.length + 1])
        .range([margin.left, svgWidth - margin.right])
      const yScale = d3.scaleLinear()
        .domain([0,d3.max(data)! + 2])
        .range([svgHeight - margin.bottom, margin.top])

      const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)
      const yAxis = d3.axisLeft(yScale)
      .ticks(d3.max(data))
      .tickSize(15)

      SVG.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: number, i: number) => xScale(i) +((svgWidth/data.length) - 5) / 2)
      .attr('y', (d: number) => yScale(d))
      .attr('width', (d: number) => svgWidth / data.length - 10)
      .attr('height', (d: number) => svgHeight - margin.bottom - yScale(d))
      .attr('fill', (d: number) => d3.interpolateSinebow(d/d3.max(data)!))

      SVG.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis)
      SVG.append('g')
        .attr('transform', `translate(0,${svgHeight - margin.bottom})`)
        .call(xAxis)
    }

    useEffect(():void => drawBarChart() , [data])

  return <svg ref={svgRef}></svg>
}
