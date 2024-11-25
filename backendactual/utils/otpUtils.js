const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
  };
  
  const isOtpExpired = (expiryTime) => {
    return new Date() > expiryTime;
  };
  
  module.exports = { generateOTP, isOtpExpired };
  