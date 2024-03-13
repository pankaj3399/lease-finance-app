import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from 'antd';
import React from 'react';

type Props = {
  isRuralRoute: boolean;
  toggleCheckIsRuralRoute: () => void;
  onPrevHandler: () => void;
  onNextHandler: () => void;
  baseFieldName: string;
};

const ApplicationHousingForm = (props: Props) => {
  const {
    isRuralRoute,
    toggleCheckIsRuralRoute,
    baseFieldName,
    onNextHandler,
    onPrevHandler,
  } = props;

  const addressFields = isRuralRoute ? (
    <>
      <Space.Compact className='gap-2'>
        <Form.Item
          label='RR'
          name={['firstApplication', 'currentAddress', 'rr']}
        >
          <Input placeholder='RR' />
        </Form.Item>
        <Form.Item label='BOX'>
          <Input placeholder='BOX' />
        </Form.Item>
      </Space.Compact>
    </>
  ) : (
    <>
      <Space.Compact className='gap-2'>
        <Form.Item name={['firstApplication', 'currentAddress', 'street']}>
          <Input placeholder='Street Name' />
        </Form.Item>
        <Form.Item name={['firstApplication', 'currentAddress', 'appartment']}>
          <Input placeholder='Apt # (Optional)' />
        </Form.Item>
      </Space.Compact>
    </>
  );

  return (
    <>
      <Form.Item label='Address'>
        <Form.Item>
          <Checkbox value={isRuralRoute} onChange={toggleCheckIsRuralRoute}>
            I have a rural route
          </Checkbox>
        </Form.Item>
        {addressFields}
      </Form.Item>
      <Form.Item>
        <Space.Compact className='gap-2'>
          <Form.Item name={[baseFieldName, 'currentAddress', 'zipCode']}>
            <Input placeholder='Zip Code' />
          </Form.Item>
          <Form.Item name={[baseFieldName, 'currentAddress', 'city']}>
            <Select placeholder='Select city'>
              <Select.Option value='Albuquerqu'>Albuquerqu</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={[baseFieldName, 'currentAddress', 'state']}>
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
            label='Housing Status'
            name={[baseFieldName, 'currentAddress', 'housingStatus']}
          >
            <Select placeholder='Select Housing Status'></Select>
          </Form.Item>
          <Form.Item
            labelCol={{
              span: 24,
            }}
            label='Time at Address'
          >
            <Space.Compact className='gap-2'>
              <Form.Item
                name={[baseFieldName, 'currentAddress', 'yearsAtAddress']}
              >
                <InputNumber addonAfter={'Years'} />
              </Form.Item>
              <Form.Item
                name={[baseFieldName, 'currentAddress', 'monthsAtAddresss']}
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
          >
            <InputNumber addonAfter={'/Month'} addonBefore={'$'} />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Divider />
      <Form.Item label='Date of Birth' name={[baseFieldName, 'dob']}>
        <DatePicker />
      </Form.Item>
      <Form.Item
        label='SSN / ITIN'
        name={[baseFieldName, 'SSN']}
        wrapperCol={{
          span: 12,
        }}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <div className='flex items-center justify-between w-full'>
          <Button onClick={onPrevHandler} type='primary'>
            Prev
          </Button>
          <Button onClick={onNextHandler} type='primary'>
            Next
          </Button>
        </div>
      </Form.Item>
    </>
  );
};

export default ApplicationHousingForm;
