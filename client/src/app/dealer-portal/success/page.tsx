import { Button } from 'antd';
import Image from 'next/image';
import React from 'react';

const page = () => {
  return (
    <div className='flex  flex-col w-full items-center justify-center min-h-[100dvh] space-y-5'>
      <Image src='/success.png' width={200} height={200} alt='success image' />
      <h2 className='text-2xl font-semibold text-green-500'>
        Application Successfully Submitted
      </h2>
      <Button href='/dealer-portal'>Go back</Button>
    </div>
  );
};

export default page;
