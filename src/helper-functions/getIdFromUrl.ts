export function getIdFromUrl(url:string) {
    const urlArray = url.split("/");
    const id = urlArray[urlArray.length - 1];
    return id;
}