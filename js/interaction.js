function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}
//testing stuff

$( document ).ready(function() {
showExample();
addTimeline();    
});

function showExample(){
 
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 200,
    height = 100;
var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height,0]);
    

var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(4)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .ticks(4)
    .orient("left");

var area = d3.svg.area()
    .x(function(d) { return x(d.JAHR); })
    .y0(height)
    .y1(function(d) { return y(d.INDIKATOR_WERT); });
    
    var valueline = d3.svg.line()
    .x(function(d) { return x(d.JAHR); })
    .y(function(d) { return y(d.INDIKATOR_WERT); });

var svg = d3.select("#test").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv('../data.csv', function(error, data) {
  if (error) throw error;
    
    var districtName;
    
    //filter NaN entries
    var filteredData = data.filter(function(a){
        if( !isNaN(a.INDIKATOR_WERT) && a.INDIKATOR_WERT > 0 && a.NUMMER == 7 )
            { 
                return a;
            } 
    });

   
    
    //alert(data[0].INDIKATOR_WERTT);
    //was das hier??
  filteredData.forEach(function(d) {
    districtName = d.NAME;
      
    console.log(d.INDIKATOR_AUSPRAEGUNG);  
      
    d.JAHR = (d.JAHR);
    d.INDIKATOR_WERT = +d.INDIKATOR_WERT;
  });

  x.domain(d3.extent(filteredData, function(d) { return d.JAHR; }));   
  y.domain([0, d3.max(filteredData, function(d) { return d.INDIKATOR_WERT; })]);
 
  
    d3.select("#districtName").html(districtName.substr(3));
  

  svg.append("path")
      .datum(filteredData)
      .attr("class", "area")
      .attr("d", area);
    
 // Add the valueline path.
    svg.append("path")
        .attr("class", "arealine")
        .attr("d", valueline(filteredData))
    
  /*svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
      */

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
    
    svg.append("text")
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height+margin.bottom-5) + ")")
        .style("text-anchor", "middle")
        .text("Average age (since "+ d3.min(filteredData, function(d) { return d.JAHR; }) +")");
    
});   
}

function addTimeline(){
 for(var i=2015; i> 2000; i--){    
    $('#timeline').append('<li>'+i+'</li>');   
 }
    
   
}