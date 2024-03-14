'use client';

import { useRouter } from 'next/navigation';
import { Card, Form, message } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useCallback, useMemo, useState } from 'react';

import useSubmitLoanApplicationForm from '@/hooks/useSubmitLoanApplicationForm';

import {
  ApplicationContactInfoForm,
  ApplicationHousingForm,
  ApplicationPreviousAddressForm,
  ApplicationEmployementForm,
  ApplicationPreviousEmployementForm,
  ApplicationReview,
} from './ApplicationFormSteps';
import useAxiosAuth from '@/hooks/useAxiosAuth';

const ApplicationForm = () => {
  useAxiosAuth();

  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, context] = message.useMessage();

  const { submitLoanApplication, loading } = useSubmitLoanApplicationForm();

  const applicationType = Form.useWatch('applicationType', form);

  const [stepsIndex, setStepsIndex] = useState(0);

  const onSubmit = async (values: any) => {
    try {
      await submitLoanApplication(values);
      router.push('/dealer-portal/success');
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        messageApi.error('Something went wrong! Please try again');
      }
    }
  };

  const onPrevHandler = useCallback(() => {
    if (stepsIndex > 0) {
      setStepsIndex((prev) => prev - 1);
    }
  }, [stepsIndex]);

  const onNextHandler = useCallback(
    async (fields: string[] | string[][]) => {
      try {
        await form.validateFields(fields);
        setStepsIndex((prev) => prev + 1);
      } catch (err) {
        console.log({ err });
      }
    },
    [form]
  );

  const IndividualSteps = useMemo(
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
            onNextHandler={onNextHandler}
            onPrevHandler={onPrevHandler}
            baseFieldName='firstApplication'
            formInstance={form}
          />
        ),
      },
      {
        title: 'Application Previous Address',
        form: (
          <ApplicationPreviousAddressForm
            baseFieldName='firstApplication'
            onPrevHandler={onPrevHandler}
            onNextHandler={onNextHandler}
            formInstance={form}
          />
        ),
      },
      {
        title: 'Application Employement',
        form: (
          <ApplicationEmployementForm
            baseFieldName='firstApplication'
            onNextHandler={onNextHandler}
            onPrevHandler={onPrevHandler}
          />
        ),
      },
      {
        title: 'Application Previous Employement',
        form: (
          <ApplicationPreviousEmployementForm
            baseFieldName='firstApplication'
            onNextHandler={onNextHandler}
            onPrevHandler={onPrevHandler}
          />
        ),
      },
      {
        title: 'Application Review',
        form: (
          <ApplicationReview
            values={form.getFieldsValue()}
            onPrevHandler={onPrevHandler}
            onSubmitHandler={() => form.submit()}
            isLoading={loading}
          />
        ),
      },
    ],
    [onNextHandler, onPrevHandler, form, loading]
  );

  const JointSteps = useMemo(
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
            onNextHandler={onNextHandler}
            onPrevHandler={onPrevHandler}
            baseFieldName='firstApplication'
            formInstance={form}
          />
        ),
      },
      {
        title: 'Application Previous Address',
        form: (
          <ApplicationPreviousAddressForm
            baseFieldName='firstApplication'
            onPrevHandler={onPrevHandler}
            onNextHandler={onNextHandler}
            formInstance={form}
          />
        ),
      },
      {
        title: 'Application Employement',
        form: (
          <ApplicationEmployementForm
            baseFieldName='firstApplication'
            onNextHandler={onNextHandler}
            onPrevHandler={onPrevHandler}
          />
        ),
      },
      {
        title: 'Application Previous Employement',
        form: (
          <ApplicationPreviousEmployementForm
            baseFieldName='firstApplication'
            onNextHandler={onNextHandler}
            onPrevHandler={onPrevHandler}
          />
        ),
      },
      {
        title: 'Co-Application Contact Info',
        form: (
          <ApplicationContactInfoForm
            onNextHandler={onNextHandler}
            baseFieldName='secondApplication'
            onPrevHandler={onPrevHandler}
          />
        ),
      },
      {
        title: 'Co-Application Housing',
        form: (
          <ApplicationHousingForm
            onNextHandler={onNextHandler}
            onPrevHandler={onPrevHandler}
            baseFieldName='secondApplication'
            formInstance={form}
          />
        ),
      },
      {
        title: 'Co-Application Previous Address',
        form: (
          <ApplicationPreviousAddressForm
            baseFieldName='secondApplication'
            onPrevHandler={onPrevHandler}
            onNextHandler={onNextHandler}
            formInstance={form}
          />
        ),
      },
      {
        title: 'Co-Application Employement',
        form: (
          <ApplicationEmployementForm
            baseFieldName='secondApplication'
            onNextHandler={onNextHandler}
            onPrevHandler={onPrevHandler}
          />
        ),
      },
      {
        title: 'Co-Application Previous Employement',
        form: (
          <ApplicationPreviousEmployementForm
            baseFieldName='secondApplication'
            onNextHandler={onNextHandler}
            onPrevHandler={onPrevHandler}
          />
        ),
      },
      {
        title: 'Application Review',
        form: (
          <ApplicationReview
            values={form.getFieldsValue()}
            onPrevHandler={onPrevHandler}
            onSubmitHandler={() => form.submit()}
            isLoading={loading}
          />
        ),
      },
    ],
    [onNextHandler, onPrevHandler, form, loading]
  );

  const titleNode =
    applicationType === 'individual'
      ? IndividualSteps[stepsIndex]?.title
      : JointSteps[stepsIndex]?.title;

  const formNode =
    applicationType === 'individual' ? IndividualSteps : JointSteps;

  return (
    <div className='flex flex-col mt-12 mx-2 max-w-[800px]'>
      {context}

      <p className='font-semibold text-gray-400'>
        Steps {stepsIndex + 1} of {formNode.length}
      </p>
      <Title level={4}>{titleNode}</Title>

      <Card>
        <Form
          name='application-form'
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={onSubmit}
          initialValues={{
            applicationType: 'individual',
            firstApplication: {
              phoneNumberType: 'home',
            },
          }}
        >
          {formNode.map((step, idx) => (
            <div
              key={step.title}
              className={`${idx !== stepsIndex && 'hidden'}`}
            >
              {step.form}
            </div>
          ))}
        </Form>
      </Card>
    </div>
  );
};

export default ApplicationForm;
