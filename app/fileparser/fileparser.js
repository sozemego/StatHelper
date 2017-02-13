/*jshint esversion: 6 */
import XLSX from "xlsx";
import Papa from "papaparse";

export default class FileParser {

	constructor() {
		this.wrongFormatMessage = "File has wrong format/extension.";
		this.fileReader = new FileReader();
	}

	/**
	* This function takes input file and its extension, and then parses either
	* excel or csv formats into a JSON object. This object contains an array of rows,
	* where each row contains columns. This object simply stores cell values with no information
	* about them.
	*/
	parseFile(file, extension, callback) {
		if (!file || !callback) { // those are programmer errors
			return;
		}

		if(!extension || extension === null || extension === "") {
			callback({error: this.wrongFormatMessage});
			return;
		}

		if (extension.toLowerCase() === "xlsx") {
			this.parseExcel(file, callback);
		} else if (extension.toLowerCase() === "csv") {
			this.parseCSV(file, callback);
		} else {
			callback({error: this.wrongFormatMessage});
		}
	}

	parseExcel(file, callback) {

		this.fileReader.onload = function(event) {
			const result = this.readExcelFromFile(event.target.result);
			callback(result);
		}.bind(this);

		this.fileReader.readAsBinaryString(file);

	}

	readExcelFromFile(data) {
		const workbook = XLSX.read(data, {
			type: "binary"
		});
		const rowObject = XLSX.utils.sheet_to_row_object_array(
				workbook.Sheets[workbook.SheetNames[0]], {
					header: 1
				}
		); // header: 1 means use first row as column names (headers)

		return rowObject;
	}

	parseCSV(file, callback) {
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
	}

}
