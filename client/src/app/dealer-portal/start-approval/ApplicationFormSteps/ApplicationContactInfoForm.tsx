import { Button, Divider, Form, Input, Radio, Space } from 'antd';

type Props = {
  onNextHandler: (fields: string[][]) => void;
  onPrevHandler?: () => void;
  baseFieldName: string;
};

const ApplicationContactInfoForm = (props: Props) => {
  const { onNextHandler, baseFieldName, onPrevHandler } = props;

  const generalRules = [
    {
      required: true,
      message: 'Required',
    },
  ];

  const requiredFields = [
    [baseFieldName, 'firstName'],
    [baseFieldName, 'lastName'],
    [baseFieldName, 'phoneNumber'],
    [baseFieldName, 'phoneNumberType'],
    [baseFieldName, 'email'],
  ];

  return (
    <>
      {baseFieldName === 'firstApplication' && (
        <>
          <Form.Item label='Application Type' name='applicationType'>
            <Radio.Group>
              <Radio value='individual'> Individual </Radio>
              <Radio value='joint'> Joint </Radio>
            </Radio.Group>
          </Form.Item>
          <Divider />
        </>
      )}
      <Form.Item label='Name' required>
        <Space.Compact className='gap-2'>
          <Form.Item rules={generalRules} name={[baseFieldName, 'firstName']}>
            <Input placeholder='First Name' />
          </Form.Item>
          <Form.Item name={[baseFieldName, 'middleName']}>
            <Input placeholder='Middle Name' />
          </Form.Item>
          <Form.Item rules={generalRules} name={[baseFieldName, 'lastName']}>
            <Input placeholder='Last Name' />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Divider />
      <Form.Item label='Primary Phone Number'>
        <Space.Compact className='gap-2'>
          <Form.Item
            rules={generalRules}
            name={[baseFieldName, 'phoneNumberType']}
          >
            <Radio.Group>
              <Radio.Button value='Home'>Home</Radio.Button>
              <Radio.Button value='Cell'>Cell</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item rules={generalRules} name={[baseFieldName, 'phoneNumber']}>
            <Input placeholder='Phone number' />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Form.Item
        rules={generalRules}
        label='Email'
        name={[baseFieldName, 'email']}
      >
        <Input placeholder='Enter your email' />
      </Form.Item>
      {baseFieldName === 'firstApplication' && (
        <>
          <Divider />
          <Form.Item label="Salesperson's Name (Optional)">
            <Space.Compact className='gap-2'>
              <Form.Item name={['salesPersonFirstName']}>
                <Input placeholder='First' />
              </Form.Item>
              <Form.Item name={['salesPersonLastName']}>
                <Input placeholder='Last' />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </>
      )}

      <div className='flex justify-between flex-row-reverse w-full'>
        <Button type='primary' onClick={() => onNextHandler(requiredFields)}>
          Next
        </Button>
        <Button
          type='primary'
          onClick={onPrevHandler}
          className={`${baseFieldName === 'firstApplication' && '!hidden'}`}
        >
          Prev
        </Button>
      </div>
    </>
  );
};

export default ApplicationContactInfoForm;
