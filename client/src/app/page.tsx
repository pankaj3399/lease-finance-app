import { Button } from 'antd';
import Title from 'antd/es/typography/Title';

import CompanyLogo from '@/components/CompanyLogo';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[100dvh]'>
      <CompanyLogo />
      <Title>Application portal</Title>
      <Button type='primary' size='large' href='/login'>
        Login now
      </Button>
    </div>
  );
}
