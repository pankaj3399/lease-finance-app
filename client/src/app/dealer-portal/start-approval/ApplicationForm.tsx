'use client';

import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Input,
  Radio,
  Space,
} from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useCallback, useMemo, useState } from 'react';

const ApplicationForm = () => {
  const [form] = Form.useForm();

  const [isRuralRoute, setIsRuralRoute] = useState(false);

  console.log({ isRuralRoute });

  const onSubmit = (values: any) => {
    console.log({ values });
  };

  const [stepsIndex, setStepsIndex] = useState(0);

  const onNextHandler = useCallback(() => {
    setStepsIndex((prev) => prev + 1);
  }, []);

  const steps = useMemo(
    () => [
      {
        title: 'Application Contact Info',
        form: (
          <>
            <Form.Item label='Application Type' name='applicationType'>
              <Radio.Group>
                <Radio value='individual'> Individual </Radio>
                <Radio value='joint'> Joint </Radio>
              </Radio.Group>
            </Form.Item>
            <Divider />
            <Form.Item label='Name'>
              <Space.Compact className='gap-2'>
                <Form.Item name={['firstApplication', 'firstName']}>
                  <Input placeholder='First Name' />
                </Form.Item>
                <Form.Item name={['firstApplication', 'middleName']}>
                  <Input placeholder='Middle Name' />
                </Form.Item>
                <Form.Item name={['firstApplication', 'lastName']}>
                  <Input placeholder='Last Name' />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
            <Divider />
            <Form.Item label='Primary Phone Number'>
              <Space.Compact className='gap-2'>
                <Form.Item name={['firstApplication', 'phoneNumber']}>
                  <Radio.Group>
                    <Radio.Button value='home'>Home</Radio.Button>
                    <Radio.Button value='cell'>Cell</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name={['firstApplication', 'phoneNumber']}>
                  <Input placeholder='Phone number' />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
            <Form.Item label='Email' name={['firstApplication', 'email']}>
              <Input placeholder='Enter your email' />
            </Form.Item>
            <Divider />
            <Form.Item label="Salesperson's Name (Optional)">
              <Space.Compact className='gap-2'>
                <Form.Item name={['firstApplication', 'salesPersonFirstName']}>
                  <Input placeholder='First' />
                </Form.Item>
                <Form.Item name={['firstApplication', 'salesPersonLastName']}>
                  <Input placeholder='Last' />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 21,
              }}
            >
              <Button type='primary' onClick={onNextHandler}>
                Next
              </Button>
            </Form.Item>
          </>
        ),
      },
      {
        title: 'Application Housing',
        form: (
          <>
            <Form.Item label='Address'>
              <Form.Item>
                <Checkbox
                  value={isRuralRoute}
                  onChange={() => setIsRuralRoute((prev) => !prev)}
                >
                  I have a rural route
                </Checkbox>
              </Form.Item>
              {isRuralRoute ? (
                <>
                  <Space.Compact className='gap-2'>
                    <Form.Item
                      name={['firstApplication', 'currentAddress', 'rr']}
                    >
                      <Input placeholder='RR' />
                    </Form.Item>
                    <Form.Item>
                      <Input placeholder='BOX' />
                    </Form.Item>
                  </Space.Compact>{' '}
                </>
              ) : (
                ''
              )}
            </Form.Item>
            <Form.Item>
              <Button onClick={form.submit}>Submit</Button>
            </Form.Item>
          </>
        ),
      },
    ],
    [onNextHandler]
  );

  return (
    <div className='flex flex-col mt-12 mx-2'>
      <Title level={4}>{steps[stepsIndex]?.title}</Title>

      <Card>
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={onSubmit}
        >
          {steps[stepsIndex]?.form}
        </Form>
      </Card>
    </div>
  );
};

export default ApplicationForm;
