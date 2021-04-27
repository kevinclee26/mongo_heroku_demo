// Define SVG area dimensions
var svgWidth = 1500;
// var svgHeight = 300;
var svgHeight = svgWidth/6;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.json("/all_launches_timeline").then(function(launch_data) {
  var parseTime = d3.timeParse("%Y-%q");
  // Cast the hours value to a number for each piece of tvData
  launch_data.forEach(function(d) {
    d.launch_date = parseTime(`${d._id.year}-${Math.ceil(d._id.month/3)}`);
  });

  launch_data=launch_data.sort(function(a, b) {
    return a.launch_date - b.launch_date
  })

  // Configure a time scale with a range between 0 and the chartWidth
  // Set the domain for the xTimeScale function
  // d3.extent returns the an array containing the min and max values for the property specified
  var xTimeScale = d3.scaleTime()
    .range([0, chartWidth])
    .domain(d3.extent(launch_data, data => data.launch_date));

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  // var xBandScale = d3.scaleBand()
  //   .domain(launch_data.map(d => d.name))
  //   .range([0, chartWidth])
  //   .padding(0.1);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(launch_data, d => d.launches.length)])
    // .domain([0, 5])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(4);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  var groups=chartGroup.selectAll(".patch")
                        .data(launch_data)
                        .enter()
                        .append('g')
  var patches=groups.selectAll('.patch')
                    .data(function(d) {
                      return d.launches;
                    })
                    .enter()
                    .append("svg:image")
  patches.attr("y", (d, i) => yLinearScale(i)-30)
         .attr("width", 30)
         .attr("height", 30)
         // .attr("x", function(d) {
         //    return xTimeScale(d3.select(this.parentNode).datum().launch_date) 
         // })
         .attr('x', function(d) {
           return xTimeScale(d3.select(this.parentNode).datum().launch_date)
         })
         .attr("xlink:href", d=>d);
    // .attr("class", "bar")
    // .attr("x", d => xTimeScale(d.launch_date))
    // .attr("y", d => yLinearScale(d.launches.length))
    // .attr("width", 5)
    // .attr("height", d => chartHeight - yLinearScale(d.launches.length));

}).catch(function(error) {
  console.log(error);
});
