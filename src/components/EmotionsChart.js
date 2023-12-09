import React, { useRef, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import * as d3 from 'd3';

const EmotionsChart = ({ data }) => {
  const svgRef = useRef();
  let width = window.innerWidth; // Adjust as needed
  let height = window.innerHeight; // Adjust as needed

  if (width > 670) {
    width = 670;
  }
  if (height > 400) {
    height = 400;
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const radiusScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([5, Math.min(width, height) / 7]); // Adjust the bubble size range based on window size


    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const pack = d3.pack()
      .size([width, height])
      .padding(5);

    const root = d3.hierarchy({ children: data })
      .sum(d => d.count);

    pack(root);

    const simulation = d3.forceSimulation(root.descendants().slice(1))
      .force('charge', d3.forceManyBody().strength(50))
      .force('center', d3.forceCenter(width/2, height/2))
      .force('collision', d3.forceCollide().radius(d => radiusScale(d.data.count) + 2))
      .on('tick', () => {
        bubbles
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
        labels
          .attr('x', d => d.x)
          .attr('y', d => d.y)
          .style('font-size', d => `${radiusScale(d.data.count) / 3}px`) // Adjust font size based on bubble size
          .style('font-family', 'Chakra UI, sans-serif') // Set font family to Chakra UI's font
          .style('font-weight', 'normal') // Set font weight
          .style('fill', 'white'); // Set text color to white
      });

    const bubbles = svg.selectAll('.bubble')
      .data(root.descendants().slice(1))
      .enter().append('circle')
      .attr('class', 'bubble')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => radiusScale(d.data.count))
      .style('fill', d => colorScale(d.data.emotion))
      .style('opacity', 0.7)
      .call(drag(simulation));

    const labels = svg.selectAll('.label')
      .data(root.descendants().slice(1))
      .enter().append('text')
      .attr('class', 'label')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .text(d => d.data.emotion)
      .style('font-size', d => `${radiusScale(d.data.count) / 3}px`) // Set initial font size based on bubble size
      .style('font-family', 'Chakra UI, sans-serif') // Set font family to Chakra UI's font
      .style('font-weight', 'normal') // Set font weight
      .style('fill', 'white'); // Set text color to white

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    return () => {
      svg.selectAll('.bubble').remove();
      svg.selectAll('.label').remove();
    };
  }, [data]);

  return (
    <Flex align="center" overflow="hidden"
    >
      <svg ref={svgRef} width={width} height={height}></svg>
    </Flex>
  );
};

export default EmotionsChart;
