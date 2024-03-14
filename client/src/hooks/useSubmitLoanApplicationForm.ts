import { axiosAuth } from '@/lib/axios';
import React, { useState } from 'react';

const useSubmitLoanApplicationForm = () => {
  const [loading, setLoading] = useState(false);

  const submitLoanApplication = async (values: any) => {
    try {
      setLoading(true);
      const res = await axiosAuth.post('/loan-application', values);

      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    submitLoanApplication,
  };
};

export default useSubmitLoanApplicationForm;
