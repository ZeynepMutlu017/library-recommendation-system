import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { handleApiError, showSuccess } from '@/utils/errorHandling';

export function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [emailInput, setEmailInput] = useState(email);
  
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      alert('Please enter verification code');
      return;
    }

    setIsLoading(true);
    try {
      await confirmSignUp({
        username: emailInput,
        confirmationCode: code,
      });
      
      showSuccess('Email verified successfully! Please login.');
      navigate('/login');
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await resendSignUpCode({ username: emailInput });
      showSuccess('Verification code sent to your email!');
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">
            Verify Your Email
          </h2>
          <p className="text-slate-600">
            We sent a verification code to{' '}
            <span className="font-semibold">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="mt-8 space-y-6">
          <Input
            label="Email"
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="your@email.com"
            required
          />
          <Input
            label="Verification Code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            required
            autoFocus
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Didn't receive code? Resend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}