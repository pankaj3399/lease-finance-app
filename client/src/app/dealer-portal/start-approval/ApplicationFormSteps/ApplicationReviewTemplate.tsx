import { Card, Descriptions } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

type Props = {
  application: any;
};

const ApplicationReviewTemplate = (props: Props) => {
  const { application } = props;
  return (
    <>
      <Card title='Applicant Contact Info'>
        <Descriptions
          bordered
          items={[
            {
              key: '1',
              label: 'Name',
              children: `${application?.firstName} ${application?.middleName} ${application?.lastName}`,
              span: 4,
            },
            {
              key: '2',
              label: 'Phone Number',
              children: `${application?.phoneNumberType} : ${application?.phoneNumber}`,
              span: 4,
            },
            {
              key: '3',
              label: 'Email',
              children: application?.email,
              span: 4,
            },
          ]}
        />
      </Card>
      <Card title='Applicant Housing'>
        <Descriptions
          bordered
          items={[
            {
              key: '1',
              label: 'Address',
              children: (
                <>
                  {application?.currentAddress?.isSameAsApplicant ? (
                    'Same As Applicant'
                  ) : (
                    <p>
                      {application?.currentAddress?.isRuralRoute
                        ? `${application?.currentAddress?.ruralRoute} ${application?.currentAddress?.box}`
                        : application?.currentAddress?.street}
                      <br />
                      {application?.currentAddress?.city},{' '}
                      {application?.currentAddress?.state}{' '}
                      {application?.currentAddress?.zipCode}
                    </p>
                  )}
                </>
              ),
              span: 4,
            },
            {
              key: '2',
              label: 'Housing Status',
              children: application?.currentAddress
                ?.isSameMortageInformationAsApplicant
                ? 'Same As Applicant'
                : application?.currentAddress?.housingStatus,
              span: 4,
            },
            {
              key: '3',
              label: 'Time at Address',
              children: (
                <>
                  {application?.currentAddress?.yearsAtAddress ?? 0} Years{' '}
                  {application?.currentAddress?.monthsAtAddress ?? 0} Months
                </>
              ),
              span: 4,
            },
            {
              key: '4',
              label: 'Mortage Payment/Rent',
              children: <>{application?.currentAddress?.mortage ?? 0}$ </>,
              span: 4,
            },
            {
              key: '5',
              label: 'Date of Birth',
              children: <>{dayjs(application?.dob).format('DD/MM/YYYY')}</>,
              span: 4,
            },
            {
              key: '6',
              label: 'SSN/TIN',
              children: <>{application?.SSN}</>,
              span: 4,
            },
          ]}
        />
      </Card>
      <Card title='Applicant Previous Address'>
        <Descriptions
          bordered
          items={[
            {
              key: '1',
              label: 'Address',
              children: (
                <>
                  {application?.previousAddress?.isSameAsApplicant ? (
                    'Same As Applicant'
                  ) : (
                    <p>
                      {application?.previousAddress?.isRuralRoute
                        ? `${application?.previousAddress?.ruralRoute} ${application?.previousAddress?.box}`
                        : application?.previousAddress?.street}
                      <br />
                      {application?.previousAddress?.city},{' '}
                      {application?.previousAddress?.state}{' '}
                      {application?.previousAddress?.zipCode}
                    </p>
                  )}
                </>
              ),
              span: 4,
            },
          ]}
        />
      </Card>
      <Card title='Applicant Employement'>
        <Descriptions
          bordered
          items={[
            {
              key: '1',
              label: 'Employement Status',
              children: application?.currentEmployement?.employementStatus,
              span: 4,
            },
            {
              key: '2',
              label: 'Employer',
              children: application?.currentEmployement?.employer,
              span: 4,
            },
            {
              key: '3',
              label: 'Work Title',
              children: application?.currentEmployement?.workTitle,
              span: 4,
            },
            {
              key: '4',
              label: 'Work Phone',
              children: application?.currentEmployement?.workPhone,
              span: 4,
            },
            {
              key: '5',
              label: 'Time At Job',
              children: (
                <>
                  {application?.currentEmployement?.yearsAtJob ?? 0} Years{' '}
                  {application?.currentEmployement?.monthsAtJob ?? 0} Months
                </>
              ),
              span: 4,
            },
            {
              key: '6',
              label: 'Income',
              children: (
                <>
                  {application?.currentEmployement?.incomeSource}, $
                  {application?.currentEmployement?.annualIncome} Per Year
                </>
              ),
              span: 4,
            },
          ]}
        />
      </Card>
      <Card title='Applicant Previous Employement'>
        <Descriptions
          bordered
          items={[
            {
              key: '1',
              label: 'Employement Status',
              children: application?.previousEmployement?.employementStatus,
              span: 4,
            },
            {
              key: '2',
              label: 'Employer',
              children: application?.previousEmployement?.employer,
              span: 4,
            },
            {
              key: '3',
              label: 'Work Title',
              children: application?.previousEmployement?.workTitle,
              span: 4,
            },
            {
              key: '4',
              label: 'Work Phone',
              children: application?.previousEmployement?.workPhone,
              span: 4,
            },
            {
              key: '5',
              label: 'Time At Job',
              children: (
                <>
                  {application?.previousEmployement?.yearsAtJob ?? 0} Years{' '}
                  {application?.previousEmployement?.monthsAtJob ?? 0} Months
                </>
              ),
              span: 4,
            },
          ]}
        />
      </Card>
    </>
  );
};

export default ApplicationReviewTemplate;
