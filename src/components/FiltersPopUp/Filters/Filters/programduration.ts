export const programDuration = (data: any[], programDuration: string[]) => {
    if (programDuration.length === 0 && data.length > 0) return data;
    return data.reduce((acc: any[], item: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        programDuration.some((carrier: string) =>
            item.programDuration.includes(carrier)
        )
            ? acc.push(item)
            : null;
        return acc;
    }, []);
};