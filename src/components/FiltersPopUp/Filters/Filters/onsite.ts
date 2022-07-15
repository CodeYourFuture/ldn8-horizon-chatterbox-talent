export const onSite = (data: any[], onSite: string[]) => {
    if (onSite.length === 0 && data.length > 0) return data;
    return data.reduce<any[]>((acc: any, item: any) =>{
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onSite.some((onSite) => item.onSite.includes(onSite))
            ? acc.push(item)
            : null;
        return acc;
    }, []);
};