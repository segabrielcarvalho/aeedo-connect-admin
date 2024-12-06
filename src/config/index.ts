interface ISettings {
  tokenKey: string;
  jwtSecret: string;
}

const settings: ISettings = {
  tokenKey: "aeedo-connect.token",
  jwtSecret: process.env.JWT_SECRET || "secret",
};

export const client = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
};

export default settings;
