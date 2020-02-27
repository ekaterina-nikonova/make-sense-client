import {baseUrl} from "./api";
import {message} from "antd";

export default ({parent, parent_id, type, fileList, updateFileList, showUploadList, onSuccess }) => ({
  action: `${ baseUrl }/api/v1/uploads`,
  headers: {
    'X-CSRF-TOKEN': localStorage.csrf
  },
  withCredentials: true,
  data: { parent, parent_id, type },
  fileList: fileList,
  name: 'file',
  showUploadList,
  onChange(info) {
    const file = info.file;

    if (info.file.status === 'done') {
      onSuccess(info.file.response.data.url);
      message.success(`File ${info.file.name} uploaded.`);
      file.url = info.file.response.data.url;
    }

    if (info.file.status === 'error') {
      message.error(`Could not upload file ${info.file.name}`);
    }

    if (updateFileList) updateFileList([file]);
  }
});
