import Papa from 'papaparse';
import {
  error,
  loaded,
  loading
} from './actions';

export const parseFile = file => {
  return dispatch => {
    dispatch(loading());

    return readFile(file)
      .then(file => load(getFileExtension(file), file))
      .then(result => dispatch(loaded(result)))
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

const load = (extension, file) => {
  switch (extension) {
    case 'xlsx':
      return loadExcel(file);
    case 'xls':
      return loadExcel(file);
    case 'csv':
      return loadCsv(file);
    default:
      throw new Error('Invalid extension, only .xlsx, .xls and .csv are allowed!');
  }
};

const loadExcel = file => {
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

const loadCsv = file => {
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