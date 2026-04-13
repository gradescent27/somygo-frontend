import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiService } from '../config/api';

const FlutterwaveInline = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const requestId = searchParams.get('requestId');

  useEffect(() => {
    const loadPaymentData = async () => {
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
            const { iframeUrl } = response.data;
            
            if (iframeUrl) {
              // Load Flutterwave inline payment directly
              setPaymentData({ iframeUrl });
              setLoading(false);
              
              // Inject Flutterwave inline script
              const script = document.createElement('script');
              script.src = 'https://checkout.flutterwave.com/v3.js';
              script.async = true;
              document.body.appendChild(script);
              
              script.onload = () => {
                // Open Flutterwave modal directly
                openFlutterwaveModal(iframeUrl);
              };
            } else {
              setError('Payment URL not available');
              setLoading(false);
            }
            
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
        console.error('Error loading payment data:', err);
        setError('Failed to load payment information');
        setLoading(false);
      }
    };

    loadPaymentData();
  }, [requestId]);

  const openFlutterwaveModal = (iframeUrl) => {
    // Create a modal container
    const modalContainer = document.createElement('div');
    modalContainer.id = 'flw-modal-container';
    modalContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      height: 600px;
      position: relative;
      overflow: hidden;
    `;

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: white;
      border: none;
      font-size: 30px;
      cursor: pointer;
      z-index: 1000000;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    closeButton.onclick = () => {
      document.body.removeChild(modalContainer);
    };

    const iframe = document.createElement('iframe');
    iframe.src = iframeUrl;
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
    `;

    modalContent.appendChild(closeButton);
    modalContent.appendChild(iframe);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);

    // Listen for payment completion
    window.addEventListener('message', (event) => {
      if (event.data && (event.data.event === 'flw-payment-complete' || event.data.status === 'successful')) {
        console.log('Payment completed:', event.data);
        // Redirect to success page
        window.location.href = '/payment/success';
      }
    });
  };

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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Payment Ready</h2>
        <p style={styles.message}>Your payment modal will open automatically...</p>
      </div>
    </div>
  );
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

export default FlutterwaveInline;
