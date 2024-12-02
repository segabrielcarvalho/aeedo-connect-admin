interface ISettings {
  tokenKey: string;
  jwtSecret: string;
}

const settings: ISettings = {
  tokenKey: "aeedo-connect.token",
  jwtSecret: process.env.JWT_SECRET || "secret",
};

export default settings;
