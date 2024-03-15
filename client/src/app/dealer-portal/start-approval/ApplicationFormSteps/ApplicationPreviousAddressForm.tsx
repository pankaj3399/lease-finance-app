import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
  Space,
} from 'antd';
import React from 'react';
import { states, streetTypes } from './formConstants';

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

  const isSameAsApplicant = Form.useWatch(
    [baseFieldName, 'previousAddress', 'isSameAsApplicant'],
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
          name={[baseFieldName, 'previousAddress', 'streetNumber']}
        >
          <Input placeholder='Street #' />
        </Form.Item>
        <Form.Item
          rules={generalRules}
          name={[baseFieldName, 'previousAddress', 'streetAddress']}
        >
          <Input placeholder='Street Address' />
        </Form.Item>
        <Form.Item name={[baseFieldName, 'previousAddress', 'streetType']}>
          <Select placeholder='Select street type'>
            {streetTypes?.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Space.Compact>
      <Form.Item
        wrapperCol={{ span: 6 }}
        name={[baseFieldName, 'previousAddress', 'appartment']}
      >
        <Input placeholder='Apt # (Optional)' />
      </Form.Item>
    </>
  );

  const requiredFields: string[] | string[][] = [
    [baseFieldName, 'previousAddress', 'streetNumber'],
    [baseFieldName, 'previousAddress', 'streetAddress'],
    [baseFieldName, 'previousAddress', 'ruralRoute'],
    [baseFieldName, 'previousAddress', 'box'],
    [baseFieldName, 'previousAddress', 'zipCode'],
    [baseFieldName, 'previousAddress', 'city'],
    [baseFieldName, 'previousAddress', 'state'],
  ];

  return (
    <>
      {baseFieldName === 'secondApplication' && (
        <Form.Item
          name={[baseFieldName, 'previousAddress', 'isSameAsApplicant']}
          label='Same address as applicant?'
        >
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
      )}

      {!isSameAsApplicant && (
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
        </>
      )}
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
