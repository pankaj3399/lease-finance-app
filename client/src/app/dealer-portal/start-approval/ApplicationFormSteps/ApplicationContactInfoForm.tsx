import {
  Button,
  Divider,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
  Space,
} from 'antd';

import { suffixes } from './formConstants';

type Props = {
  onNextHandler: (fields: string[][], redirectToReview?: boolean) => void;
  onPrevHandler?: () => void;
  baseFieldName: string;
  formInstance: FormInstance<any>;
  isFormComplete: boolean;
};

const ApplicationContactInfoForm = (props: Props) => {
  const {
    onNextHandler,
    baseFieldName,
    onPrevHandler,
    formInstance,
    isFormComplete,
  } = props;

  const email = Form.useWatch([baseFieldName, 'email'], formInstance);

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
          <p className='text-xs'>
            Please be aware that by selecting &ldquo;Joint&ldquo; the applicant
            and the co-applicant agree they intend to apply for joint credit.
            The co-applicant must be present and must indicate his or her
            acceptance of the Terms and Conditions at the end of this
            application before it is submitted.
          </p>
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
      <Form.Item name={[baseFieldName, 'suffix']} wrapperCol={{ span: 8 }}>
        <Select placeholder='Select suffix'>
          {suffixes.map((suffix) => (
            <Select.Option value={suffix} key={suffix}>
              {suffix}
            </Select.Option>
          ))}
        </Select>
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
        <p className='text-xs'>
          I consent to receive autodialed, pre-recorded and artificial voice
          telemarketing and sales calls and text messages from or on behalf of
          dealer (or any financing source to which dealer assigns my contract)
          at the telephone number(s) provided in this communication, including
          any cell phone numbers. I understand that this consent is not a
          condition of purchase or credit.
        </p>
      </Form.Item>

      <Form.Item
        rules={generalRules}
        label='Email'
        name={[baseFieldName, 'email']}
      >
        <Input placeholder='Enter your email' />
      </Form.Item>
      <Form.Item
        rules={[
          { required: true, message: 'Please confirm your email' },
          {
            validator: (_rule, val) => {
              if (val !== email) {
                return Promise.reject(new Error('Email did not match'));
              }

              return Promise.resolve();
            },
          },
        ]}
        label='Verify Email'
        name={[baseFieldName, 'verifyEmail']}
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
      {isFormComplete && (
        <div className='flex justify-end mt-4'>
          <Button
            type='primary'
            onClick={() => onNextHandler(requiredFields, true)}
          >
            Review
          </Button>
        </div>
      )}
    </>
  );
};

export default ApplicationContactInfoForm;
