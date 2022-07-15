import { filtersArray } from "./Filters/index"

const [locations, onSite, isActivelyHiring, programDuration, careerTypes] = filtersArray;
const filtersHandle = (information: any, filters: any) => {

    const keysFilter = Object.keys(filters)
    
    // eslint-disable-next-line array-callback-return
    return keysFilter.reduce((acc: any, key: any, i: any) =>{
       
        const accOrInfo = i ? acc : information;
        if (key === "locations") return acc = (locations(accOrInfo, filters[key]))
        if (key === "onSite") return acc = (onSite(accOrInfo, filters[key]))
        if (key === "isActivelyHiring") return acc = (isActivelyHiring(accOrInfo, filters[key]))
        if (key === "programDuration") return acc = (programDuration(accOrInfo, filters[key]))
        if (key === "careerType") return acc = (careerTypes(accOrInfo, filters[key]))
    }, [])



}

export default filtersHandle;
