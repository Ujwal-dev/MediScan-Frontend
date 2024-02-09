import React, { useRef } from 'react';
import "./otpfield.css"

const OTPField = ({ numInputs, otp, setOtp }) => {
  const inputRefs = useRef(new Array(numInputs).fill(0).map(() => React.createRef()));

  const handleInputChange = (index, value) => {
    if (isNaN(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field, if available
    if (index < numInputs - 1 && value !== '') {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleInputKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      // Move to the previous input field on backspace
      inputRefs.current[index - 1].current.focus();
    }
  };


  return (
    <div className='otp'>
      {otp.map((value, index) => (
        <input
          className='otp-input'
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleInputKeyDown(index, e)}
          ref={inputRefs.current[index]}
        />
      ))}
    </div>
  );
};

export default OTPField;
