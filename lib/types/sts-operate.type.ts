


export type GrantPutObjectParams = {
  /** 桶名称 */
  bucket: string;

  path: string;
  /** 路径 */
  // prefix: string;
  /** 文件名 */
  // filename: string;
  /** 区域  */
  region?: string;
  /** 有效期 */
  duration?: number;
};