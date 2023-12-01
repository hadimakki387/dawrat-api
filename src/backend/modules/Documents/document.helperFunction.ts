import Document from "./document.model";

export const checkDocumentTitle = async (title: string) => {
    const doc = await Document.findOne({ title:title });
    if (doc) {
        return true;
    }

    return false;
}