export const formatBirthdate = (birthday: string) => {
  const cleanedInput = birthday.replace(/[^0-9]/g, '');

  let formattedInput = cleanedInput.slice(0, 4);

  if (cleanedInput.length > 4) {
    formattedInput += '-' + cleanedInput.slice(4, 6);
  }

  if (cleanedInput.length > 6) {
    formattedInput += '-' + cleanedInput.slice(6, 8);
  }

  return formattedInput;
};
