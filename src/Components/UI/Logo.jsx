import React from 'react';
import { Col, Row } from 'antd';

const Logo = ({ height }) => {
  const Block = ({ color, offset }) => (
    <Col offset={offset} span={6}>
      <div
        style={{
          height: height / 4,
          width: height / 4
        }}
        className={`${color}-background`}
      />
    </Col>
  );

  const RoundedBlock = ({ color, side }) => {
    const style = side => {
      return side === 'left' ? { borderRadius: '50% 0 0 50%' } : { 'borderRadius': '0 50% 50% 0' };
    };

    return (
      <Col span={6}>
        <div
          style={{
            height: height / 4,
            width: height / 4,
            ...style(side)
          }}
          className={`${color}-background`}
        />
      </Col>
    )
  };

  const TriangleLeft = ({ color }) => (
    <Col span={6}>
      <div
        style={{
          borderRightColor: 'transparent',
          borderStyle: 'solid',
          borderTopColor: 'transparent',
          borderWidth: `${height / 4}px 0 0 ${height / 4}px`
        }}
        className={`${color}-border`}
      />
    </Col>
  );

  const TriangleRight = ({ color }) => (
    <Col span={6}>
      <div
        style={{
          borderLeftColor: 'transparent',
          borderStyle: 'solid',
          borderTopColor: 'transparent',
          borderWidth: `0 0 ${height / 4}px ${height / 4}px`
        }}
        className={`${color}-border`}
      />
    </Col>
  );

  return (
    <div style={{ display: 'inline-block'}}>
      <Row gutter={4} style={{ padding: `${height / 20}px` }}>
        <Block offset={6} color="blue" />
        <Block color="light-grey" />
      </Row>
      <Row gutter={4} style={{ padding: `${height / 20}px` }}>
        <RoundedBlock color="blue" side="left" />
        <TriangleLeft color="light-grey" />
        <TriangleRight color="blue" />
        <Block color="light-grey" />
      </Row>
      <Row gutter={4} style={{ padding: `${height / 20}px` }}>
        <Block color="light-grey" />
        <Block color="blue" />
        <Block color="light-grey" />
        <RoundedBlock color="blue" side="right" />
      </Row>
    </div>
  )
};

export default Logo;
