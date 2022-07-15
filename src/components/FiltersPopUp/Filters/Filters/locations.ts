export const locations = (data: any[], location: string[]) => {
    if (location.length === 0 && data.length > 0) return data;
    return data.reduce<any[]>((acc: any, item: any) =>{
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        location.some((loc) => item.locations.includes(loc))
            ? acc.push(item)
            : null;
        return acc;
    }, []);
};