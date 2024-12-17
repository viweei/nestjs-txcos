export type Object_Descriptor = {
    bucket: string;
    region?: string;
    objectPath: string;
};
export type CredentialParams = {
    bucket: string;
    prefix: string;
    action: string[];
    region?: string;
    duration?: number;
};
