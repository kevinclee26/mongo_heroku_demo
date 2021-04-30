// https://developer.mongodb.com/how-to/use-atlas-on-heroku/
// Define SVG area dimensions
var svgWidth = 800;
// var svgHeight = 300;
var svgHeight = svgWidth/4;

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
var svg = d3.select("svg")

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.json("/all_launches_timeline").then(function(launch_data) {
  var parseTime = d3.timeParse("%Y-%q");
  // Cast the hours value to a number for each piece of tvData
  launch_data.forEach(function(d) {
    d.launch_date = parseTime(`${d._id.year}-${d._id.quarter}`);
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

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(launch_data, d => d.launches.length)])
    // .domain([0, 5])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale).ticks(d3.max(launch_data, data => data._id.year)-d3.min(launch_data, data => data._id.year));
  var leftAxis = d3.axisLeft(yLinearScale).ticks(d3.max(launch_data, d => d.launches.length));

  var yScaleRange=yLinearScale.domain().slice(1).map((d, i)=>d-yLinearScale.domain()[i])
  var xScaleRange=xTimeScale.domain().slice(1).map((d, i)=>d-xTimeScale.domain()[i])
  var tick_size_y= chartHeight/yScaleRange
  var tick_size_x= chartWidth/(xScaleRange/7884000000)

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
        .attr('class', 'axis')
        .call(leftAxis);

  chartGroup.append("g")
        .attr('class', 'axis')
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

  // Create one SVG rectangle per piece of launch_data
  // Use the linear and time scales to position each rectangle within the chart
  var groups=chartGroup.selectAll(".bar")
  // chartGroup.selectAll(".patch")
                        .data(launch_data)
                        .enter()
                        .append('g')
  // groups.selectAll('.patch')
  var rectangles=groups.append('rect')
        .attr('y', d=>yLinearScale(d.launches.length))
        .attr('x', d=>xTimeScale(d.launch_date))
        .attr('width', tick_size_x)
        .attr('height', d=>chartHeight-yLinearScale(d.launches.length))
        .attr('fill', 'grey')
        .attr('fill-opacity', 0.5)

  var patches = groups.selectAll('.icon')
        .data(function(d) {
          return d.launches;
        })
        .enter()
        .append("image")
        .attr("y", (d, i) => yLinearScale(i)-tick_size_y)
        .attr("width", tick_size_x)
        .attr('height', tick_size_y)
        .attr('x', function(d) {
          // console.log(d)
          return xTimeScale(d3.select(this.parentNode).datum().launch_date)
        })
        .attr('xlink:href', function(d) {return d.mission_patch_small? d.mission_patch_small: 'https://cdn.icon-icons.com/icons2/2221/PNG/512/logo_orange_spacex_icon_134372.png'})

  // Step 1: Append a div to the body to create tooltips, assign it a class
  // =======================================================
  var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip");

  // Step 2: Add an onmouseover event to display a tooltip
  // ========================================================
  groups.selectAll('image').on("click", function(e, d) {
    toolTip.html('')
    toolTip.style("display", "block")
           .style("left", (event.pageX - 50) + "px")
           .style("top", (event.pageY - 100 )+ "px")
    toolTip.append('p')
           .text(d.mission_name)
    toolTip.append('img')
           .attr('class', 'tipImage')
           .attr('src', d.mission_patch)
    toolTip.append('hr')
    toolTip.append('a')
            .attr('href', d.wikipedia)
            .attr('target', '_blank')
            .append('p')
            .text('Wikipedia')
    toolTip.append('a')
            .attr('href', d.video_link)
            .attr('target', '_blank')
            .append('p')
            .text('Youtube')
    })
    // Step 3: Add an onmouseout event to make the tooltip invisible
  toolTip.on("mouseleave", function() {
    toolTip.style("display", "none");
  });
}).catch(function(error) {
  console.log(error);
});
