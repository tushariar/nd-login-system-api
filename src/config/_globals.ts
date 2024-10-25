const _globals = () => {
  return {
    MODE: process.env.MODE,
    PORT: process.env.PORT,

    BASE_URL: process.env.BASE_URL,

    ONE_MIN: 1000 * 60,
    ONE_HOUR: global.ONE_MIN * 60,
    ONE_DAY: global.ONE_HOUR * 24,

    ONE_MB: 1000000,
  };
};

export default _globals;
