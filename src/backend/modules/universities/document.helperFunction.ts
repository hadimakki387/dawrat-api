import University from "./universities.model";


export const checkUniversityTitle = async (title: string) => {

    const doc = await University.findOne({ title:title });
    if (doc) {
        return true;
    }

    return false;
}