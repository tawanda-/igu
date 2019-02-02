import React, {Component} from 'react';
import { Upload, Icon, message } from 'antd';
import readXlsxFile from 'read-excel-file';

let reader;

const Dragger = Upload.Dragger;

const props = {

    customRequest: ({onSuccess, onError, file}) => {

        reader = new FileReader();

        reader.onloadend = () => {

            let jsonData = JSON.parse(reader.result);

        };
        reader.readXlsxFile(file);
    }
};
/*
const props = {
  name: 'file',
  multiple: false,
  /*action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {

    readXlsxFile(info.file, { getSheets: true }).then((sheets) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        console.log(sheets);
      })


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
};*/

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