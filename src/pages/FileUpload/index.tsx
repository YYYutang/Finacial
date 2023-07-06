import {Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
const {Dragger} = Upload;

const FileUpload: React.FC = () => {
  return (
    <Dragger
      name={"file"}
      multiple={false}
      action={""}
      onChange={(info) => {

      }}
      onDrop={
        (event) => {
          event.dataTransfer.files
        }
      }
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined/>
      </p>
      <p className="ant-upload-text">点击上传或将文件拖入此框</p>
      <p className="ant-upload-hint">
        请选择要上传的数据文件
      </p>
    </Dragger>
  );
};
export default FileUpload;
