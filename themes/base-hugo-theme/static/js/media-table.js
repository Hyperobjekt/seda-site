/**
 * Google Sheets-backed media table
 */
function createMediaTable(oneLastUpdated, oneRowCount, lastUpdated, rows) {
  var updatedOne = Date.parse(oneLastUpdated.slice(0, 10));
  var updatedTwo = Date.parse(lastUpdated.slice(0, 10));
  var dateNum = updatedOne >= updatedTwo ? updatedOne : updatedTwo;
  var updatedDate = new Date(dateNum);
  var updatedStr = updatedDate.toLocaleDateString("en-US");

  $("#lastUpdated").html(updatedStr);
  $("#numLocalStories").html(oneRowCount.toLocaleString());
  $("#numNationalStories").html(rows.length.toLocaleString());

  $("#national-media-table").append("<tbody></tbody>");
  var tbody = $("#national-media-table tbody");
  var colNames = ["Title", "Description", "Date", "Outlet"];
  var props = ["title", "description", "date", "outlet"];
  var headerRow = $("<tr></tr>");
  for (var i = 0; i < colNames.length; ++i) {
    headerRow.append("<th>" + colNames[i] + "</th>");
  }
  tbody.append(headerRow);

  for (var i = 0; i < rows.length; ++i) {
    var tr = $("<tr></tr>");
    for (var pi = 0; pi < props.length; ++pi) {
      if (props[pi] === "title") {
        var td = $("<td><a href='" + rows[i].link + "' target='_blank'>" + rows[i].title + "</a></td>")
      } else {
        var td = $("<td>" + rows[i][props[pi]] + "</td>");
      }
      tr.append(td);
    }
    tbody.append(tr);
  }
}

/**
 * Loading Google Sheets national media table, set up map embed
 */

$(document).ready(function () {
  var SHEET_BASE =  'https://spreadsheets.google.com/feeds/list/1vDvjR4Tgj9NnbLZwmSyJKDrEAE4gAHf0NUCjp2i7D90/';
  var SHEET_END = '/public/values?alt=json';
  var SHEET_1_URL = SHEET_BASE + '1' + SHEET_END;
  var SHEET_2_URL = SHEET_BASE + '2' + SHEET_END;
  if ($("#national-media-table").length) {
    $.getJSON(SHEET_1_URL, function (data) {
      var sheetOneUpdated = data.feed.updated.$t;
      var sheetOneRowCount = data.feed.entry.length;

      $.getJSON(SHEET_2_URL, function (data) {
        var rows = data.feed.entry;
        var lastUpdated = data.feed.updated.$t;
        var properties = Object.keys(rows[0])
          .filter(function (p) { return p.startsWith("gsx$"); })
          .map(function (p) { return p.substr(4); });

        createMediaTable(sheetOneUpdated, sheetOneRowCount, lastUpdated, rows.map(function (r) {
          var row = {};
          properties.forEach(function (p) {
            row[p] = r["gsx$" + p].$t === "" ? null : r["gsx$" + p].$t;
            if (row[p] === null) {
              row[p] = '';
            }
          });
          return row;
        }));
      });
    });
  }
});
