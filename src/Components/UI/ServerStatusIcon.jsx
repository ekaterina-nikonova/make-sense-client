import React from "react";

import { Tooltip } from "antd";

import iconConnected from "../../Assets/Icons/icon-connected.png";
import iconDisconnected from "../../Assets/Icons/icon-disconnected.png";

export const ServerStatusConnected = () => (
  <Tooltip title="Server connected">
    <img
      alt="connection indicator"
      src={iconConnected}
      style={{ maxHeight: '1.2rem'}}
    />
  </Tooltip>
);

export const ServerStatusDisconnected = () => (
  <Tooltip title="Server disconnected">
    <img
      alt="connection indicator"
      src={iconDisconnected}
      style={{ maxHeight: '1.2rem'}}
    />
  </Tooltip>
);
