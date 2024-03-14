import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Select,
  Space,
} from 'antd';
import React, { useEffect, useMemo } from 'react';

type Props = {
  onPrevHandler: () => void;
  onNextHandler: (fields: string[] | string[][]) => void;
  baseFieldName: string;
  formInstance: FormInstance<any>;
};

const ApplicationHousingForm = (props: Props) => {
  const { baseFieldName, onNextHandler, onPrevHandler, formInstance } = props;

  const isRuralRoute = Form.useWatch(
    [baseFieldName, 'currentAddress', 'isRuralRoute'],
    formInstance
  );

  const generalRules = [
    {
      required: true,
      message: 'Required',
    },
  ];

  const addressFields = isRuralRoute ? (
    <>
      <Space.Compact className='gap-2'>
        <Form.Item
          rules={generalRules}
          label='RR'
          name={[baseFieldName, 'currentAddress', 'ruralRoute']}
        >
          <Input placeholder='RR' />
        </Form.Item>
        <Form.Item
          name={[baseFieldName, 'currentAddress', 'box']}
          rules={generalRules}
          label='BOX'
        >
          <Input placeholder='BOX' />
        </Form.Item>
      </Space.Compact>
    </>
  ) : (
    <>
      <Space.Compact className='gap-2'>
        <Form.Item
          rules={generalRules}
          name={[baseFieldName, 'currentAddress', 'street']}
        >
          <Input placeholder='Street Address' />
        </Form.Item>
        <Form.Item name={[baseFieldName, 'currentAddress', 'appartment']}>
          <Input placeholder='Apt # (Optional)' />
        </Form.Item>
      </Space.Compact>
    </>
  );

  const requiredFields: string[][] = [
    [baseFieldName, 'currentAddress', 'ruralRoute'],
    [baseFieldName, 'currentAddress', 'box'],
    [baseFieldName, 'currentAddress', 'street'],
    [baseFieldName, 'currentAddress', 'zipCode'],
    [baseFieldName, 'currentAddress', 'city'],
    [baseFieldName, 'currentAddress', 'state'],
    [baseFieldName, 'currentAddress', 'housingStatus'],
    [baseFieldName, 'currentAddress', 'monthsAtAddress'],
    [baseFieldName, 'currentAddress', 'mortage'],
    [baseFieldName, 'dob'],
    [baseFieldName, 'SSN'],
  ];

  return (
    <>
      <Form.Item label='Address'>
        <Form.Item
          name={[baseFieldName, 'currentAddress', 'isRuralRoute']}
          valuePropName='checked'
        >
          <Checkbox>I have a rural route</Checkbox>
        </Form.Item>
        {addressFields}
      </Form.Item>
      <Form.Item>
        <Space.Compact className='gap-2'>
          <Form.Item
            rules={generalRules}
            name={[baseFieldName, 'currentAddress', 'zipCode']}
          >
            <Input placeholder='Zip Code' />
          </Form.Item>
          <Form.Item
            rules={generalRules}
            name={[baseFieldName, 'currentAddress', 'city']}
          >
            <Select placeholder='Select city'>
              <Select.Option value='Albuquerqu'>Albuquerqu</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={generalRules}
            name={[baseFieldName, 'currentAddress', 'state']}
          >
            <Select placeholder='Select state'>
              <Select.Option value='CA'>CA</Select.Option>
              <Select.Option value='NM'>NM</Select.Option>
            </Select>
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Divider />
      <Form.Item>
        <Space.Compact className='gap-2'>
          <Form.Item
            labelCol={{
              span: 24,
            }}
            rules={generalRules}
            label='Housing Status'
            name={[baseFieldName, 'currentAddress', 'housingStatus']}
          >
            <Select placeholder='Select Housing Status'>
              <Select.Option value='rent'>Rent</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            labelCol={{
              span: 24,
            }}
            required
            label='Time at Address'
          >
            <Space.Compact className='gap-2'>
              <Form.Item
                name={[baseFieldName, 'currentAddress', 'yearsAtAddress']}
              >
                <InputNumber addonAfter={'Years'} />
              </Form.Item>
              <Form.Item
                rules={generalRules}
                name={[baseFieldName, 'currentAddress', 'monthsAtAddress']}
              >
                <InputNumber addonAfter={'Months'} />
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          <Form.Item
            labelCol={{
              span: 24,
            }}
            label='Mortage Payment/Rent'
            rules={generalRules}
            name={[baseFieldName, 'currentAddress', 'mortage']}
          >
            <InputNumber addonAfter={'/Month'} addonBefore={'$'} />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Divider />
      <Form.Item
        rules={generalRules}
        label='Date of Birth'
        name={[baseFieldName, 'dob']}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label='SSN / ITIN'
        rules={generalRules}
        name={[baseFieldName, 'SSN']}
        wrapperCol={{
          span: 12,
        }}
      >
        <Input placeholder='Enter your SSN/ITIN' />
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

export default ApplicationHousingForm;
