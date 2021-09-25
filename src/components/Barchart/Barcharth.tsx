import * as d3 from 'd3'
import {useRef, useEffect} from 'react'
import { MARGIN as margin } from '../../constants/constants'

interface PropsInterface {
  data: number[]
}

export const Barcharth: React.FC<PropsInterface> = ({data}) => {
const svgRef = useRef(null)

const svgHeight = 500
const svgWidth = 800

useEffect(():void =>{
      const SVG = d3.select(svgRef.current)
      SVG.attr('width', svgWidth)
      .attr('height', svgHeight)

      SVG.selectAll('rect')
      .remove()
      SVG.selectAll('g')
      .remove()

      const xScale = d3.scaleLinear()
        .domain([0,d3.max(data)! + 1])
        .range([margin.left, svgWidth - margin.right])
      const yScale = d3.scaleLinear()
        .domain([data.length + 1,0])
        .range([svgHeight - margin.bottom, margin.top])

      const xAxis = d3.axisBottom(xScale)
      .ticks(d3.max(data))
      const yAxis = d3.axisLeft(yScale)
      .ticks(data.length + 1)
      .tickSize(15)

      SVG.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: number, i: number) => xScale(0))
      .attr('y', (d: number, i: number) => yScale(i) + (svgHeight/ data.length) / 2)
      .attr('width', (d: number) => xScale(d) - margin.right)
      .attr('height', (d: number) => svgHeight / data.length - 10)
      .attr('fill', (d: number) => d3.interpolateSinebow(d/d3.max(data)!))

      SVG.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis)
      SVG.append('g')
        .attr('transform', `translate(0,${svgHeight - margin.bottom})`)
        .call(xAxis)

    } , [data])

  return <svg ref={svgRef}></svg>
}
