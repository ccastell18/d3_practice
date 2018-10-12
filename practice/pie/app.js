// Data
var data = [35, 6, 20, 47, 19];
var chart_width = 600;
var chart_height = 600;
let color = d3.scaleOrdinal(d3.schemeCategory10);

//pie layout
let pie = d3.pie();

//Arc
let outer_radius = chart_width / 2;
//for pie chart
//let inner_radius = 0
//for donut chart, inner radius can be any number smaller than the outer radius
let inner_radius = 200;
let arc = d3
  .arc()
  .innerRadius(inner_radius)
  .outerRadius(outer_radius);

//create svg element
let svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

//groups
let arcs = svg
  .selectAll('g.arc')
  .data(pie(data))
  .enter()
  .append('g')
  .attr('class', 'arc')
  .attr(
    'transform',
    'translate(' + outer_radius + ',' + chart_height / 2 + ')'
  );

//Arcs

arcs
  .append('path')
  .attr('fill', function(d, i) {
    return color(i);
  })
  .attr('d', arc);

//labels
arcs
  .append('text')
  .attr('transform', function(d, i) {
    return 'translate(' + arc.centroid(d) + ')';
  })
  .attr('text-anchor', 'text-middle')
  .text(function(d) {
    return d.value;
  });
