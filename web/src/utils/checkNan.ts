export const checkNan = (e: number) => {
  if (isNaN(e)) {
    return 0;
  }
  return e;
};
