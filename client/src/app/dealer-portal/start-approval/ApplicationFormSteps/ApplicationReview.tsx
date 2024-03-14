import {
  Button,
  Card,
  Checkbox,
  Descriptions,
  Divider,
  Typography,
} from 'antd';
import React from 'react';
import dayjs from 'dayjs';
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

      <div className='flex flex-col space-y-5 !mb-10'>
        <div className='flex items-center  gap-4'>
          <Checkbox required />
          <p className='max-w-[400px]'>
            I have read and agree to the{' '}
            <Link href='/terms-and-conditions' target='_blank'>
              Terms and Conditions
            </Link>{' '}
            By clicking &quot;Submit&quot;, I authorize you to check my credit
            report.
          </p>
        </div>
        <div className='flex items-center gap-4'>
          <Checkbox required />
          <p>
            I have read and agree to the terms of the{' '}
            <Link href='/privacy-notice' target='_blank'>
              Privacy Notice
            </Link>
            .
          </p>
        </div>
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
