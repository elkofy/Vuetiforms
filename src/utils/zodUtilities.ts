import {ZodObject} from "zod";

export const makeDeepPartial = (zodObject: ZodObject<any>) => {
    const copy = {...zodObject.shape};
    Object.keys(copy).map((key) => {
        if (zodObject.shape[key] instanceof ZodObject) {
            copy[key] = makeDeepPartial(zodObject.shape[key]);
        }
    });
    return copy;
}
