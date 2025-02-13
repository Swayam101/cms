export const numberFormatter = (amount: number): string => {
  let formattedAmount: string;
  if (amount >= 1_00_00_000) {
    formattedAmount = `${(amount / 1_00_00_000).toFixed(2)} Cr`;
  } else if (amount >= 1_000) {
    formattedAmount = `${(amount / 1_000).toFixed(2)} K`;
  } else {
    formattedAmount = `${amount}`;
  }

  return formattedAmount ?? 0;
};
