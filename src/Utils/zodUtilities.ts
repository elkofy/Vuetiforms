import { ZodObject} from "zod";


export const makeDeepPartial = (zodObject: ZodObject<any>) => {

    const copy = {...zodObject.shape};
    Object.keys(copy).map((key,index) => {
        console.log('key', key);
        console.log(copy[key]._def.typeName)
            if ( zodObject.shape[key] instanceof ZodObject){
                console.log('zodObject.shape[key]', zodObject.shape[key]);
                console.log('index', index);
                //zodObject.shape[key] = makeDeepPartial(zodObject.shape[key]);
            }
        // console.log(`${property}: ${copy[property]}`);
    });
    // copy.map((key) => {
    //     console.log('key', key);
    //     if ( zodObject.shape[key] instanceof ZodObject){
    //         console.log('zodObject.shape[key]', zodObject.shape[key]);
    //         //zodObject.shape[key] = makeDeepPartial(zodObject.shape[key]);
    //     }
    //
    // })
    // copy.map((key) => {
    //     console.log('key', key);
    //     if ( zodObject.shape[key] instanceof ZodObject){
    //         console.log('zodObject.shape[key]', zodObject.shape[key]);
    //         //zodObject.shape[key] = makeDeepPartial(zodObject.shape[key]);
    //     }
    // })




return copy;

}
