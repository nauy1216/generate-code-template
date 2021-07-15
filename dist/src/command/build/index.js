"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var logger_1 = __importDefault(require("../../utils/logger"));
var webpack_1 = __importDefault(require("webpack"));
var plugin_1 = __importDefault(require("vue-loader/lib/plugin"));
function build(entry) {
    var _a;
    var entryPath = path_1.default.resolve(process.cwd(), entry);
    logger_1.default.info(entry);
    var compiler = webpack_1.default({
        mode: 'development',
        devtool: 'source-map',
        entry: (_a = {},
            _a[entry] = entryPath,
            _a),
        output: {
            filename: '[name].js',
            path: path_1.default.resolve(process.cwd(), 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    use: ['vue-style-loader', 'css-loader']
                }
            ]
        },
        plugins: [new plugin_1.default()]
    });
    compiler.run(function (stats) {
        if (!stats) {
            logger_1.default.info('build success.');
        }
    });
}
exports.default = build;
