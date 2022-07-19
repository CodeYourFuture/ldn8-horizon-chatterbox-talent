export const isActivelyHiring = (data: any[], isActivelyHiring: string[]) => {
  if (isActivelyHiring.length === 0 && data.length > 0) return data;
  return data.filter((item: any) => item.isActivelyHiring);
};
