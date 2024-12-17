import { Inject, Injectable } from '@nestjs/common';
import COS from 'cos-nodejs-sdk-v5';

import { MODULE_OPTIONS_TOKEN } from './ts-cos.declare';
import { Object_Descriptor, TxCosModuleOptions } from './types';


/**
 * @publicApi
 */
@Injectable()
export class TxCosService {
  private cos: COS;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: TxCosModuleOptions
  ) {
    this.cos = new COS({
      SecretId: options.SecretId,
      SecretKey: options.SecretKey,
      Timeout: options.Timeout,
    });
  }

  async putObject(params: {
    bucket: string,
    region?: string,
    originalname: string,
    buffer: Buffer
  }): Promise<COS.PutObjectResult> {
    return this.cos.putObject({
      Bucket: params.bucket,
      Region: (params.region ?? this.options.Region) ?? '',
      Key: params.originalname,
      Body: params.buffer,
      ContentLength: params.buffer.byteLength,
    });
  }

  async moveObject(
    source: Object_Descriptor,
    target: Object_Descriptor
    // ): Promise<COS.PutObjectCopyResult> {
  ): Promise<any> {

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

  async deleteObject(params: Object_Descriptor): Promise<COS.DeleteObjectResult> {
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
    })
  }

}
