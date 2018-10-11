let data = [];
for (let i = 0; i < 20; i++) {
  let num = Math.floor(d3.randomUniform(1, 50)());
  data.push(num);
}

let chart_width = 800;
let chart_height = 400;
let bar_padding = 5;

//create svg element
let svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

//Bind data and create bars
svg
  .selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', (d, index) => {
    return index * (chart_width / data.length);
  })
  .attr('y', d => {
    return chart_height - d * 5;
  })
  .attr('width', chart_width / data.length - bar_padding)
  .attr('height', d => {
    return d * 5;
  })
  .attr('fill', '#7ed26d');

//create labels
svg
  .selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .text(d => {
    return d;
  })
  .attr('x', (d, index) => {
    return (
      index * (chart_width / data.length) +
      (chart_width / data.length - bar_padding) / 2
    );
  })
  .attr('y', d => {
    return chart_height - d * 5 + 15;
  })
  .attr('font-size', 14)
  .attr('fill', '#fff')
  .attr('text-anchor', 'middle');
