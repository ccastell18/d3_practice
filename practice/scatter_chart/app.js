let data = [
  [400, 200],
  [210, 140],
  [722, 300],
  [70, 160],
  [250, 50],
  [110, 280],
  [699, 225],
  [90, 220]
];

let chart_width = 800;
let chart_height = 400;
let padding = 50;

//create svg element
let svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

//create scales with accessor function(grabs certain data in an array.)
let x_scale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(data, d => {
      return d[0];
    })
  ])
  .range([padding, chart_width - padding * 2]);

let y_scale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(data, d => {
      return d[1];
    })
  ])
  .range([chart_height - padding, padding]);

let r_scale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(data, d => {
      return d[1];
    })
  ])
  .range([5, 30]);

//create circles
svg
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d => {
    //add the x scale created above
    return x_scale(d[0]);
  })
  .attr('cy', d => {
    return y_scale(d[1]);
  })
  .attr('r', d => {
    return d[1] / 10;
  })
  .attr('fill', '#D1AB0E');

//create label
svg
  .selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .text(d => {
    return d.join(' , ');
  })
  .attr('x', d => {
    return x_scale(d[0]);
  })
  .attr('y', d => {
    return y_scale(d[1]);
  });
