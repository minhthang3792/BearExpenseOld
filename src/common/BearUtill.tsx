const isEmpty = (obj: any) => {
  return obj === null || obj === undefined || Object.keys(obj).length === 0;
};

export const BearUtil = {
  isEmpty,
};
