// Build the metadata panel
function metadata(sample){ 
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    let metadata = data.metadata;
    let array = metadata.filter(sample_object=> sample_object.id == sample);
    let result = array[0];
    let sample_metadata = d3.select("#sample-metadata").html("");
    
    for (key in result){
        sample_metadata.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    }

});

};
function chart(sample){ 
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        // obtain data for the charts
        let samples = data.samples;
        let array = samples.filter(sample_object=> sample_object.id == sample);
        let result = array[0];
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

         // apply a title to the layout
        let bubble_layout = {
        title: "Bacteria Cultures Per Sample",
        margin: {t:30},
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Number of Bacteria"}
        };
        // build bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };
        // display bubble chart
        Plotly.newPlot("bubble", [trace1],{
          title: "Bacteria Cultures Per Sample",
          margin: {t:30},
          hovermode: "closest",
          xaxis: {title: "OTU ID"},
          yaxis: {title: "Number of Bacteria"}
          });

        // sort and slice data for desired graph result
        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        //build bar graph
        let trace2 = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        }
        //apply title to the layout
        let bar_layout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t:30},
            hovermode: "closest",
            xaxis: {title: "Number of Bacteria"}
            };
        // plot bar graph
        Plotly.newPlot("bar", [trace2],{
          title: "Top 10 Bacteria Cultures Found",
          margin: {t:30},
          hovermode: "closest",
          xaxis: {title: "Number of Bacteria"}
          } );

    });
    
}  

function init() {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  
      // Get the names field
  
      let sampleNames = data.names;
  
      // Use d3 to select the dropdown with id of `#selDataset`
      let selector = d3.select("#selDataset");
  
      // Use the list of sample names to populate the select options
      for (let i = 0; i < sampleNames.length; i++){
        selector
          .append("option")
          .text(sampleNames[i])
          .property("value", sampleNames[i]);
      };
  
      // Get the first sample from the list
      let firstSample = sampleNames[0];
  
      // Build charts and metadata panel with the first sample
      chart(firstSample);
      metadata(firstSample);
    });
  }
  
  // Function for event listener
  function optionChanged(newSample) {
    // Build charts and metadata panel each time a new sample is selected
  
      chart(newSample);
      metadata(newSample);
    }
  
  
  // Initialize the dashboard
  init();
  
 

