console.log("This is plots.js");

function DrawBarChart(sampleId) {
    
    console.log(`DrawBarchart(${sampleId})`);

    d3.json("samples.json").then(data => {

        console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        console.log(result);

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        let yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`);

        let barData = {
            x: sample_values.slice(0,10),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10),
            orientation: "h"
        };

        let barArray = [barData];

        let barlayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, 1: 150 }
        }

        Plotly.newPlot("bar", barArray);

    });
}

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);
   
    d3.json("samples.json").then(data => {

    console.log(data);

    let samples = data.samples;
    let resultArray = samples.filter(s => s.id === sampleId);
    let result = resultArray[0];

    console.log(result);

    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;
    let yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`);

    let bubbleData = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode:"markers",
        marker:{color:otu_ids,size:sample_values} 
    };

    let bubbleArray = [bubbleData];

    let barlayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, 1: 150 }
    }

    Plotly.newPlot("bubble", bubbleArray);

});
}

function ShowMetaData(sampleId) {
    d3.json("samples.json").then(data => {

        console.log(data);

        let samples = data.metadata;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];
    
         console.log("MetaData; " + result);

        let panel = d3.select("#sample-metadata");

         panel.html("");

         Object.entries(result).forEach(([key,value]) => { 
             textToShow = `${key.toUpperCase()}: ${value}`; 
             panel.append("h6").text(textToShow);}); 
             console.log(textToShow)
         });
    }





function optionChanged(id) {
    console.log(`optionChanged(${id})`);

    DrawBarChart(id);
    DrawBubblechart(id);
    ShowMetaData(id);

}

function InitDashboard()
{
    console.log("Initializing Dashboard");

    let selector = d3.select("#selDataset");

    d3.json("samples.json").then(data => {

    
        let sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        let sampleId = sampleNames[0];

        DrawBarChart(sampleId);
        DrawBubblechart(sampleId);
        ShowMetaData(sampleId);
    });
}

InitDashboard();