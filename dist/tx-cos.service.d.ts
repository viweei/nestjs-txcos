import COS from 'cos-nodejs-sdk-v5';
import { Object_Descriptor, TxCosModuleOptions } from './types';
/**
 * @publicApi
 */
export declare class TxCosService {
    private readonly options;
    private cos;
    constructor(options: TxCosModuleOptions);
    putObject(params: {
        bucket: string;
        region?: string;
        originalname: string;
        buffer: Buffer;
    }): Promise<COS.PutObjectResult>;
    moveObject(source: Object_Descriptor, target: Object_Descriptor): Promise<any>;
    deleteObject(params: Object_Descriptor): Promise<COS.DeleteObjectResult>;
    listObject(): Promise<COS.GetBucketResult>;
}
