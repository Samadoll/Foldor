module.exports = function override(config, env) {
    delete config.node;
    config.devtool = "";
    config.mode = "production";
    config.target = "electron-renderer";
    return config;
}