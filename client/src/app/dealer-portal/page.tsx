import React from "react";
import Title from "antd/es/typography/Title";

import CompanyLogo from "@/components/CompanyLogo";
import { Button } from "antd";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] space-y-10">
      <CompanyLogo />
      <section
        id="start-approval"
        className="flex flex-col px-2 items-center max-w-[600px]"
      >
        <Title className="text-center" level={2}>
          Click on the <span className="text-green-500">GREEN</span> button
          below to start your application process to become approved with
          Finance My Cars.
        </Title>
        <Button
          className="!text-white !bg-green-500"
          size="large"
          href="/dealer-portal/start-approval"
        >
          Start Approval Application
        </Button>
      </section>
      <section
        id="start-approval"
        className="flex flex-col px-2 items-center max-w-[600px]"
      >
        <Title className="text-center" level={2}>
          Click on the <span className="text-yellow-400">YELLOW</span> button
          below to finish your application process and upload your book out info
          sheet.
        </Title>
        <Button
          className="!text-black !bg-yellow-500"
          size="large"
          href="https://forms.gle/RndUowKvsNdyexPE9"
          target="_blank"
        >
          Finish Approval Application
        </Button>
      </section>
    </div>
  );
};

export default page;
