/*jshint esversion: 6 */
import XLSX from "xlsx";
import Papa from "papaparse";

var FileParser = {};

(function makeParser(FileParser) {

	const wrongFormatMessage = "File has wrong format/extension.";
	const fileReader = new FileReader();

	// this function takes input file and its extension, and then parses either
	// excel or csv formats into a JSON object. This object contains an array of rows,
	// where each row contains columns. This object simply stores cell values with no information
	// about them.
	var parseFile = function(file, extension, callback) { //TODO add error callback here? a callback which accepts a list of problems, then renders it?
		if (!file || !callback) { // those are programmer errors
			return;
		}

		if(!extension || extension === null || extension === "") {
			callback({error: wrongFormatMessage});
			return;
		}

		if (extension.toLowerCase() === "xlsx") {
			fileReader.onload = function(event) {
				const result = parseExcel(event.target.result);
				callback(result);
			}.bind(this);
			fileReader.readAsBinaryString(file);
		} else if (extension.toLowerCase() === "csv") {
			parseCSV(file, callback);
		} else {
			callback({error: wrongFormatMessage});
		}
	};

	var parseExcel = function(data) {

		const workbook = XLSX.read(data, {
			type: "binary"
		});
		const rowObject = XLSX.utils.sheet_to_row_object_array(
			workbook.Sheets[workbook.SheetNames[0]], {
				header: 1
			}
		); // header: 1 means use first row as column names (headers)

		return rowObject;
	};

	var parseCSV = function(file, callback) {
		Papa.parse(file, {
			complete: function(results) {
				if (results.errors.length > 0) {
					callback({error: "There was an error parsing the file: " + results.errors[0].message});
					return;
				}
				//results.data contains array of rows
				callback(results.data);
			}
		});
	};

	FileParser.parseFile = parseFile;

})(FileParser);

module.exports = FileParser;
