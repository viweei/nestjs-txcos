import { ConfigurableModuleBuilder } from "@nestjs/common";

// export const MODULE_OPTIONS_TOKEN = 'tx-cos';
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder()
    .setClassMethodName('forRoot')
    // .setExtras<ExtraConfiguration>({}, (definition, extras) => ({
    //   ...definition,
    //   global: extras.isGlobal,
    // }))
    .build();