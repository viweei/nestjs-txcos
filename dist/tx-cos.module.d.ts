import { DynamicModule } from '@nestjs/common';
import { TxCosModuleOptions } from './types';
/**
 * @publicApi
 */
export declare class TxCosModule {
    static forRoot(options?: TxCosModuleOptions): DynamicModule;
}
