import {
  Button,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Select,
  Space,
} from 'antd';
import React from 'react';

import { employementStatus, incomeSources } from './formConstants';

type Props = {
  onPrevHandler: () => void;
  onNextHandler: (fields: string[] | string[][]) => void;
  baseFieldName: string;
  formInstance: FormInstance<any>;
};

const ApplicationEmployementForm = (props: Props) => {
  const { onNextHandler, onPrevHandler, baseFieldName, formInstance } = props;

  const generalRules = [
    {
      required: true,
      message: 'Required',
    },
  ];

  const requiredFields: string[] | string[][] = [
    [baseFieldName, 'currentEmployement', 'employementStatus'],
    [baseFieldName, 'currentEmployement', 'employer'],
    [baseFieldName, 'currentEmployement', 'workTitle'],
    [baseFieldName, 'currentEmployement', 'workPhone'],
    [baseFieldName, 'currentEmployement', 'monthsAtJob'],
    [baseFieldName, 'currentEmployement', 'incomeSource'],
    [baseFieldName, 'currentEmployement', 'annualIncome'],
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
            name={[baseFieldName, 'currentEmployement', 'employementStatus']}
          >
            <Select placeholder='Select employement status'>
              {employementStatus.map((status: string) => (
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
            name={[baseFieldName, 'currentEmployement', 'employer']}
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
          name={[baseFieldName, 'currentEmployement', 'workTitle']}
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
          name={[baseFieldName, 'currentEmployement', 'workPhone']}
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
              name={[baseFieldName, 'currentEmployement', 'yearsAtJob']}
            >
              <InputNumber addonAfter='Years' min={0} />
            </Form.Item>
            <Form.Item
              rules={generalRules}
              name={[baseFieldName, 'currentEmployement', 'monthsAtJob']}
            >
              <InputNumber addonAfter='Months' min={0} />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      </Form.Item>

      <Divider />
      <div className='space-y-2 mb-5'>
        <h2 className='text-lg font-semibold'>
          Income: Please enter all sources of income you wish us to consider.
        </h2>
        <p className='text-xs'>
          **Alimony, child support, or separate maintenance income need not be
          revealed if you do not wish to have it considered as a basis for
          repaying this obligation.
        </p>
      </div>

      <Form.Item label='Income' required>
        <Space className='gap-2'>
          <Form.Item
            rules={generalRules}
            name={[baseFieldName, 'currentEmployement', 'incomeSource']}
          >
            <Select placeholder='Select Income Source'>
              {incomeSources.map((source) => (
                <Select.Option key={source} value={source}>
                  {source}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            rules={generalRules}
            name={[baseFieldName, 'currentEmployement', 'annualIncome']}
          >
            <InputNumber addonAfter='Per Year' addonBefore='$' />
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item>
        <div className='flex items-center justify-between w-full'>
          <Button onClick={onPrevHandler} type='primary'>
            Prev
          </Button>
          <Button onClick={() => onNextHandler(requiredFields)} type='primary'>
            Next
          </Button>
        </div>
      </Form.Item>
    </>
  );
};

export default ApplicationEmployementForm;
