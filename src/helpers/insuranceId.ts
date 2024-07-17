export const isValidInsuranceId = (id: string | undefined) => {
  if (!id) {
    return false;
  }

  const match = id.match(/^([A-Z]{1})([\d]{8})([\d]{1})$/);
  if (match) {
    const cardNo = ('0' + (match[1].charCodeAt(0) - 64)).slice(-2) + match[2];
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      let d = parseInt(cardNo[i], 10);
      if (i % 2 === 1) {
        d *= 2;
      }
      if (d > 9) {
        d -= 9;
      }
      sum += d;
    }
    return sum % 10 === parseInt(match[3], 10);
  }
  return false;
};
