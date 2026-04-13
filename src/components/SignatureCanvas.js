import React, { useRef } from 'react';
import SignaturePad from 'react-signature-canvas';

const SignatureCanvas = ({ setSignature }) => {
  const sigPad = useRef(null);

  const saveSignature = () => {
    const signatureData = sigPad.current.toDataURL('image/png');
    setSignature(signatureData);
  };

  const clearSignature = () => {
    sigPad.current.clear();
    setSignature('');
  };

  return (
    <div>
      <SignaturePad
        ref={sigPad}
        canvasProps={{ className: 'w-full h-40 border border-gray-300 rounded-md' }}
      />
      <div className="flex justify-between mt-2">
        <button
          onClick={saveSignature}
          className="bg-blue-50 0 text-white px-4 py-2 rounded-md"
        >
          Save Signature
        </button>
        <button
          onClick={clearSignature}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SignatureCanvas;
