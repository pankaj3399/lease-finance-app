import Image from 'next/image';
import React from 'react';

const CompanyLogo = () => {
  return (
    <Image
      priority
      src='/logo.png'
      width={500}
      height={500}
      alt='company-logo'
    />
  );
};

export default CompanyLogo;
