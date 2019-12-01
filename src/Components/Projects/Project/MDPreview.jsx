import {Modal} from "antd";
import ReactMarkdown from "react-markdown";
import React from "react";

const MDPreview = ({ text, visible, close }) => {
  return (
    <Modal
      title="Paragraph preview"
      visible={visible}
      closable
      onCancel={close}
      destroyOnClose
      footer={null}
    >
      <ReactMarkdown source={text} />
    </Modal>
  );
};

export default MDPreview;
