const linkAPI = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


let dataAPI = [];

let names = [];
let samples = [];
let metadata = [];

function hBarPlotly(id){

};


function filterData(person,id){
    return person.id==id
};

function filterMetadata(firstNameID){

    personMetadata = metadata.filter(x=> filterData(x,firstNameID))
    
    let person = personMetadata[0]

    let personDetails = Object.keys(personMetadata[0])

    d3.select("#sample-metadata").html("")

    personDetails.map(x=> d3.select("#sample-metadata").append('h5').text(`${x}  :  ${person[x]}`))

}

function IndicatorPlotly(firstNameID){

    personMetadata = metadata.filter(x=> filterData(x,firstNameID))[0]

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: personMetadata['wfreq'],
            title: { text: "Belly Button Washing Frequency" },
            type: "indicator",
            mode: "gauge+number",

            gauge: {
                axis: { range: [null, 9] },
                steps: [ 
                  { range: [0, 1], color: "#D1F4E3"},
                  { range: [1, 2], color: "#B9FFDD" },
                  { range: [2, 3], color: "#A0FED0" },
                  { range: [3, 4], color: "#82FCC0" },
                  { range: [4, 5], color: "#6CFBB5" },
                  { range: [5, 6], color: "#50F8A6" },
                  { range: [6, 7], color: "#1EC574" },
                  { range: [7, 8], color: "#0CB361" },
                  { range: [8, 9], color: "#008443" }
                ]
              }
        }
    ];
    



    var layout = { margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);


}


function barPlot(firstNameID){
    let personOTU = samples.filter(x=> filterData(x,firstNameID))[0];
    console.log(personOTU)

    //personOTU.sort((a,b)=> b.sample_values-a.sample_values)
    otuIds = personOTU.otu_ids.slice(0,10).reverse();
    otuLabels = personOTU.otu_labels.slice(0,10).reverse();
    sampleValues = personOTU.sample_values.slice(0,10).reverse();

    console.log(otuIds)

    data = [{
        type: 'bar',
        text: otuLabels,
        x: sampleValues,
        y: otuIds.map(x=> `OTU : ${x} `),
        orientation: 'h'
      }];
      
      Plotly.newPlot('bar', data);
}

function bubblePlot(firstNameID){
    let personOTU = samples.filter(x=> filterData(x,firstNameID))[0];
    console.log(personOTU)

    //personOTU.sort((a,b)=> b.sample_values-a.sample_values)
    otuIds = personOTU.otu_ids;
    otuLabels = personOTU.otu_labels;
    sampleValues = personOTU.sample_values;

    var trace1 = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
          size: sampleValues,
          color: otuIds
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Marker Size',
        showlegend: false
      };
      
      Plotly.newPlot('bubble', data, layout);
}

d3.json(linkAPI).then(function(data){
    console.log(data)
    dataAPI = data;
    names = data.names;
    samples = data.samples;
    metadata = data.metadata;

    let dropDown = d3.select("#selDataset");

    // Append the name id
    data.names.map(x=> dropDown.append('option').attr("value",x).text(x))

    firstNameID = names[0];

    filterMetadata(firstNameID)
    barPlot(firstNameID)
    bubblePlot(firstNameID)
    IndicatorPlotly(firstNameID)

}
);


d3.selectAll("#selDataset").on("change", function(){

    let dd = d3.select(this)
    let id = dd.property("value")
    filterMetadata(id)
    barPlot(id)
    bubblePlot(id)
    IndicatorPlotly(id)
    })