

var svg = d3.select("#my_dataviz"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin

svg.append("text")
   .attr("transform", "translate(100,0)")
   .attr("x", 50)
   .attr("y", 50)
   .attr("font-size", "24px")
   .text("Steps in 2020")

var xScale = d3.scaleBand().range([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
           .attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv("https://raw.githubusercontent.com/alexandrawest/MIDS209/master/Assignment%201%20-%20Alex%20West/steps1.csv",
// When reading the csv, I must format variables:
      function(d){return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
    };

    xScale.domain(data.map(function(d) { return d.date; }));
    yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

    g.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale))
     .append("text")
     .attr("y", height - 250)
     .attr("x", width - 100)
     .attr("text-anchor", "end")
     .attr("stroke", "black")
     .text("Date");

    g.append("g")
     .call(d3.axisLeft(yScale).tickFormat(function(d){
         return d;
     })
     .ticks(100))
     .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", "-5.1em")
     .attr("text-anchor", "end")
     .attr("stroke", "black")
     .text("Steps");

    g.selectAll(".bar")
     .data(data)
     .enter().append("rect")
     .attr("class", "bar")
     .attr("x", function(d) { return xScale(d.date); })
     .attr("y", function(d) { return yScale(d.value); })
     .attr("width", xScale.bandwidth())
     .attr("height", function(d) { return height - yScale(d.value); });
});
