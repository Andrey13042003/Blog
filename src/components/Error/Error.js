import { Alert, Space } from 'antd';

const Error = () => {
  return (
    <Space style={{paddingTop: 20}}>
      <Alert
        message="Error !!!"
        description="Sorry but we can't find posts ( Please, try later"
        type="error"
        showIcon
        style={{ width: 500 }}
      />
    </Space>
  );
};

export default Error;
