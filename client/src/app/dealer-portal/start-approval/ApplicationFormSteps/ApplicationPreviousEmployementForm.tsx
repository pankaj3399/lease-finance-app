import React from 'react';
import {
  Button,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Select,
  Space,
} from 'antd';

type Props = {
  onPrevHandler: () => void;
  onNextHandler: (fields: string[] | string[][], jumpIndex?: number) => void;
  baseFieldName: string;
};

const ApplicationPreviousEmployementForm = (props: Props) => {
  const { onNextHandler, onPrevHandler, baseFieldName } = props;

  const generalRules = [
    {
      required: true,
      message: 'Required',
    },
  ];

  const requiredFields = [
    [baseFieldName, 'previousEmployement', 'employementStatus'],
    [baseFieldName, 'previousEmployement', 'employer'],
    [baseFieldName, 'previousEmployement', 'workTitle'],
    [baseFieldName, 'previousEmployement', 'workPhone'],
    [baseFieldName, 'previousEmployement', 'monthsAtJob'],
  ];

  return (
    <>
      <Form.Item>
        <Space.Compact className='gap-4'>
          <Form.Item
            labelCol={{
              span: 24,
            }}
            rules={generalRules}
            label='Employement Status'
            name={[baseFieldName, 'previousEmployement', 'employementStatus']}
          >
            <Select placeholder='Select employement status'>
              <Select.Option value='Employeed'>Employeed</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{
              span: 24,
            }}
            rules={generalRules}
            label='Employer'
            name={[baseFieldName, 'previousEmployement', 'employer']}
          >
            <Input />
          </Form.Item>
        </Space.Compact>
        <Form.Item
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 12,
          }}
          rules={generalRules}
          label='Work Title'
          name={[baseFieldName, 'previousEmployement', 'workTitle']}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 12,
          }}
          rules={generalRules}
          label='Work Phone'
          name={[baseFieldName, 'previousEmployement', 'workPhone']}
        >
          <Input />
        </Form.Item>
        <p className='text-sm mb-5'>
          I consent to receive autodialed, pre-recorded and artificial voice
          telemarketing and sales calls and text messages from or on behalf of
          dealer (or any financing source to which dealer assigns my contract)
          at the telephone number(s) provided in this communication, including
          any cell phone numbers. I understand that this consent is not a
          condition of purchase or credit.
        </p>

        <Form.Item label='Time at Job' required>
          <Space.Compact className='gap-2'>
            <Form.Item
              name={[baseFieldName, 'previousEmployement', 'yearsAtJob']}
            >
              <InputNumber addonAfter='Years' />
            </Form.Item>
            <Form.Item
              rules={generalRules}
              name={[baseFieldName, 'previousEmployement', 'monthsAtJob']}
            >
              <InputNumber addonAfter='Months' />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <div className='flex items-center justify-between w-full'>
          <Button onClick={onPrevHandler} type='primary'>
            Prev
          </Button>
          <Button
            onClick={() => onNextHandler(requiredFields, 10)}
            type='primary'
          >
            Review
          </Button>
        </div>
      </Form.Item>
    </>
  );
};

export default ApplicationPreviousEmployementForm;