export const regex = {
  ID: /^$/,
  PHONE_VERIFICATION_CODE: /^\d+$/g,
  BIRTHDATE: /^$/,
  NICKNAME: /^[가-힣\s]*$/,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PHONE: /^(\d){3}-(\d){4}-(\d){4}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
  EMAIL_VERIFICATION_CODE: /^\d+$/g,
  USERNAME: /^[가-힣\s]*$/,
  NUMBER: /^\d+$/g,
};
