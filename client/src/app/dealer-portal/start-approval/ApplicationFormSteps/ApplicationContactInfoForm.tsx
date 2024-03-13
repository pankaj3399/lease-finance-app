import { Button, Divider, Form, Input, Radio, Space } from 'antd';

type Props = {
  onNextHandler: () => void;
  baseFieldName: string;
};

const ApplicationContactInfoForm = (props: Props) => {
  const { onNextHandler, baseFieldName } = props;

  return (
    <>
      <Form.Item label='Application Type' name='applicationType'>
        <Radio.Group>
          <Radio value='individual'> Individual </Radio>
          <Radio value='joint'> Joint </Radio>
        </Radio.Group>
      </Form.Item>
      <Divider />
      <Form.Item label='Name'>
        <Space.Compact className='gap-2'>
          <Form.Item name={[baseFieldName, 'firstName']}>
            <Input placeholder='First Name' />
          </Form.Item>
          <Form.Item name={[baseFieldName, 'middleName']}>
            <Input placeholder='Middle Name' />
          </Form.Item>
          <Form.Item name={[baseFieldName, 'lastName']}>
            <Input placeholder='Last Name' />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Divider />
      <Form.Item label='Primary Phone Number'>
        <Space.Compact className='gap-2'>
          <Form.Item name={[baseFieldName, 'phoneNumber']}>
            <Radio.Group>
              <Radio.Button value='home'>Home</Radio.Button>
              <Radio.Button value='cell'>Cell</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={[baseFieldName, 'phoneNumber']}>
            <Input placeholder='Phone number' />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Form.Item label='Email' name={[baseFieldName, 'email']}>
        <Input placeholder='Enter your email' />
      </Form.Item>
      <Divider />
      <Form.Item label="Salesperson's Name (Optional)">
        <Space.Compact className='gap-2'>
          <Form.Item name={[baseFieldName, 'salesPersonFirstName']}>
            <Input placeholder='First' />
          </Form.Item>
          <Form.Item name={[baseFieldName, 'salesPersonLastName']}>
            <Input placeholder='Last' />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 21,
        }}
      >
        <Button type='primary' onClick={onNextHandler}>
          Next
        </Button>
      </Form.Item>
    </>
  );
};

export default ApplicationContactInfoForm;
