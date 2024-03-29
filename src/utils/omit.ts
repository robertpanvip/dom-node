
/**
 * 排除一个对象中指定的key
 * @param obj
 * @param fields
 */
function omit<T,K extends keyof T>(obj:T, fields: Array<K>) :Pick<T, Exclude<keyof T, K>>{
    const shallowCopy:T = {...obj};
    for (let i = 0; i < fields.length; i++) {
        const key = fields[i];
        if(Object.prototype.hasOwnProperty.call(shallowCopy, key)){
            delete shallowCopy[key];
        }
    }
    return shallowCopy;
}

export default omit;
