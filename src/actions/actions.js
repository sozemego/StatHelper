import XLSX from "xlsx";
import Papa from "papaparse";

export const FILE_PARSING_START = "FILE_PARSING_START";
const parsing = () => {
    return {
        type: FILE_PARSING_START
    }
};

export const FILE_PARSING_END = "FILE_PARSING_END";

const parsed = (parsedFile) => {
    return {
        type: FILE_PARSING_END,
        parsedFile
    }
};

export const FILE_PARSING_ERROR = "FILE_PARSING_ERROR";

const error = (error) => {
  return {
      type: FILE_PARSING_ERROR,
      error
  }
};

export const parseFile = (file) => {
    return (dispatch) => {
        dispatch(parsing());

        const extension = getFileExtension(file);
        return readFile(file)
            .then(arrayBuffer => parse(extension, arrayBuffer))
            .then(result => {
                setTimeout(() => dispatch(parsed(result)), 1500);
            })
            .catch(err => dispatch(error(err)));
    }
};

const getFileExtension = (file) => {
    let tokens = file.name.split(".");
    return tokens[tokens.length - 1];
};

const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("loadend", function () {
            resolve(fileReader.result);
        });
        fileReader.readAsBinaryString(file);
    });
};

const parse = (extension, file) => {
    switch (extension) {
        case "xlsx":
            return parseExcel(file);
        case "xls":
            return parseExcel(file);
        case "csv":
            return parseCsv(file);
    }
};

const parseExcel = (file) => {
    return new Promise((resolve, reject) => {
        let workbook = XLSX.read(file, {type: "binary"});

        const rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[workbook.SheetNames[0]], {
                header: 1
            }
        );
        resolve(rowObject);
    });
};

const parseCsv = (file) => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            complete: (results) => {
                if (results.errors.length > 0) {
                    return reject(results.errors[0].message);
                }
                //results.data contains array of rows
                resolve(results.data);
            }
        });
    });
};

