import {z, ZodArray, ZodBoolean, ZodNumber, ZodObject, ZodString} from "zod";

export const makeDeepPartial = (zodObject: ZodObject<any>) => {
    const copy = {...zodObject.shape};
    Object.keys(copy).map((key) => {
        if (zodObject.shape[key] instanceof ZodObject) {
            copy[key] = makeDeepPartial(zodObject.shape[key]);
        }
    });
    return copy;
}

export const makeFormObject = (obj) => {
    const myObj = {...obj};
     Object.keys(obj).map((value)=>{
        const zodSchema = obj[value];
        if ( zodSchema instanceof ZodObject) {
            myObj[value] = {
            zodSchema: obj[value],
            modelValue: "",
            label: value,
            type: 'object'
            };
        }
        else if (zodSchema instanceof ZodString) {
            myObj[value] = {
            zodSchema: obj[value],
            modelValue: "",
            label: value,
            type: 'string'
            };
        }
        else if (zodSchema instanceof ZodNumber) {
            myObj[value] = {
            zodSchema: obj[value],
            modelValue: "",
            label: value,
            type: 'number'
            };
        }
        else if (zodSchema instanceof ZodBoolean) {
            myObj[value] = {
            zodSchema: obj[value],
            modelValue: "",
            label: value,
            type: 'boolean'
            };
        }
        else if (zodSchema instanceof ZodArray) {
            myObj[value] = {
            zodSchema: obj[value],
            modelValue: "",
            label: value,
            type: 'array'
            };
        }
        else {
            myObj[value] = {
            zodSchema: obj[value],
            modelValue: "",
            label: value,
            type: 'unknown'
            };
        }
    })
    return myObj;
}
