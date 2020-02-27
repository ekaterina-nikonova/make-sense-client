import React, { useState } from "react";
import { Query } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";

import { queries } from "../../Services/graphql";
import { deleteUpload } from "../../Services/api";
import getUploadProps from "../../Services/getUploadProps";

import { Alert, Button, Icon, Popconfirm, Spin, Upload } from "antd";

import ComponentDetails from "./ComponentDetails";

const ComponentContainer = ({ match }) => {
  const [fileList, updateFileList] = useState([]);

  const [updateComponent] = useMutation(
    queries.updateComponent,
    { refetchQueries: [{ query: queries.projectsBoardsComponents }] }
  );

  const { params } = match;
  const { id } = params;

  const uploaderProps = getUploadProps({
    parent: 'component',
    parent_id: id,
    type: 'image',
    fileList,
    updateFileList,
    showUploadList: false,
    onSuccess: imageUrl => updateComponent({
      variables: { id, imageUrl }
    })
  });

  const deleteImage = async () => {
    await deleteUpload({
      parent: 'component',
      parent_id: id,
      type: 'image'
    }).then(res => {
      updateComponent({
        variables: { id, imageUrl: '' }
      })
    })
  };

  return (
    <Query query={queries.component} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return (
          <div className="top-level-state">
            <Spin />
          </div>
        );

        if (error) return (
          <div className="top-level-state">
            <Alert
              message="Error"
              description="Could not fetch component info."
              showIcon
              type="error"
            />
          </div>
        );

        return (
          <div className="single-component-container">
            { !data.component.imageUrl && (
              <Upload { ...uploaderProps }>
                <Button shape="circle" icon="picture" />
              </Upload>
            ) }

            { data.component.imageUrl && (
              <div className="icons-show-on-hover">
                <Upload { ...uploaderProps }>
                  <Icon type="picture" />
                </Upload>

                <Popconfirm title="Delete the image?" onConfirm={deleteImage}>
                  <Icon
                    type="close-circle"
                    theme="twoTone"
                    className="delete-image-icon"
                  />
                </Popconfirm>

                <img
                  alt={`Illustration for ${ data.component.name }`}
                  src={data.component.imageUrl}
                  className="component-image"
                />
              </div>
            ) }
            <ComponentDetails component={data.component} />
          </div>
        );
      }}
    </Query>
  );
};

export default ComponentContainer;
