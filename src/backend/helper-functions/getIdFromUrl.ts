

export function getIdFromUrl(url: string) {
    const urlWithoutParams = url.split("&")[0]; // Remove the parameters from the URL
    const urlArray = urlWithoutParams.split("/");
    const id = urlArray[urlArray.length - 1];
    
    if (!id) {
        throw new Error("Invalid URL format. Unable to extract ID.");
    }
    
    return id;
}