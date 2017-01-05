(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
		var cols = [
			{ id : "url", alias : "url", dataType : tableau.dataTypeEnum.string }
			// { id : "at", alias : "Time song played", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			// { id : "artist", alias : "artist", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			// { id : "name", alias : "song", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			// { id : "album", alias : "album", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			// { id : "dj", alias : "dj", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			// { id : "label", alias : "label", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			// { id : "showname", alias : "Show name", columnRole: "dimension", dataType : tableau.dataTypeEnum.string },
			// { id : "year", alias : "year", columnRole: "dimension", dataType : tableau.dataTypeEnum.int },
			// { id : "request", alias : "request",columnRole: "dimension", dataType : tableau.dataTypeEnum.bool }
		];

		var tableInfo = {
			id : "WCBN",
			alias : "WCBN Freeform Shows",
			columns : cols
		};

		schemaCallback([tableInfo]);
	};

    myConnector.getData = function(table, doneCallback) {
		$.getJSON("http://app.wcbn.org/freeform_shows/243.json", function(resp) {
			var feat = resp.features,
				tableData = [];

			// Iterate over the JSON object
			for (var i = 0, len = feat.length; i < len; i++) {
				tableData.push({
					"url": feat[i].url
					// "at": feat[i].episodes.songs.at,
					// "artist": feat[i].episodes.songs.artist,
					// "name": feat[i].episodes.songs.name,
					// "album": feat[i].episodes.songs.album,
					// "label": feat[i].episodes.songs.label,
					// "year": feat[i].episodes.songs.year,
					// "request": feat[i].episodes.songs.request,
					// "dj": feat[i].episodes.dj,
					// "showname": feat[i].name
				});
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