var filepath = "https://raw.githubusercontent.com/virtual-data-lab/Vtuber-performance-record/main/_performance.csv";

// --------------------------------------------------------

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

// --------------------------------------------------------

var parseDate = d3.timeFormat("%Y-%m-%d");

// --------------------------------------------------------

d3.csv(filepath).then(function (data) {
  var items = data;

  var button = d3.select("#button");
  var form = d3.select("#form");
  button.on("click", querySearch("all"));
  form.on("submit", querySearch("all"));
  
  var btn_recent_published = d3.select("#btn_recent_published");
  btn_recent_published.on("click", querySearch("recent"));

  items.forEach(function(d) {
    d.publish_date = parseDate(d.publish_date);
  });

  var cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 1);

  function querySearch(stype= "all") {

    d3.select("tbody").html(""); 
    d3.event.preventDefault(); 

    var inputValue = d3.select("#user-input").property("value");

    if (stype=="all") {
      var filteredItems = items.filter(items => items["title"].includes(inputValue));
    } else {
      var filteredItems = items.filter(items => items["title"].includes(inputValue));
      // var filteredItems = items.filter(items => (items["publish_date"] >= cutoffDate));
    }


    // var output = _.sortBy(xxxxx, "avg_vote").reverse()
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
