import {ZodArray, ZodBoolean, ZodNumber, ZodObject, ZodString} from "zod";
import {toRaw} from "vue";

export const makeDeepPartial = (zodObject: ZodObject<any>) => {
    const copy = {...zodObject.shape};
    Object.keys(copy).map((key) => {
        if (zodObject.shape[key] instanceof ZodObject) {
            copy[key] = makeDeepPartial(zodObject.shape[key]);
        }
    });
    return copy;
}

export const makeFormObject = (obj: any) => {
    const myObj = {...obj};
    Object.keys(obj).map((value) => {
        const zodSchema = obj[value];

        if (zodSchema instanceof ZodObject) {
            myObj[value] = {
                zodSchema: obj[value],
                modelValue: "",
                label: value,
                type: 'object'
            };
        } else if (zodSchema instanceof ZodString) {
            myObj[value] = {
                zodSchema: obj[value],
                modelValue: "",
                label: value,
                type: 'string'
            };
        } else if (zodSchema instanceof ZodNumber) {
            myObj[value] = {
                zodSchema: obj[value],
                modelValue: 0,
                label: value,
                type: 'number'
            };
        } else if (zodSchema instanceof ZodBoolean) {
            myObj[value] = {
                zodSchema: obj[value],
                modelValue: "",
                label: value,
                type: 'boolean'
            };
        } else if (zodSchema instanceof ZodArray) {
            myObj[value] = {
                zodSchema: obj[value],
                modelValue: "",
                label: value,
                type: 'array'
            };
        } else if (zodSchema instanceof Object) {
            myObj[value] = makeFormObject(obj[value]);
        } else {
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

export const formatFormObject = (obj: any) => {
    const myObj = {...toRaw(obj)};
    Object.keys(obj).map((value) => {
        const currentInput = toRaw(obj[value])
        if (currentInput.type) {
            if (currentInput.type === 'number') {
                myObj[value] = Number(currentInput.modelValue);
            }
            else {
                myObj[value] = currentInput.modelValue;
            }
        } else {
            myObj[value] = {}
            Object.keys(currentInput).map((key) => {
                if (currentInput[key]) {
                    myObj[value][key] = currentInput[key].modelValue;
                }
            })
        }

    })
    return myObj;
}

export default {makeFormObject, formatFormObject, makeDeepPartial};
