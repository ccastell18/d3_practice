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

//line scale
let y_scale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(data, d => {
      return d[1];
    })
  ])
  .range([chart_height - padding, padding]);

//line scale with sqrt
// let a_scale = d3
//   .scaleSqrt()
//   .domain([
//     0,
//     d3.max(data, d => {
//       return d[1];
//     })
//   ])
//   .range([0, 25]);

//clip Paths
svg
  .append('clipPath')
  .attr('id', 'plot-area-clip-path')
  .append('rect')
  .attr('x', padding)
  .attr('y', padding)
  .attr('width', chart_width - padding * 3)
  .attr('height', chart_height - padding * 2);
//create  x axis
let x_axis = d3
  .axisBottom(x_scale)
  // .ticks(6);
  .tickValues([0, 150, 250, 600, 700]);
//call is used to bring in the x_axis to the group.
svg
  .append('g')
  .attr('class', 'x-axis')
  .attr('transform', 'translate(0,' + (chart_height - padding) + ')')
  .call(x_axis);

//create y axis
let y_axis = d3.axisLeft(y_scale).ticks(5);
// .tickFormat(d => {
//   return d + '%';
// });
svg
  .append('g')
  .attr('class', 'y-axis')
  .attr('transform', 'translate(' + padding + ',0)')
  .call(y_axis);

svg
  //appending group for the clip path to stop the circles from overlapping.
  .append('g')
  .attr('id', 'plot-area')
  .attr('clip-path', 'url(#plot-area-clip-path')
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
  // .attr('r', d => {
  //   return a_scale(d[1]);
  .attr('r', 15)
  .attr('fill', '#D1AB0E');

//create label
// svg
//   .append('g') //add group to label because axis provides a text element and erases the labels.
//   .selectAll('text')
//   .data(data)
//   .enter()
//   .append('text')
//   .text(d => {
//     return d.join(' , ');
//   })
//   .attr('x', d => {
//     return x_scale(d[0]);
//   })
//   .attr('y', d => {
//     return y_scale(d[1]);
//   });

d3.select('button').on('click', () => {
  //create random data
  data = [];
  let max_num = Math.random() * 1000;
  for (let i = 0; i < 8; i++) {
    let new_x = Math.floor(Math.random() * max_num);
    let new_y = Math.floor(Math.random() * max_num);
    data.push([new_x, new_y]);
  }
  //update scales
  x_scale.domain([
    0,
    d3.max(data, d => {
      return d[0];
    })
  ]);
  y_scale.domain([
    0,
    d3.max(data, d => {
      return d[1];
    })
  ]);
  svg
    .selectAll('circle')
    .data(data)
    .transition()
    .duration(1000)
    .on('start', () => {
      console.log('transition started!');
    })
    .attr('cx', d => {
      //add the x scale created above
      return x_scale(d[0]);
    })
    .attr('cy', d => {
      return y_scale(d[1]);
    })
    .on('end', () => {
      console.log('transition ended');
    });
  //update axis
  svg
    .select('.x-axis')
    .transition()
    .duration(1000)
    .call(x_axis);

  svg
    .select('.y-axis')
    .transition()
    .duration(1000)
    .call(y_axis);
});
