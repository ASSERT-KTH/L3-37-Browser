

/*
return array with the ID of the active elements in an array
mArr array with objects {id:string, selected:boolean}
return Sring[]
*/
export function getActiveElements(mArr: Object[]): string[] {
    return mArr.filter(item => item['selected']).map(item => item['id']);
}

export default {
    getActiveElements
}