Date.prototype.getWeek = function() {
            var onejan = new Date(this.getFullYear(),0,1);
            var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
            var dayOfYear = ((today - onejan + 86400000)/86400000);
            return Math.ceil(dayOfYear/7)
          };

console.log("raw data", data);
const nestedWeek = d3.nest()
  .key(function (d) { return d.date.getWeek(); })
  .rollup(function (values) { return {sum : d3.sum(values, d => d.value)}})
  .entries(data);

  console.log("nestedWeek", nestedWeek);

const nestedMonth = d3.nest()
  .key(function (d) { return d.date.getMonth(); })
  .rollup(function (values) { return {sum : d3.sum(values, d => d.value)}})
  .entries(data);

  console.log("nestedMonth", nestedMonth);
