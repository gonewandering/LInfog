/* Lindsay Silver Linfo Graphic Class. Requires D3 */

function LInfog() {
    this.width = 200;
    this.height = 200;
    this.colors = ["#36bcc3", "#95f400", "#ef4c23", "#ed24d6", "#007180", "#d91f27"];
    
    this.gauge = function (selector, perc, color, size, label) { 
        var self = this;
        
        this.width = size;
        this.height = this.width; 
        this.radius = this.width/2;
        
        this.perc = perc;
        this.data = [
            {"color":"#999", "value":100-perc, "opacity":.3}, 
            {"color":color, "value":perc, "label": label, "opacity":1}
        ];
    
        this.create = function () { 
            this.vis = d3.select(selector)
                .append("svg:svg")
                .data([this.data])
                .attr("width", this.width)
                .attr("height", this.height)
                .append("svg:g")
                .attr("transform", "translate(" + this.radius + "," + this.radius + ")")
        
            this.arc = d3.svg.arc()
                .innerRadius(this.radius*.7)
                .outerRadius(this.radius);
        
            this.pie = d3.layout.pie().value(function(d) { return d.value; });
        
            this.arcs = this.vis.selectAll("g.slice")
                .data(this.pie)
                .enter()
                .append("svg:g")
                    .attr("class", "slice");
        
            this.arcs.append("svg:path")
                .attr("fill", function(d, i) { return self.data[i].color; } )
                .style("opacity", function(d, i) { return self.data[i].opacity; })
                .attr("d", this.arc);
            
            if (label) {      
                this.arcs.append("svg:text")
                    .attr("text-anchor", "middle") //center the text on it's origin
                    .attr("transform", "translate(0,"+Math.round(this.width/20)+")")
                    .style("font-size", Math.round(this.width/4)+"px")
                    .style("font-weight", "bold")
                    .style("fill", function () { return self.data[1].color; })
                    .text(function(d, i) { return self.data[1].value+"%"; });
                            
                this.arcs.append("svg:text")
                    .attr("class", "small-text")
                    .attr("text-anchor", "middle") //center the text on it's origin
                    .attr("transform", "translate(0,"+(this.width*.3/2)+")")
                    .style("font-size", Math.round(this.width*.1)+"px")
                    .style("fill", "#999")
                    .text(function(d, i) { return self.data[1].label; });
            } else { 
                this.arcs.append("svg:text")
                    .attr("text-anchor", "middle") //center the text on it's origin
                    .attr("transform", "translate(0,"+Math.round(this.width/12)+")")
                    .style("font-size", Math.round(this.width/4)+"px")
                    .style("font-weight", "bold")
                    .style("fill", function () { return self.data[1].color; })
                    .text(function(d, i) { return self.data[1].value+"%"; });            
            }           
            return this; 
        }; return (this.create());
    }
    
    this.pie = function (selector, data, size, label) { 
        var self = this;
              
        this.data = data;
        this.selector = selector;
        this.label = label;
        this.width = size;
        if (label) { this.height = this.width*1.05; } else { this.height = this.width; } 
        if (label) { this.radius = ((this.width-(this.width*.1))/2); } else { this.radius = this.width/2; }
    
        this.create = function () { 
        
            this.vis = d3.select(this.selector)
                .append("svg:svg")
                .data([this.data])
                .attr("width", this.width)
                .attr("height", this.height)
                .append("svg:g")
                .attr("transform", "translate(" + this.radius + "," + this.radius + ")");
        
            this.arc = d3.svg.arc()
                .innerRadius(this.radius*.4)
                .outerRadius(this.radius);
        
            this.pie = d3.layout.pie().value(function(d) { return d.value; });
        
            this.arcs = this.vis.selectAll("g.slice")
                .data(this.pie)
                .enter()
                .append("svg:g")
                .attr("class", "slice");
        
            this.arcs.append("svg:path")
                .attr("fill", function(d, i) { return self.data[i].color; } )
                .style("opacity", function(d, i) { return self.data[i].opacity; })
                .attr("d", this.arc);
        
            this.arcs.append("svg:text")
                .attr("text-anchor", "middle") //center the text on it's origin
                .attr("transform", function(d) {
                    d.innerRadius = self.radius*.3;
                    d.outerRadius = self.radius;
                    return "translate(" + self.arc.centroid(d) + ")";
                })
                .style("font-size", Math.round(this.width/10)+"px")
                .style("font-weight", "bold")
                .style("opacity", ".5")
                .style("fill", "white")
                .text(function(d, i) { return self.data[i].value+"%"; });
                        
            this.arcs.append("svg:text")
                .attr("class", "small-text")
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    d.innerRadius = self.radius*.3;
                    d.outerRadius = self.radius;
                    var cent = self.arc.centroid(d);
                    cent[1] = cent[1]+(self.width*.08);
                    return "translate(" + cent + ")";
                })
                .style("font-size", Math.round(this.width*.07)+"px")
                .style("fill", "white")
                .style("opacity", ".6")
                .text(function(d, i) { return self.data[i].label; });
                
            this.vis.append("svg:text")
                .attr("class", "small-text")
                .attr("text-anchor", "middle")
                    .attr("transform", "translate(0,"+(Math.round(this.width/2)+(this.width*.05))+")")
                .style("font-size", Math.round(this.width*.1)+"px")
                .style("fill", "black")
                .text(function(d, i) { return self.label; });
                
            return this; 
        };
        return (this.create());
    }
}
