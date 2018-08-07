/**
 * This proxy configuration is only needed during development
 */
const mmsProxyMap = {
  opencaeuat: "https://opencae-uat.jpl.nasa.gov:443", // default proxy
  opencaeint: "https://opencae-int.jpl.nasa.gov:443",
  opencaetest: "https://opencae-test.jpl.nasa.gov:443",
  opencae: "https://opencae.jpl.nasa.gov:443"
};
const tomsawyerProxyUrl = "https://cae-ts-test.jpl.nasa.gov:8080";

const proxyConfig = [
  {
    context: "/alfresco",
    target: mmsProxyMap[process.env.proxy],
    changeOrigin: true,
    secure: false,
    logLevel: "debug"
  },
  {
    context: "/mms-ts",
    target: tomsawyerProxyUrl,
    changeOrigin: true,
    secure: false,
    logLevel: "debug"
  }
];

module.exports = proxyConfig;
