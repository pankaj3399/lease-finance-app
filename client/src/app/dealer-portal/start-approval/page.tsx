import {
  CarOutlined,
  CaretLeftOutlined,
  DollarOutlined,
} from '@ant-design/icons';

import React from 'react';
import ApplicationForm from './ApplicationForm';
import Link from 'next/link';

const page = () => {
  return (
    <div className='flex items-center flex-col justify-center pb-[100px] pt-10'>
      <div className='bg-gray-600 w-full text-white py-3 hover:text-blue-400'>
        <Link
          href='/dealer-portal'
          className='flex items-center justify-center mr-4'
        >
          <CaretLeftOutlined className='text-2xl' />
          Go to dealer portal
        </Link>
      </div>
      <div className='header flex items-center space-x-2 py-3 px-5 bg-gray-200 w-full'>
        <CarOutlined className='text-4xl' />
        <h2 className='text-xl font-semibold'>Patriot Leasing</h2>
      </div>
      <div className='sub-header flex items-center justify-center w-full py-3 bg-gray-500 text-white space-x-2'>
        <DollarOutlined className='text-2xl' />
        <h2 className='text-md font-semibold'>Get Financing Now!</h2>
      </div>
      <ApplicationForm />
    </div>
  );
};

export default page;
