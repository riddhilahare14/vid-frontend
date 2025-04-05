import { useState } from 'react';
import { Mail, ArrowRight, Send, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function EmailVerification({ email }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false); // Track if email was sent

  const handleSendVerificationEmail = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Send API request to backend to send the verification email
      const response = await axios.post('/api/send-verification-email', { email });
      
      if (response.status === 200) {
        setEmailSent(true); // Email has been sent successfully
      }
    } catch (err) {
      setError('Failed to send email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToGmail = () => {
    window.open('https://gmail.com', '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-blue-600" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 rounded-full animate-bounce" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Check your inbox
        </h1>

        <div className="text-center mb-8 space-y-4">
          <p className="text-gray-600">
            We sent a verification link to:
          </p>
          <p className="text-lg font-medium text-gray-800 break-all">
          {email}
          </p>
          <p className="text-gray-600">
            Click the link in the email to verify your address and continue.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={goToGmail}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600  hover:bg-gradient-to-r from-blue-700 to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Open Gmail
            <ArrowRight className="w-4 h-4" />
          </button>

          {!emailSent ? (
            <button
              onClick={handleSendVerificationEmail}
              disabled={isLoading}
              className={`w-full border-2 border-blue-600 text-blue-600 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50'}`}
            >
              {isLoading ? (
                <>
                  Sending...
                  <span className="animate-spin">
                    <Send className="w-4 h-4" />
                  </span>
                </>
              ) : (
                <>
                  Send Verification Email
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <p className="text-green-600 font-medium">Verification email sent successfully!</p>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <button 
            onClick={() => window.location.href = '/support'}
            className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
          >
            Need help? Contact support
          </button>
        </div>
      </div>
    </div>
  );
}
