import React, { useRef, useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import * as d3 from 'd3';

const EmotionsChart = ({ data }) => {
  const svgRef = useRef();
  const divRef = useRef();

  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  useEffect(() => {
    const resizeChart = () => {
      if (divRef.current) {
        const { offsetWidth, offsetHeight } = divRef.current.parentElement;
        if (offsetWidth !== width) setWidth(offsetWidth);
        if (offsetHeight !== height) setHeight(offsetHeight);
      }
    };

    resizeChart(); // Initial sizing

    const handleResize = () => {
      resizeChart(); // Update dimensions on window resize
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, [width, height]);


  useEffect(() => {

    const svg = d3.select(svgRef.current);
    const radiusScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([5, Math.min(width, height) / 3]); // Adjust the bubble size range based on window size

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const pack = d3.pack()
      .size([width, height])
      .padding(5);

    const root = d3.hierarchy({ children: data })
      .sum(d => d.count);

    pack(root);

    const simulation = d3.forceSimulation(root.descendants().slice(1))
      .force('charge', d3.forceManyBody().strength(50))
          .force('center', d3.forceCenter(width / 2, (height-30) / 2))
      .force('collision', d3.forceCollide().radius(d => radiusScale(d.data.count) + 2))
      .on('tick', () => {
        bubbles
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
        labels
          .attr('x', d => d.x)
          .attr('y', d => d.y);
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
      .style('font-size', d => `${radiusScale(d.data.count) / 3}px`)
      .style('font-family', 'Chakra UI, sans-serif')
      .style('font-weight', 'normal')
      .style('fill', 'white');

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
  }, [data, width, height]);

  return (
    <Flex align="center" overflow="hidden" ref={divRef}
    >
      <svg ref={svgRef} width={width} height={height -10} ></svg>
    </Flex>
  );
};

export default EmotionsChart;
