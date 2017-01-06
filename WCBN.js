(function () {

	var myConnector = tableau.makeConnector();

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
		
		var tableInfo = {
			id : "WCBN",
			alias : "WCBN Freeform Shows",
			columns : cols
		};

		schemaCallback([tableInfo]);
	};

    myConnector.getData = function(table, doneCallback) {
		for (var h = 1; h < 10; h++) {  // 001-009
			var url = "http://localhost:8889/app.wcbn.org/freeform_shows/00" + h + ".json"
			$.getJSON(url, function(resp) {
				var episodes = resp.episodes,
					tableData = [];

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
							"showname": episodeI.name,
							"dj": episodeI.dj
						});
					}
				}
				table.appendRows(tableData);
				doneCallback();
			});
		}

		for (var h1 = 1; h1 < 10; h1++) {  // 010-099
			for (var h2 = 0; h2 < 10; h2++) {
				var url = "http://localhost:8889/app.wcbn.org/freeform_shows/0" + h1 + h2 + ".json"
				$.getJSON(url, function(resp) {
					var episodes = resp.episodes,
						tableData = [];

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
								"showname": episodeI.name,
								"dj": episodeI.dj
							});
						}
					}
					table.appendRows(tableData);
					doneCallback();
				});
			}
		}

		for (var h = 100; h < 266; h++) {  // 100-265
			var url = "http://localhost:8889/app.wcbn.org/freeform_shows/" + h + ".json"
			$.getJSON(url, function(resp) {
				var episodes = resp.episodes,
					tableData = [];

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
							"showname": episodeI.name,
							"dj": episodeI.dj
						});
					}
				}
				table.appendRows(tableData);
				doneCallback();
			});
		}
	};

    tableau.registerConnector(myConnector);
	
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "WCBN Freeform Shows";
        tableau.submit();
    });
	});
})();