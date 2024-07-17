export const calculateAgeByBirthDate = (birthdate: string) => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const calculateTotalPatientTime = (arrivalTime: string) => {
  const arrivalDate = new Date(arrivalTime);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - arrivalDate.getTime();

  const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  const minutes = diffInMinutes % 60;
  const hours = diffInHours % 24;
  const days = diffInDays;

  return `${days}d ${hours}h ${minutes}m`;
};

export const getNumbersInRange = (a: number, b: number) =>
  Array(Math.abs(a - b) + 1)
    .fill(a)
    .map((v, i) => v + i * (a > b ? -1 : 1));

export const extractStatusCode = (errorMessage: string) => {
  const match = errorMessage.match(/status code (\d+)/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
};
