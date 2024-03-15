import React from 'react';
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
} from 'antd';

import { housingStatuses, states, streetTypes } from './formConstants';

type Props = {
  onPrevHandler: () => void;
  onNextHandler: (
    fields: (string | string[])[],
    redirectToReview?: boolean
  ) => void;
  baseFieldName: string;
  formInstance: FormInstance<any>;
  isFormComplete: boolean;
};

const ApplicationHousingForm = (props: Props) => {
  const {
    baseFieldName,
    onNextHandler,
    onPrevHandler,
    formInstance,
    isFormComplete,
  } = props;

  const applicationType = Form.useWatch('applicationType', formInstance);

  const isRuralRoute = Form.useWatch(
    [baseFieldName, 'currentAddress', 'isRuralRoute'],
    formInstance
  );
  const housingStatus = Form.useWatch(
    [baseFieldName, 'currentAddress', 'housingStatus'],
    formInstance
  );

  const isSameAsApplicant = Form.useWatch(
    [baseFieldName, 'currentAddress', 'isSameAsApplicant'],
    formInstance
  );

  const isSameMortageInformationAsApplicant = Form.useWatch(
    [baseFieldName, 'currentAddress', 'isSameMortageInformationAsApplicant'],
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
          name={[baseFieldName, 'currentAddress', 'streetNumber']}
        >
          <Input placeholder='Street #' />
        </Form.Item>
        <Form.Item
          rules={generalRules}
          name={[baseFieldName, 'currentAddress', 'streetAddress']}
        >
          <Input placeholder='Street Address' />
        </Form.Item>
        <Form.Item name={[baseFieldName, 'currentAddress', 'streetType']}>
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
        wrapperCol={{ span: 5 }}
        name={[baseFieldName, 'currentAddress', 'appartment']}
      >
        <Input placeholder='Apt # (Optional)' />
      </Form.Item>
    </>
  );

  const requiredFields: (string | string[])[] = [
    [baseFieldName, 'currentAddress', 'ruralRoute'],
    [baseFieldName, 'currentAddress', 'box'],
    [baseFieldName, 'currentAddress', 'streetNumber'],
    [baseFieldName, 'currentAddress', 'streetAddress'],
    [baseFieldName, 'currentAddress', 'zipCode'],
    [baseFieldName, 'currentAddress', 'city'],
    [baseFieldName, 'currentAddress', 'state'],
    [baseFieldName, 'currentAddress', 'housingStatus'],
    [baseFieldName, 'currentAddress', 'monthsAtAddress'],
    [baseFieldName, 'currentAddress', 'mortage'],
    [baseFieldName, 'dob'],
    [baseFieldName, 'SSN'],
    'relationWithCoApplicant',
  ];

  return (
    <>
      {baseFieldName === 'secondApplication' && (
        <Form.Item
          name={[baseFieldName, 'currentAddress', 'isSameAsApplicant']}
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
          <Form.Item label='Address'>
            <Form.Item
              name={[baseFieldName, 'currentAddress', 'isRuralRoute']}
              valuePropName='checked'
            >
              <Checkbox>I have a rural route</Checkbox>
            </Form.Item>
            {addressFields}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Space className='gap-2'>
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
                name={[baseFieldName, 'currentAddress', 'state']}
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
      <Divider />
      {baseFieldName === 'secondApplication' && isSameAsApplicant && (
        <Form.Item
          name={[
            baseFieldName,
            'currentAddress',
            'isSameMortageInformationAsApplicant',
          ]}
          label='Same Mortgage/Rent information as applicant?'
        >
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
      )}

      {!isSameMortageInformationAsApplicant && (
        <>
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
                  {housingStatuses.map((status) => (
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
                wrapperCol={{
                  span: 12,
                }}
                required
                label='Time at Address'
              >
                <Space.Compact className='gap-2'>
                  <Form.Item
                    name={[baseFieldName, 'currentAddress', 'yearsAtAddress']}
                  >
                    <InputNumber addonAfter={'Years'} min={0} />
                  </Form.Item>
                  <Form.Item
                    rules={generalRules}
                    name={[baseFieldName, 'currentAddress', 'monthsAtAddress']}
                  >
                    <InputNumber addonAfter={'Months'} min={0} />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          {housingStatus !== 'Own Outright' && (
            <Form.Item
              labelCol={{
                span: 24,
              }}
              label='Mortage Payment/Rent'
              rules={generalRules}
              name={[baseFieldName, 'currentAddress', 'mortage']}
            >
              <InputNumber addonAfter={'/Month'} addonBefore={'$'} min={0} />
            </Form.Item>
          )}
        </>
      )}

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

      {applicationType === 'joint' && baseFieldName === 'firstApplication' && (
        <>
          <Divider />
          <Form.Item
            wrapperCol={{
              span: 8,
            }}
            rules={generalRules}
            name={'relationWithCoApplicant'}
            label='Relation to Co-Applicant'
          >
            <Select placeholder='Select RelationShip to Co-Applicant'>
              <Select.Option value='Spouse'>Spouse</Select.Option>
              <Select.Option value='Relative'>Relative</Select.Option>
              <Select.Option value='Other'>Other</Select.Option>
            </Select>
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
      </Form.Item>
    </>
  );
};

export default ApplicationHousingForm;
