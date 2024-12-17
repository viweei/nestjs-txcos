"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPTIONS_TYPE = exports.MODULE_OPTIONS_TOKEN = exports.ConfigurableModuleClass = void 0;
const common_1 = require("@nestjs/common");
// export const MODULE_OPTIONS_TOKEN = 'tx-cos';
_a = new common_1.ConfigurableModuleBuilder()
    .setClassMethodName('forRoot')
    // .setExtras<ExtraConfiguration>({}, (definition, extras) => ({
    //   ...definition,
    //   global: extras.isGlobal,
    // }))
    .build(), exports.ConfigurableModuleClass = _a.ConfigurableModuleClass, exports.MODULE_OPTIONS_TOKEN = _a.MODULE_OPTIONS_TOKEN, exports.OPTIONS_TYPE = _a.OPTIONS_TYPE;
