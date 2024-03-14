import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Input,
  Select,
  Space,
} from 'antd';
import React from 'react';
import { states } from './formConstants';

type Props = {
  baseFieldName: string;
  onPrevHandler: () => void;
  onNextHandler: (fields: string[] | string[][]) => void;
  formInstance: FormInstance<any>;
};

const ApplicationPreviousAddressForm = (props: Props) => {
  const { baseFieldName, onPrevHandler, onNextHandler, formInstance } = props;

  const isRuralRoute = Form.useWatch(
    [baseFieldName, 'previousAddress', 'isRuralRoute'],
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
          label='RR'
          rules={generalRules}
          name={[baseFieldName, 'previousAddress', 'ruralRoute']}
        >
          <Input placeholder='RR' />
        </Form.Item>
        <Form.Item
          rules={generalRules}
          name={[baseFieldName, 'previousAddress', 'box']}
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
          name={[baseFieldName, 'previousAddress', 'street']}
        >
          <Input placeholder='Street Name' />
        </Form.Item>
        <Form.Item name={[baseFieldName, 'previousAddress', 'appartment']}>
          <Input placeholder='Apt # (Optional)' />
        </Form.Item>
      </Space.Compact>
    </>
  );

  const requiredFields: string[] | string[][] = [
    [baseFieldName, 'previousAddress', 'street'],
    [baseFieldName, 'previousAddress', 'ruralRoute'],
    [baseFieldName, 'previousAddress', 'box'],
    [baseFieldName, 'previousAddress', 'zipCode'],
    [baseFieldName, 'previousAddress', 'city'],
    [baseFieldName, 'previousAddress', 'state'],
  ];

  return (
    <>
      <Form.Item label='Address' required>
        <Form.Item
          name={[baseFieldName, 'previousAddress', 'isRuralRoute']}
          valuePropName='checked'
        >
          <Checkbox>I have a rural route</Checkbox>
        </Form.Item>
        {addressFields}
      </Form.Item>
      <Form.Item>
        <Space className='gap-2'>
          <Form.Item
            rules={generalRules}
            name={[baseFieldName, 'previousAddress', 'zipCode']}
          >
            <Input placeholder='Zip Code' />
          </Form.Item>
          <Form.Item
            rules={generalRules}
            name={[baseFieldName, 'previousAddress', 'city']}
          >
            <Select
              showSearch
              optionFilterProp='children'
              allowClear
              placeholder='Select city'
            >
              {states?.map(([state, cities]) => (
                <Select.OptGroup key={state} label={state}>
                  {cities?.map((city) => (
                    <Select.Option key={city} value={city}>
                      {city}
                    </Select.Option>
                  ))}
                </Select.OptGroup>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            rules={generalRules}
            name={[baseFieldName, 'previousAddress', 'state']}
          >
            <Select
              showSearch
              optionFilterProp='children'
              allowClear
              placeholder='Select state'
            >
              {states?.map(([key, val]) => (
                <Select.Option key={key} value={key}>
                  {key}
                </Select.Option>
              ))}
            </Select>
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

export default ApplicationPreviousAddressForm;
