// siteGraph.js

function createPopularBooksGraph(data) {

    // convert {Author,Count} objects to array of values
    var countValuesArr = Array.from(data, function(b){return b.Count});
    // find the max and create scale
    var max = d3.max(countValuesArr);
    var scale = d3.scale.linear().domain([0, max]).range([0, 100]);

    // for each table row, add div to act as the graph bin
    var g = d3.select("#authors-table").selectAll("tr td:nth-child(2)").data(data)
        .append("div").attr("class", "graph-bar").style("width", function (d, i) {
            return (scale(d.Count)).toString() + "%";
        });
}

function createPopularUsersGraph(data) {

    var width = 400,
        height = 400,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#a05d56", "#6b486b", "#ff8c00", "#98abc5", "#8a89a6", "#d0743c", "#7b6888"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) { return d.Count; });

    var svg = d3.select("#popular-users-graph").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    data.forEach(function (d) {
        d.Count = +d.Count;
    });

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) { return color(d.data.Name); });

    g.append("text")
        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function (d) { return d.data.Name; });
}