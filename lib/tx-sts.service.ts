import path from 'node:path';
import { Inject, Injectable } from '@nestjs/common';
import STS from 'qcloud-cos-sts';
import COS from 'cos-nodejs-sdk-v5';

import { MODULE_OPTIONS_TOKEN } from './ts-cos.declare';
import { CredentialParams, GrantPutObjectParams, TxCosModuleOptions } from './types';



/**
 * @publicApi
 */
@Injectable()
export class TxStsService {

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: TxCosModuleOptions
  ) { }

  // COS 临时授权
  async credential(params: CredentialParams) {
    const [name, appid] = params.bucket.split('-');
    const region = params.region ?? this.options.Region;

    const result = await STS.getCredential({
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
  async GrantPutFile(params: GrantPutObjectParams) {
    const [name, appid] = params.bucket.split('-');
    const region = params.region ?? this.options.Region;

    const { credentials } = await STS.getCredential({
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

    const cos = new COS({
      SecretId: credentials.tmpSecretId,
      SecretKey: credentials.tmpSecretKey,
      SecurityToken: credentials.sessionToken
    });

    return {
      sign: cos.getAuth({ Method: 'PUT', Key: params.path }),
      url: `https://${params.bucket}.cos.${region}.myqcloud.com/${params.path}`,
      token: credentials.sessionToken
    }
  }
}