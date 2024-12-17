import { DynamicModule, forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TxCosModuleOptions, } from './types';
import { MODULE_OPTIONS_TOKEN } from './ts-cos.declare';
import { TxCosService } from './tx-cos.service';
import { TxStsService } from './tx-sts.service';

/**
 * @publicApi
 */
@Module({})
export class TxCosModule {
  static forRoot(options?: TxCosModuleOptions): DynamicModule {
    return {
      global: !!options?.isGlobal,
      module: TxCosModule,
      providers: [{
        provide: MODULE_OPTIONS_TOKEN,
        useFactory: async () => {
          return {
            SecretId: options?.SecretId ?? process.env?.TX_COS_SECRET_ID,
            SecretKey: options?.SecretKey ?? process.env?.TX_COS_SECRET_KEY,
            Region: options?.Region ?? process.env?.TX_COS_REGION,
          };
        },
      },
        TxCosService, TxStsService],
      exports: [MODULE_OPTIONS_TOKEN, TxCosService, TxStsService],
    };
  }
}
