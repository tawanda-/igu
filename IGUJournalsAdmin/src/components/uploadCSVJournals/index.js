import React, {Component} from 'react';
import { Upload, Icon, message } from 'antd';
//import readXlsxFile from 'read-excel-file';
//import XLSX from 'xlsx';

let reader;

const Dragger = Upload.Dragger;

const oldprops = {

    customRequest: ({onSuccess, onError, file}) => {

        reader = new FileReader();

        reader.onload = () => {

            console.log("On Load");

        };

        reader.onloadend = () => {

            console.log("On Loaddend");

            var data = reader.result;
            //var workbook = XLSX.read(data, {type: 'array'});

            //console.log(workbook);

            //let jsonData = JSON.parse(reader.result);\
            //console.log(reader.result);
            //reader.readAsDataURL(reader.result);
            //readXlsxFile(reader.result, { getSheets: true }).then((sheets) => {
                // `rows` is an array of rows
                // each row being an array of cells.
                //console.log(sheets);
              //})

        };
        //reader.readAsDataURL(file);
        reader.readAsArrayBuffer(file);
    }
};

const props = {
  name: 'file',
  multiple: false,
    //action: 'https://igu-online.org/wp-admin/admin-ajax.php',
    action: 'http://www.esikolweni.co.za/wp-admin/admin-ajax.php',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class UploadCSV extends Component{

    render(){
        return(
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
        );
    }
}
export default UploadCSV;