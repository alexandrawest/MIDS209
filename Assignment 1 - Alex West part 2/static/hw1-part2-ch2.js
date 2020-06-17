var margin2 = {top: 10, right: 30, bottom: 30, left: 60},
    width2 = 1060 - margin2.left - margin2.right,
    height2 = 500 - margin2.top - margin2.bottom;

// add svg to the body of the page
// name it something other than svg (already used)
var svg2 = d3.select("#chart2")
  .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin2.left + "," + margin2.top + ")");

// Create 2 datasets
var data1 = [
  {ser1: 1, ser2: 21267},
  {ser1: 2, ser2: 37971},
  {ser1: 3, ser2: 16679},
  {ser1: 4, ser2: 30184},
  {ser1: 5, ser2: 37543},
  {ser1: 6, ser2: 31187},
  {ser1: 7, ser2: 21375},
  {ser1: 8, ser2: 22322},
  {ser1: 9, ser2: 49202},
  {ser1: 10, ser2: 29826},
  {ser1: 11, ser2: 37893},
  {ser1: 12, ser2: 32274},
  {ser1: 13, ser2: 33532},
  {ser1: 14, ser2: 36588},
  {ser1: 15, ser2: 29017},
  {ser1: 16, ser2: 31244},
  {ser1: 17, ser2: 31727},
  {ser1: 18, ser2: 33416},
  {ser1: 19, ser2: 31853},
  {ser1: 20, ser2: 36169},
  {ser1: 21, ser2: 31320}
];

var data2 = [
  {ser1: 1, ser2: 119492},
  {ser1: 2, ser2: 120210},
  {ser1: 3, ser2: 161553},
  {ser1: 4, ser2: 134170},
  {ser1: 5, ser2: 127164}
];

// Initialise X axis:
var x = d3.scaleLinear().range([0,width2]);
var xAxis = d3.axisBottom().scale(x);
svg2.append("g")
  .attr("transform", "translate(0," + height2 + ")")
  .attr("class","myXaxis")

// Initialize Y axis
var y = d3.scaleLinear().range([height2, 0]);
var yAxis = d3.axisLeft().scale(y);
svg2.append("g")
  .attr("class","myYaxis")

// Create a function that takes a dataset as input and update the plot:
function update(data) {

  // Create the X axis:
  x.domain([1, d3.max(data, function(d) { return d.ser1 }) ]);
  svg2.selectAll(".myXaxis").transition()
    .duration(1500)
    .call(xAxis);

  // create the Y axis
  y.domain([0, d3.max(data, function(d) { return d.ser2  }) ]);
  svg2.selectAll(".myYaxis")
    .transition()
    .duration(1500)
    .call(yAxis);

  // Create an update selection: bind to the new data
  var u = svg2.selectAll(".lineTest")
    .data([data], function(d){ return d.ser1 });

  // Update the line
  u
    .enter()
    .append("path")
    .attr("class","lineTest")
    .merge(u)
    .transition()
    .duration(1500)
    .attr("d", d3.line()
      .x(function(d) { return x(d.ser1); })
      .y(function(d) { return y(d.ser2); }))
      .attr("fill", "none")
      .attr("stroke", "purple")
      .attr("stroke-width", 2.5)
}

// At the beginning, I run the update function on the first dataset:
update(data1)
