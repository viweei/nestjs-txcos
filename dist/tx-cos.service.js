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
exports.TxCosService = void 0;
const common_1 = require("@nestjs/common");
const cos_nodejs_sdk_v5_1 = __importDefault(require("cos-nodejs-sdk-v5"));
const ts_cos_declare_1 = require("./ts-cos.declare");
/**
 * @publicApi
 */
let TxCosService = class TxCosService {
    constructor(options) {
        this.options = options;
        this.cos = new cos_nodejs_sdk_v5_1.default({
            SecretId: options.SecretId,
            SecretKey: options.SecretKey,
            Timeout: options.Timeout,
        });
    }
    async putObject(params) {
        return this.cos.putObject({
            Bucket: params.bucket,
            Region: (params.region ?? this.options.Region) ?? '',
            Key: params.originalname,
            Body: params.buffer,
            ContentLength: params.buffer.byteLength,
        });
    }
    async moveObject(source, target
    // ): Promise<COS.PutObjectCopyResult> {
    ) {
        const { statusCode } = await this.cos.putObjectCopy({
            Bucket: target.bucket,
            Region: (target.region ?? this.options.Region) ?? '',
            Key: target.objectPath,
            CopySource: `${source.bucket}.cos.${(source.region ?? this.options.Region) ?? ''}.myqcloud.com/${encodeURIComponent(source.objectPath)}`,
        });
        if (statusCode === 200) {
            const result = await this.cos.deleteObject({
                Bucket: source.bucket,
                Region: (source.region ?? this.options.Region) ?? '',
                Key: source.objectPath,
            });
            console.log('delete result:', result);
            return result;
        }
    }
    async deleteObject(params) {
        return this.cos.deleteObject({
            Bucket: params.bucket,
            Region: (params.region ?? this.options.Region) ?? '',
            Key: params.objectPath,
        });
    }
    async listObject() {
        return this.cos.getBucket({
            Bucket: 'temp-1331290566',
            Region: 'ap-guangzhou',
            Prefix: 'images',
            Delimiter: '/',
        });
    }
};
exports.TxCosService = TxCosService;
exports.TxCosService = TxCosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(ts_cos_declare_1.MODULE_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [Object])
], TxCosService);
