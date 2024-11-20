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
    plugins: ['expo-build-properties'],
    runtimeVersion: {
      policy: 'sdkVersion',
    },
  };

  return configure;
};

export default AppConfig;
