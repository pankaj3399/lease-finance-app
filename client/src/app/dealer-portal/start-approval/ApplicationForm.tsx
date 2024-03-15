'use client';

import { useRouter } from 'next/navigation';
import { Card, Form, message } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
  const [reachedEnd, setReachedEnd] = useState(false);

  const getProgress = () => {
    if (reachedEnd) {
      return 100;
    }

    const JOINT_STEPS = 11;
    const INVIDUAL_STEPS = 6;

    const steps = stepsIndex;

    if (applicationType === 'joint') {
      return Math.round((steps / JOINT_STEPS) * 100);
    } else {
      return Math.round((steps / INVIDUAL_STEPS) * 100);
    }
  };

  const onSubmit = async (values: any) => {
    console.log({ values });
    try {
      await submitLoanApplication(values);
      router.push('/dealer-portal/success');
    } catch (err) {
      if (err instanceof Error) {
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
    async (fields: (string | string[])[], redirectToReview?: boolean) => {
      try {
        await form.validateFields(fields);
        if (redirectToReview) {
          if (applicationType === 'joint') {
            setStepsIndex(10);
          } else {
            setStepsIndex(5);
          }
        } else {
          setStepsIndex((prev) => prev + 1);
        }
      } catch (err) {
        console.log({ err });
      }
    },
    [form, applicationType]
  );

  const IndividualSteps = useMemo(
    () => [
      {
        title: 'Application Contact Info',
        form: (
          <ApplicationContactInfoForm
            onNextHandler={onNextHandler}
            baseFieldName='firstApplication'
            formInstance={form}
            isFormComplete={reachedEnd}
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
            isFormComplete={reachedEnd}
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
            isFormComplete={reachedEnd}
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
            formInstance={form}
            isFormComplete={reachedEnd}
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
            applicationType={applicationType}
            isFormComplete={reachedEnd}
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
    [onNextHandler, onPrevHandler, form, loading, reachedEnd, applicationType]
  );

  const JointSteps = useMemo(
    () => [
      {
        title: 'Application Contact Info',
        form: (
          <ApplicationContactInfoForm
            onNextHandler={onNextHandler}
            baseFieldName='firstApplication'
            formInstance={form}
            isFormComplete={reachedEnd}
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
            isFormComplete={reachedEnd}
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
            isFormComplete={reachedEnd}
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
            formInstance={form}
            isFormComplete={reachedEnd}
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
            applicationType={applicationType}
            isFormComplete={reachedEnd}
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
            formInstance={form}
            isFormComplete={reachedEnd}
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
            isFormComplete={reachedEnd}
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
            isFormComplete={reachedEnd}
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
            formInstance={form}
            isFormComplete={reachedEnd}
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
            applicationType={applicationType}
            isFormComplete={reachedEnd}
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
    [onNextHandler, onPrevHandler, form, loading, reachedEnd, applicationType]
  );

  const titleNode =
    applicationType === 'individual'
      ? IndividualSteps[stepsIndex]?.title
      : JointSteps[stepsIndex]?.title;

  const formNode =
    applicationType === 'individual' ? IndividualSteps : JointSteps;

  useEffect(() => {
    if (stepsIndex + 1 == formNode?.length) {
      setReachedEnd(true);
    }
  }, [formNode?.length, stepsIndex]);

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
              phoneNumberType: 'Home',
              incomeSources: [
                {
                  incomeSource: undefined,
                  annualIncome: undefined,
                },
              ],
            },
            secondApplication: {
              phoneNumberType: 'Home',
              currentAddress: {
                isSameAsApplicant: false,
                isSameMortageInformation: false,
              },
              incomeSources: [
                {
                  incomeSource: undefined,
                  annualIncome: undefined,
                },
              ],
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
        <div className='w-full bg-neutral-200 my-5 rounded-md'>
          <div
            className='bg-blue-500 p-0.5 text-center text-xs font-medium leading-none text-white rounded-md'
            style={{ width: `${getProgress()}%` }}
          >
            {getProgress()}%
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ApplicationForm;
