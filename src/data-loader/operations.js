import Papa from 'papaparse';
import XLSX from 'xlsx';
import actions from './actions';

const loadFile = file => {
  return dispatch => {
    dispatch(actions.loading());

    return readFile(file)
      .then(([fileExtension, fileContent]) => load(fileExtension, fileContent))
      .then(result => {
        dispatch(actions.itemNamesLoaded(result.slice(0, 1)));
        dispatch(actions.dataLoaded(result.slice(1)));
        dispatch(actions.loaded());
      })
      .catch(err => dispatch(error(err)));
  };
};

const readFile = file => {
  const fileExtension = getFileExtension(file);
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('loadend', function () {
      resolve([fileExtension, fileReader.result]);
    });
    fileReader.readAsBinaryString(file);
  });
};

const load = (fileExtension, fileContent) => {
  switch (fileExtension) {
    case 'xlsx':
      return loadExcel(fileContent);
    case 'xls':
      return loadExcel(fileContent);
    case 'csv':
      return loadCsv(fileContent);
    default:
      throw new Error('Invalid extension, only .xlsx, .xls and .csv are allowed!');
  }
};

const getFileExtension = ({name}) => {
  const tokens = name.split('.');
  return tokens[tokens.length - 1];
};

const loadExcel = fileContent => {
  return new Promise((resolve, reject) => {
    let workbook = XLSX.read(fileContent, {type: 'binary'});

    const rowObject = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[workbook.SheetNames[0]], {
        header: 1
      }
    );
    resolve(rowObject);
  });
};

const loadCsv = fileContent => {
  return new Promise((resolve, reject) => {
    Papa.parse(fileContent, {
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

export default {
  loadFile
};