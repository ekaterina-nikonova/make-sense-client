import React from 'react';
import { Card } from 'antd';

const MainPageCard = ({ alt, img, title }) => {
  const { Meta } = Card;

  return (
    <Card
      hoverable
      cover={<img alt={alt} src={require(`../../Assets/Images/${img}`)} />} 
      className="main-page-card"
    >
      <Meta title={title} />
    </Card>
  )
};

export default MainPageCard;
