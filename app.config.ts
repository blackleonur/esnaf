const AppConfig = ({ config }: { config: any }) => {
  const configure: {} = {
    ...config,
    extra: {
      appVersion: '1.0',
      apiEnv: process.env.API_ENV,
      // eas: {
      //   projectId: '',
      // },
    },
    plugins: [],
    runtimeVersion: {
      policy: 'sdkVersion',
    },
  };

  return configure;
};

export default AppConfig;
