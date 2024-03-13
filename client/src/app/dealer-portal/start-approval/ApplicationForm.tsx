'use client';

import { Card, Form } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useCallback, useMemo, useState } from 'react';
import ApplicationContactInfoForm from './ApplicationFormSteps/ApplicationContactInfoForm';
import ApplicationHousingForm from './ApplicationFormSteps/ApplicationHousingForm';

const ApplicationForm = () => {
  const [form] = Form.useForm();

  const [isRuralRoute, setIsRuralRoute] = useState(false);

  const onSubmit = (values: any) => {
    console.log({ values });
  };

  const [stepsIndex, setStepsIndex] = useState(0);

  const onNextHandler = useCallback(() => {
    setStepsIndex((prev) => prev + 1);
  }, []);

  const toggleCheckIsRuralRoute = () => {
    setIsRuralRoute((prev) => !prev);
  };

  const steps = useMemo(
    () => [
      {
        title: 'Application Contact Info',
        form: (
          <ApplicationContactInfoForm
            onNextHandler={onNextHandler}
            baseFieldName='firstApplication'
          />
        ),
      },
      {
        title: 'Application Housing',
        form: (
          <ApplicationHousingForm
            isRuralRoute={isRuralRoute}
            toggleCheckIsRuralRoute={toggleCheckIsRuralRoute}
            baseFieldName='firstApplication'
          />
        ),
      },
    ],
    [onNextHandler, isRuralRoute]
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
