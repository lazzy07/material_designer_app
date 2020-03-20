/**
 * Enter path as "/dependencies/img/image.png"
 * @param path path of the static dependency
 */
export const getStaticPath = (path: string) => {
    if(process.env.NODE_ENV === "development"){
        console.log("process is dev")
        return "/main_window/" + path;
    }else{
        return "./" + path;
    }
}