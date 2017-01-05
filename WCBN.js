(function () {
    // console.log("in the js");
	
	var myConnector = tableau.makeConnector();
	
	// console.log("pre-columns");
	
    myConnector.getSchema = function (schemaCallback) {
		var cols = [
			{ id : "at", alias : "Time song played", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			{ id : "artist", alias : "artist", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			{ id : "name", alias : "song", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			{ id : "album", alias : "album", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			{ id : "dj", alias : "dj", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			{ id : "label", alias : "label", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			{ id : "showname", alias : "Show name", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			{ id : "year", alias : "year", columnRole: "dimension", dataType : tableau.dataTypeEnum.int },
			{ id : "request", alias : "request",columnRole: "dimension", dataType : tableau.dataTypeEnum.bool }
		];
		
		// console.log("post-columns");
		
		var tableInfo = {
			id : "WCBN",
			alias : "WCBN Freeform Shows",
			columns : cols
		};

		schemaCallback([tableInfo]);
	};

    myConnector.getData = function(table, doneCallback) {
		$.getJSON("http://localhost:8889/app.wcbn.org/freeform_shows/243.json", function(resp) {
			// console.log("resp: ");
			// console.log(resp);
			
			var episodes = resp.episodes,
				tableData = [];
			
			// console.log("episodes: ");
			// console.log(episodes);

			// Iterate over the JSON object

			for (var i = 0, len = episodes.length; i < len; i++) {
				var episodeI = episodes[i]
				// console.log("episodeI: ");
				// console.log(episodeI);
				// console.log(episodeI.songs.length);
				for (var j = 0, len2 = episodeI.songs.length; j < len2; j++) {
					tableData.push({
						"at": episodeI.songs[j].at,
						"artist": episodeI.songs[j].artist,
						"name": episodeI.songs[j].name,
						"album": episodeI.songs[j].album,
						"label": episodeI.songs[j].label,
						"year": episodeI.songs[j].year,
						"request": episodeI.songs[j].request,
						"showname": resp.name,
						"dj": episodeI.dj
					});
				}
			}

			table.appendRows(tableData);
			doneCallback();
		});
	};

    tableau.registerConnector(myConnector);
	
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "WCBN Freeform Shows";
        tableau.submit();
    });
});
})();
