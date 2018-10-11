//call a csv file. returns a promise
// d3.csv('data.csv').then(data => {
//   generate(data.columns);
// });

// d3.json('data.json').then(data => {
//   generate(data);
// });

d3.csv('data2.csv').then(data => {
  console.log(data);
});

function generate(dataSet) {
  //hard coded data
  //  let dataSet = [10, 20, 30, 40, 50];

  //start with selecting an item to manipulate.  class, element, or id.
  let el = d3
    .select('body')
    .selectAll('p')
    //calls info from dataset
    .data(dataSet)
    .enter()
    .append('p')
    .text(function(d) {
      return 'this paragraph is binded to the number ' + d;
    })
    //   .attr('class', 'foo')
    //   .attr('class', 'bar')
    //   .classed('foo', true)
    //   .classed('bar', true)
    //   .text('Hello World')
    .style('color', function(d) {
      if (d > 25) {
        return 'red';
      } else {
        return 'blue';
      }
    });
  console.log(el);
}
