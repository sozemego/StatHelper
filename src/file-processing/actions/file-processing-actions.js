import XLSX from 'xlsx';
import Papa from 'papaparse';
import {makeActionCreator} from '../../common/actions/utils';

export const FILE_PARSING_START = 'FILE_PARSING_START';
const parsing = makeActionCreator(FILE_PARSING_START);

export const FILE_PARSING_END = 'FILE_PARSING_END';
const parsed = makeActionCreator(FILE_PARSING_END, 'parsedFile');

export const FILE_PARSING_ERROR = 'FILE_PARSING_ERROR';
const error = makeActionCreator(FILE_PARSING_ERROR, 'error');

export const parseFile = file => {
  return dispatch => {
    dispatch(parsing());

    return readFile(file)
      .then(file => parse(getFileExtension(file), file))
    .then(result => {
      dispatch(parsed(result));
    })
    .catch(err => dispatch(error(err)));
  };
};

const getFileExtension = ({name}) => {
  const tokens = name.split('.');
  return tokens[tokens.length - 1];
};

const readFile = file => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('loadend', function () {
      resolve(fileReader.result);
    });
    fileReader.readAsBinaryString(file);
  });
};

const parse = (extension, file) => {
  switch (extension) {
    case 'xlsx':
      return parseExcel(file);
    case 'xls':
      return parseExcel(file);
    case 'csv':
      return parseCsv(file);
    default:
      throw new Error('Invalid extension, only .xlsx, .xls and .csv are allowed!');
  }
};

const parseExcel = file => {
  return new Promise((resolve, reject) => {
    let workbook = XLSX.read(file, {type: 'binary'});

    const rowObject = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[workbook.SheetNames[0]], {
        header: 1
      }
    );
    resolve(rowObject);
  });
};

const parseCsv = file => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: ({errors, data}) => {
        if (errors.length > 0) {
          return reject(errors[0].message);
        }
        //results.data contains array of rows
        resolve(data);
      }
    });
  });
};

