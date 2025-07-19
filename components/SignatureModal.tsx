
import React, { useRef, useEffect } from 'react';

interface SignatureModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
}

const SignatureModal: React.FC<SignatureModalProps> = ({ show, onClose, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<any>(null);

  const resizeCanvas = () => {
    if (canvasRef.current) {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d")?.scale(ratio, ratio);
        if (signaturePadRef.current) {
            signaturePadRef.current.clear(); // Clear signature on resize
        }
    }
  };

  useEffect(() => {
    if (show && canvasRef.current) {
      signaturePadRef.current = new window.SignaturePad(canvasRef.current, {
        backgroundColor: 'rgb(255, 255, 255)',
      });
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [show]);

  const handleClear = () => {
    signaturePadRef.current?.clear();
  };

  const handleSave = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const dataUrl = signaturePadRef.current.toDataURL('image/png');
      onSave(dataUrl);
    } else {
      alert('Please provide a signature first.');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Please Sign Below</h3>
        </div>
        <div className="p-4">
          <canvas
            ref={canvasRef}
            className="w-full h-48 border border-gray-300 rounded-md"
          ></canvas>
        </div>
        <div className="flex justify-end p-4 border-t space-x-2">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 font-semibold"
          >
            Clear
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 font-semibold"
          >
            Save Signature
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureModal;