import axios from 'axios';

export interface Credentials {
  email: string;
  password: string;
}

interface TokenResponse {
  message: string;
  token: string;
}

const http = axios.create({ baseURL: '/api/auth' });

/** Thin, typed wrappers over the auth endpoints. No state, no side effects. */
export const authApi = {
  async register(credentials: Credentials): Promise<string> {
    const { data } = await http.post<TokenResponse>('/register', credentials);
    return data.token;
  },

  async login(credentials: Credentials): Promise<string> {
    const { data } = await http.post<TokenResponse>('/login', credentials);
    return data.token;
  },

  /** Verifies the token and returns a renewed one. */
  async validateToken(token: string): Promise<string> {
    const { data } = await http.post<TokenResponse>(
      '/validate-token',
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data.token;
  },
};
