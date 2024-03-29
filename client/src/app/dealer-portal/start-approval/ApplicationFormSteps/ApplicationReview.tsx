import { Button, Checkbox, Divider, Form, Typography } from 'antd';
import React from 'react';
import Link from 'next/link';

import ApplicationReviewTemplate from './ApplicationReviewTemplate';

type Props = {
  values: any;
  onPrevHandler: () => void;
  onSubmitHandler: () => void;
  isLoading: boolean;
};

const ApplicationReview = (props: Props) => {
  const { values, onPrevHandler, onSubmitHandler, isLoading } = props;

  const firstApplication = values?.firstApplication;
  const secondApplication = values?.secondApplication;

  return (
    <div className='space-y-4'>
      <h2>Please review your information before you submit the application</h2>
      <ApplicationReviewTemplate application={firstApplication} />

      {secondApplication && (
        <>
          <Divider />
          <Typography.Title level={3}>Co-Application</Typography.Title>
          <ApplicationReviewTemplate application={secondApplication} />
        </>
      )}

      <div className='space-y-5 !mb-10'>
        <Form.Item
          rules={[
            {
              validator: (rule, value) => {
                if (value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('You must check this to proceed')
                );
              },
            },
          ]}
          name='agreeTermsAndConditions'
          valuePropName='checked'
        >
          <Checkbox>
            <p className='max-w-[500px]'>
              I have read and agree to the{' '}
              <Link href='/terms-and-conditions' target='_blank'>
                Terms and Conditions
              </Link>{' '}
              By clicking &quot;Submit&quot;, I authorize you to check my credit
              report.
            </p>
          </Checkbox>
        </Form.Item>
        <Form.Item
          rules={[
            {
              validator: (rule, value) => {
                if (value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('You must check this to proceed')
                );
              },
            },
          ]}
          name='agreePrivacyNotice'
          valuePropName='checked'
        >
          <Checkbox>
            <p>
              I have read and agree to the terms of the{' '}
              <Link href='/privacy-notice' target='_blank'>
                Privacy Notice
              </Link>
              .
            </p>
          </Checkbox>
        </Form.Item>
      </div>

      <div className='flex justify-between'>
        <Button size='large' onClick={onPrevHandler} disabled={isLoading}>
          Back
        </Button>
        <Button
          type='primary'
          size='large'
          onClick={onSubmitHandler}
          disabled={isLoading}
          loading={isLoading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ApplicationReview;
