var filepath = "https://raw.githubusercontent.com/virtual-data-lab/Vtuber-performance-record/main/_performance.csv";

function create_link_item(dtype, key, lbl) {
  tmp_a = "";

  if (dtype=="YT") {
    tmp_a += '<a target="_blank" href="' + "https://www.youtube.com/channel/";
    tmp_a += (key) + '">' + lbl + "</a>";

  } else if (dtype=="video") {
    tmp_a += '<a target="_blank" href="' + "https://youtu.be/";
    //     tmp_a += '<a target="_blank" href="' + "";
    tmp_a += (key) + '">' + lbl + "</a>";
  }

  return(tmp_a);
}


function create_td_item(content) {
  tmp_td = "<td>" + (content) + "</td>"

  return(tmp_td);
}

function create_img_item(url) {
  tmp_img = "";


  tmp_img += '<img src="' + (url) + '" width= "150cm" />';

  return(tmp_img);
}


d3.csv(filepath).then(function (data) {
  var movies = data;
  var button = d3.select("#button");
  var form = d3.select("#form");
  button.on("click", runEnter);
  form.on("submit", runEnter);
  // Defining the function
  function runEnter() {

    // This line of code selects the <tbody> from the html and clears it. If this is not used, then the results would appear on top of the previous result.
    d3.select("tbody").html("") 

    // This code is needed to prevent the page from reloading.
    d3.event.preventDefault(); 

    // This code will get the user's input from what the user will type in the html <input> since we assigned it the "user-input" id. It will get the value and store it in our inputValue variable
    var inputValue = d3.select("#user-input").property("value");

    // This code will filter the movies looking at the actors column. It will store the values when there is a match from the text sequence the user entered and the text from our actors column from the CSV data.
    var filteredMovies = 
    movies.filter(movies => movies["title"].includes(inputValue));


    // var output = _.sortBy(filteredMovies, "avg_vote").reverse()
    var output = filteredMovies;
    // Once I had all the values in my output variable, all I needed was to loop through them and add them to the table one by one. This was done using d3, where I inserted the value for each one of the columns I wanted using the necessary html to fit each table row.
    for (var i = 0; i < filteredMovies.length; i++) {
      d3.select("tbody").insert("tr").html(
        create_td_item( [i+1] ) +

        // videoId,title,lengthSeconds,channelId,author,keywords,publish_date,official
        create_td_item( create_img_item(output[i]["thumbnail"]) ) +
        create_td_item( output[i]["title"] ) +
        create_td_item( create_link_item("video", output[i]["videoId"], "傳送門") ) +
        create_td_item( output[i]["author"] ) +
        create_td_item( create_link_item("YT", output[i]["channelId"], "頻道") ) +
        create_td_item( output[i]["publish_date"] ) +
        create_td_item( output[i]["official"] )
        // create_td_item( output[i]["Display Name"] ) +
        // create_td_item( output[i]["Alias Names"] ) +
        // create_td_item( create_link_item("YT", output[i]["Youtube Channel ID"], "頻道") ) +
        // create_td_item( output[i]["Graduation Date"] ) 
      )


      // "<td>" + (output[i]["Display Name"]) + "</td>" + 
      // "<td>" + (output[i]["Alias Names"]) + "</td>" +
      // // "<td>" + '<a href="https://www.youtube.com/channel/' + (output[i]["Youtube Channel ID"]) +'">頻道</a>' + "</td>" +
      // "<td>" + create_link_item("YT", output[i]["Youtube Channel ID"], "頻道") + "</td>" +
      // "<td>" + (output[i]["Debut Date"]) + "</td>" +
      // "<td>" + (output[i]["Graduation Date"]) + "</td>" ) 

      // "<td>" + (output[i]["original_title"])+"</a>"+"</td>" + 
      // "<td>" + (output[i]["avg_vote"])+"</td>" +
      // "<td>" + (output[i]["year"])+"</td>" +
      // "<td>" + (output[i]["description"])+"</td" ) }
    }

  };
});
