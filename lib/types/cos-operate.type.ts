



export type Object_Descriptor = {
  // 所在的桶
  bucket: string,
  // 所在的区域
  region?: string,
  // 对象路径
  objectPath: string,
};


export type CredentialParams = {
  /* 桶名称 */
  bucket: string;
  /* 对象路径 */
  prefix: string;
  /* 临时密钥的权限策略 */
  action: string[];


  /* 所在区域 */
  region?: string;

  /* 有效时长 */
  duration?: number;
};