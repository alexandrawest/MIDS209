// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1060 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// scale X  --> it is a date format
var x = d3.scaleTime()
    .range([ 0, width ]);

// scale Y axis
var y = d3.scaleLinear()
          .range([ height, 0 ]);


function update(myData) {
  // scale domains based on variables
  x.domain(d3.extent(myData, function(d) { return d.date; }))
  y.domain([0, 16000]);

//append x axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append("text")
    .style("fill", "black")
    .style("font-size", "12pt")
    .text("xAxis")
    .attr("transform", `translate(${iwidth}, ${-20})`);

//append y axis
  svg.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .style("fill", "black")
    .style("font-size", "12pt")
    .text("yAxis")
    .attr("transform", `translate(${50}, 0)`);


// Add the line
  svg.append("path")
      .datum(myData)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
      );
// Add the points
  svg
      .append("g")
      .selectAll("dot")
      .data(myData)
      .enter()
      .append("circle")
      .attr("cx", function(d) { return x(d.date) } )
      .attr("cy", function(d) { return y(d.value) } )
      .attr("r", 5)
      .attr("fill", "#69b3a2");

}

var myData = d3.csv("https://raw.githubusercontent.com/alexandrawest/MIDS209/master/Assignment%201%20-%20Alex%20West/steps1.csv",
          function(d){return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
        },

update(myData);
