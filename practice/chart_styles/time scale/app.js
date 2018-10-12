// let data = [
//   [400, 200],
//   [210, 140],
//   [722, 300],
//   [70, 160],
//   [250, 50],
//   [110, 280],
//   [699, 225],
//   [90, 220]
// ];

let chart_width = 800;
let chart_height = 400;
let padding = 50;
let data = [
  { date: '07/01/2017', num: 20 },
  { date: '07/02/2017', num: 37 },
  { date: '07/03/2017', num: 25 },
  { date: '07/04/2017', num: 45 },
  { date: '07/05/2017', num: 23 },
  { date: '07/06/2017', num: 33 },
  { date: '07/07/2017', num: 49 },
  { date: '07/08/2017', num: 40 },
  { date: '07/09/2017', num: 36 },
  { date: '07/10/2017', num: 27 }
];

//changes the date format
let time_parse = d3.timeParse('%m/%d/%Y');
//time format
let time_format = d3.timeFormat('%b %e');

//loop through each date
data.forEach((e, i) => {
  data[i].date = time_parse(e.date);
});

//create svg element
let svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

//create scales with accessor function(grabs certain data in an array.)
// let x_scale = d3
//   .scaleLinear()
//   .domain([
//     0,
//     d3.max(data, d => {
//       return d[0];
//     })
//   ])
//   .range([padding, chart_width - padding * 2]);

//time scale
let x_scale = d3
  .scaleTime()
  .domain([
    d3.min(data, d => {
      return d.date;
    }),
    d3.max(data, d => {
      return d.date;
    })
  ])
  .range([padding, chart_width - padding * 2]);

//line scale
// let y_scale = d3
//   .scaleLinear()
//   .domain([
//     0,
//     d3.max(data, d => {
//       return d[1];
//     })
//   ])
//   .range([chart_height - padding, padding]);

//time scale
let y_scale = d3
  .scaleTime()
  .domain([
    0,
    d3.max(data, d => {
      return d.num;
    })
  ])
  .range([chart_height - padding, padding]);

// let r_scale = d3
//   .scaleLinear()
//   .domain([
//     0,
//     d3.max(data, d => {
//       return d[1];
//     })
//   ])
//   .range([5, 30]);

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

//time scale
let a_scale = d3
  .scaleSqrt()
  .domain([
    0,
    d3.max(data, d => {
      return d.num;
    })
  ])
  .range([0, 25]);

//create circles
svg
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d => {
    //add the x scale created above
    return x_scale(d.date);
  })
  .attr('cy', d => {
    return y_scale(d.num);
  })
  .attr('r', d => {
    return a_scale(d.num);
  })
  .attr('fill', '#D1AB0E');

//create label
// svg
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

//time scale
svg
  .selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .text(d => {
    return time_format(d.date);
  })
  .attr('x', d => {
    return x_scale(d.date);
  })
  .attr('y', d => {
    return y_scale(d.num);
  });
