"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxStsService = void 0;
const common_1 = require("@nestjs/common");
const qcloud_cos_sts_1 = __importDefault(require("qcloud-cos-sts"));
const cos_nodejs_sdk_v5_1 = __importDefault(require("cos-nodejs-sdk-v5"));
const ts_cos_declare_1 = require("./ts-cos.declare");
/**
 * @publicApi
 */
let TxStsService = class TxStsService {
    constructor(options) {
        this.options = options;
    }
    // COS 临时授权
    async credential(params) {
        const [name, appid] = params.bucket.split('-');
        const region = params.region ?? this.options.Region;
        const result = await qcloud_cos_sts_1.default.getCredential({
            secretId: this.options.SecretId,
            secretKey: this.options.SecretKey,
            durationSeconds: params.duration ?? 1800,
            endpoint: 'sts.tencentcloudapi.com',
            policy: {
                version: '2.0',
                statement: [
                    {
                        action: params.action,
                        effect: 'allow',
                        principal: { 'qcs': ['*'] },
                        resource: [
                            `qcs::cos:${region}:uid/${appid}:prefix//${appid}/${name}/${params.prefix}`,
                        ],
                    }
                ]
            }
        });
        const url = `https://${params.bucket}.cos.${region}.myqcloud.com/${params.prefix}`;
        return { ...result, url };
    }
    // bucket:string;
    // filename:string;
    // region?:string;
    // duration?:number;
    // 
    // sign: string;
    // url: string;
    // token: string;
    // COS 临时授权PUT上传文件并签名
    async GrantPutFile(params) {
        const [name, appid] = params.bucket.split('-');
        const region = params.region ?? this.options.Region;
        const { credentials } = await qcloud_cos_sts_1.default.getCredential({
            secretId: this.options.SecretId,
            secretKey: this.options.SecretKey,
            durationSeconds: params.duration ?? 1800,
            endpoint: 'sts.tencentcloudapi.com',
            policy: {
                version: '2.0',
                statement: [
                    {
                        action: ['name/cos:PutObject'],
                        effect: 'allow',
                        principal: { 'qcs': ['*'] },
                        resource: [
                            `qcs::cos:${region}:uid/${appid}:prefix//${appid}/${name}/${params.path}`,
                        ],
                    }
                ]
            }
        });
        const cos = new cos_nodejs_sdk_v5_1.default({
            SecretId: credentials.tmpSecretId,
            SecretKey: credentials.tmpSecretKey,
            SecurityToken: credentials.sessionToken
        });
        return {
            sign: cos.getAuth({ Method: 'PUT', Key: params.path }),
            url: `https://${params.bucket}.cos.${region}.myqcloud.com/${params.path}`,
            token: credentials.sessionToken
        };
    }
};
exports.TxStsService = TxStsService;
exports.TxStsService = TxStsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(ts_cos_declare_1.MODULE_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [Object])
], TxStsService);
