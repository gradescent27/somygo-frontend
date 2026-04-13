import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiService } from '../config/api';

const FlutterwaveModal = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestId = searchParams.get('requestId');

  useEffect(() => {
    const loadPaymentModal = async () => {
      if (!requestId) {
        setError('No request ID provided');
        setLoading(false);
        return;
      }

      try {
        // Poll for automation completion
        const pollStatus = async () => {
          const response = await apiService.checkPaymentStatus(requestId);
          
          if (response.data.status === 'completed') {
            const { checkoutUrl, iframeUrl, sessionCookies, sessionStorage } = response.data;
            
            console.log('Automation completed. Iframe URL:', iframeUrl);
            
            // If we have an iframe URL, use it directly (it's the payment modal URL)
            if (iframeUrl) {
              // The iframe URL is the direct payment modal - redirect to it
              console.log('Redirecting to payment modal:', iframeUrl);
              window.location.href = iframeUrl;
              return;
            }
            
            // Fallback: restore session and redirect to main checkout URL
            console.log('No iframe URL, restoring session and redirecting');
            
            if (sessionStorage) {
              // Restore localStorage
              Object.keys(sessionStorage).forEach(key => {
                try {
                  localStorage.setItem(key, sessionStorage[key]);
                } catch (e) {
                  console.warn('Could not restore localStorage item:', key);
                }
              });
            }
            
            // Redirect to the checkout URL
            window.location.href = checkoutUrl;
            
          } else if (response.data.status === 'failed') {
            setError(response.data.errorMessage || 'Automation failed');
            setLoading(false);
          } else {
            // Still processing, poll again
            setTimeout(pollStatus, 2000);
          }
        };
        
        pollStatus();
        
      } catch (err) {
        console.error('Error loading payment modal:', err);
        setError('Failed to load payment information');
        setLoading(false);
      }
    };

    loadPaymentModal();
  }, [requestId]);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.spinner}></div>
          <h2 style={styles.title}>Preparing Your Payment</h2>
          <p style={styles.message}>
            Please wait while we set up your secure payment...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.errorIcon}>⚠️</div>
          <h2 style={styles.title}>Payment Error</h2>
          <p style={styles.message}>{error}</p>
          <button 
            style={styles.button}
            onClick={() => window.location.href = '/'}
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return null;
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  spinner: {
    width: '60px',
    height: '60px',
    margin: '0 auto 20px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  errorIcon: {
    fontSize: '60px',
    marginBottom: '20px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '12px'
  },
  message: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.6'
  },
  button: {
    marginTop: '24px',
    padding: '12px 32px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s'
  }
};

// Add CSS animation for spinner
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default FlutterwaveModal;
