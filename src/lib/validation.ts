export const validatePhoneNumber = (value: string) => {
    if (!value) return true; 
    const regex = /^\+?[0-9]{7,15}$/;
    return regex.test(value) || "Enter a valid phone number";
  };
  
  
  export const validateUrl = (value: string) => {
    if (!value) return true; 
    try {
      new URL(value);
      return true;
    } catch {
      return "Enter a valid URL";
    }
  };
  
  export const validateMinLength = (value: string, min: number, message?: string) => {
    if (!value || value.length < min) return message || `Must be at least ${min} characters`;
    return true;
  };

  export const validateMaxLength = (value: string, max: number, message?: string) => {
    if (value.length > max) return message || `Cannot exceed ${max} characters`;
    return true;
  };
  
 
  export const validateRequired = (value: string, message?: string) => {
    if (!value || value.trim() === "") return message || "This field is required";
    return true;
  };
  