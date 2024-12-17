"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TxCosModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxCosModule = void 0;
const common_1 = require("@nestjs/common");
const ts_cos_declare_1 = require("./ts-cos.declare");
const tx_cos_service_1 = require("./tx-cos.service");
const tx_sts_service_1 = require("./tx-sts.service");
/**
 * @publicApi
 */
let TxCosModule = TxCosModule_1 = class TxCosModule {
    static forRoot(options) {
        return {
            global: !!options?.isGlobal,
            module: TxCosModule_1,
            providers: [{
                    provide: ts_cos_declare_1.MODULE_OPTIONS_TOKEN,
                    useFactory: async () => {
                        return {
                            SecretId: options?.SecretId ?? process.env?.TX_COS_SECRET_ID,
                            SecretKey: options?.SecretKey ?? process.env?.TX_COS_SECRET_KEY,
                            Region: options?.Region ?? process.env?.TX_COS_REGION,
                        };
                    },
                },
                tx_cos_service_1.TxCosService, tx_sts_service_1.TxStsService],
            exports: [ts_cos_declare_1.MODULE_OPTIONS_TOKEN, tx_cos_service_1.TxCosService, tx_sts_service_1.TxStsService],
        };
    }
};
exports.TxCosModule = TxCosModule;
exports.TxCosModule = TxCosModule = TxCosModule_1 = __decorate([
    (0, common_1.Module)({})
], TxCosModule);
