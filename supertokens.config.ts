import { config } from 'dotenv';

config();
export default {
  connectionURI:
    process.env.SUPERTOKENS_CONNECTION_URI || 'http://localhost:3567',
  appInfo: {
    appName: process.env.SUPERTOKENS_APPNAME || 'local',
    apiDomain: process.env.SUPERTOKENS_API_DOMAIN || 'http://localhost:3000',
    websiteDomain:
      process.env.SUPERTOKENS_WEBSITE_DOMAIN || 'http://localhost:3003',
    apiBasePath: process.env.SUPERTOKENS_API_BASEPATH || '/',
  },
  apiKey: process.env.SUPERTOKENS_API_KEYS || 'ananclajdeqez123eindsmez123pppe',
};
