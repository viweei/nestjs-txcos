import { CredentialParams, GrantPutObjectParams, TxCosModuleOptions } from './types';
/**
 * @publicApi
 */
export declare class TxStsService {
    private readonly options;
    constructor(options: TxCosModuleOptions);
    credential(params: CredentialParams): Promise<{
        url: string;
        startTime: number;
        expiredTime: number;
        credentials: {
            tmpSecretId: string;
            tmpSecretKey: string;
            sessionToken: string;
        };
    }>;
    GrantPutFile(params: GrantPutObjectParams): Promise<{
        sign: string;
        url: string;
        token: string;
    }>;
}
