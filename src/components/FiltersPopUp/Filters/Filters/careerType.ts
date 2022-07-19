export const careerType = (data: any[], careerType: string[]) => {
  if (careerType.length === 0 && data.length > 0) return data;
  return data.reduce((acc: any[], item: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    careerType.some((carrier: string) => item.careerType.includes(carrier)) ? acc.push(item) : null;
    return acc;
  }, []);
};
