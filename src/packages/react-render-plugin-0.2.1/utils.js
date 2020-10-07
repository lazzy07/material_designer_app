export function kebab(str) {
    const replace = s => s.toLowerCase().replace(/ /g, '-');
    if(str){
        return Array.isArray(str) ? str.map(replace) : replace(str);
    }else{
        return "";
    }
}