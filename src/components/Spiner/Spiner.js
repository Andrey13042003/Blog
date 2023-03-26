import { Space, Spin } from 'antd';

const Spiner = () => {
  return (
    <Space>
      <Spin tip="Loading posts..." size="large" />
    </Space>
  );
};

export default Spiner;
