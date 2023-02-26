const MetroConfig = require("@ui-kitten/metro-config");
const { getDefaultConfig } = require("expo/metro-config");

const evaConfig = {
  evaPackage: "@eva-design/eva",
  customMappingPath: "./src/app/mapping.json",
};

module.exports = MetroConfig.create(evaConfig, {
  // Whatever was previously specified
});

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push("db");
module.exports = defaultConfig;
