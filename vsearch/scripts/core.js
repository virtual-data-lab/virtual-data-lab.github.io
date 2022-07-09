d3.csv(filepath).then(function (data) {
  var items = data;
  var button = d3.select("#button");
  var form = d3.select("#form");
  button.on("click", runEnter);
  form.on("submit", runEnter);
  // Defining the function
  function runEnter() {

    d3.select("tbody").html("") 
    d3.event.preventDefault(); 

    var inputValue = d3.select("#user-input").property("value");

    var filteredItems = 
    items.filter(items => items["title"].includes(inputValue));


    // var output = _.sortBy(xxxxxxxxxxxxxx, "avg_vote").reverse()
    var output = filteredItems;
    for (var i = 0; i < filteredItems.length; i++) {
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
      )

    }

  };
});
