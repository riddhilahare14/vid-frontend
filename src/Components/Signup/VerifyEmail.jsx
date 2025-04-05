import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      try {
        const res = await fetch(`/api/verify-email?token=${token}`);
        const data = await res.json();

        if (res.status === 200) {
          setStatus('Email verified successfully!');
        } else {
          setStatus(data.error || 'Something went wrong.');
        }
      } catch (err) {
        setStatus('Error during verification.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h2>Email Verification Status</h2>
      <p>{status}</p>
    </div>
  );
};

export default VerifyEmail;
