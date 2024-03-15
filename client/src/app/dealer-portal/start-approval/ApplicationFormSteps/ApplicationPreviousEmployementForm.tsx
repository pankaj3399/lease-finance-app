import React from 'react';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';

import { employementStatus } from './formConstants';

type Props = {
  onPrevHandler: () => void;
  onNextHandler: (
    fields: string[] | string[][],
    redirectToReview?: boolean
  ) => void;
  baseFieldName: string;
  applicationType: 'individual' | 'joint';
  isFormComplete: boolean;
};

const ApplicationPreviousEmployementForm = (props: Props) => {
  const {
    onNextHandler,
    onPrevHandler,
    baseFieldName,
    applicationType,
    isFormComplete,
  } = props;

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
              {employementStatus.map((status) => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
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

        <Form.Item label='Time at Job' required wrapperCol={{ span: 8 }}>
          <Space.Compact className='gap-2'>
            <Form.Item
              name={[baseFieldName, 'previousEmployement', 'yearsAtJob']}
            >
              <InputNumber addonAfter='Years' min={0} />
            </Form.Item>
            <Form.Item
              rules={generalRules}
              name={[baseFieldName, 'previousEmployement', 'monthsAtJob']}
            >
              <InputNumber addonAfter='Months' min={0} />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <div className='flex items-center justify-between w-full'>
          <Button onClick={onPrevHandler} type='primary'>
            Prev
          </Button>
          <Button onClick={() => onNextHandler(requiredFields)} type='primary'>
            {applicationType === 'joint' && baseFieldName === 'firstApplication'
              ? 'Next'
              : 'Review'}
            Review
          </Button>
        </div>
        {isFormComplete && baseFieldName === 'firstApplication' && (
          <div className='flex justify-end mt-4'>
            <Button
              type='primary'
              onClick={() => onNextHandler(requiredFields, true)}
            >
              Review
            </Button>
          </div>
        )}
      </Form.Item>
    </>
  );
};

export default ApplicationPreviousEmployementForm;
