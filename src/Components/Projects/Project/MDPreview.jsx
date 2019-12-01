import React from "react";
import * as PropTypes from "prop-types";

import ReactMarkdown from "react-markdown";
import { Icon, Modal } from "antd";

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

export const MDPreviewIcon = ({ openModal }) => {
  return <div className="preview-icon">
    <Icon
      type="eye"
      onClick={openModal}
    />
    <span className="label">Markdown preview</span>
  </div>;
}

MDPreviewIcon.propTypes = {onClick: PropTypes.func};

export default MDPreview;
