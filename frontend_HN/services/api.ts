import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request Error:', error.message);
      return Promise.reject(error);
    }
  }
);

export interface DashboardStats {
    totalThreats: number;
    activeVulnerabilities: number;
    honeypotCount: number;
    alertCount: number;
    threatTrend: number;
    vulnerabilityTrend: number;
}

export interface Threat {
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    location: {
        latitude: number;
        longitude: number;
    };
    timestamp: string;
}

export interface Vulnerability {
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    location: {
        latitude: number;
        longitude: number;
    };
    timestamp: string;
}

export interface Honeypot {
    id: string;
    name: string;
    type: string;
    status: 'active' | 'inactive';
    metrics: {
        attacksDetected: number;
        uniqueAttackers: number;
        lastAttack: string;
    };
}

export interface Alert {
    id: string;
    threatId: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    timestamp: string;
    status: 'new' | 'investigating' | 'resolved';
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'dashboard' | 'cockpit';
    avatar?: string;
}

export interface LoginResponse {
    access: string;
    refresh: string;
    user: User;
}

export const auth = {
    login: async (credentials: { email: string; password: string }) => {
        try {
            const response = await axiosInstance.post('/api/auth/login/', credentials);
            const { access, refresh, user } = response.data;
            
            // Store tokens
            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);
            
            return response.data;
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 401) {
                    throw new Error('Invalid email or password');
                } else if (error.response.status === 404) {
                    throw new Error('User not found. Please register first.');
                } else {
                    throw new Error(error.response.data.detail || 'Login failed');
                }
            }
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    },

    register: async (userData: {
        email: string;
        password: string;
        name: string;
        role: 'dashboard' | 'cockpit';
    }) => {
        try {
            const response = await axiosInstance.post('/api/auth/register/', userData);
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    refreshToken: async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token found');
            }

            const response = await axiosInstance.post('/api/auth/refresh/', { refresh: refreshToken });
            const { access } = response.data;
            localStorage.setItem('token', access);
            return response.data;
        } catch (error) {
            console.error('Token refresh error:', error);
            throw error;
        }
    },

    getProfile: async () => {
        try {
            const response = await axiosInstance.get('/api/auth/user/');
            return response.data;
        } catch (error) {
            console.error('Profile fetch error:', error);
            throw error;
        }
    },

    getDashboardStats: async (): Promise<DashboardStats> => {
        const response = await axiosInstance.get('/dashboard/stats/');
        return response.data;
    },

    getThreats: async (count: number = 10): Promise<Threat[]> => {
        const response = await axiosInstance.get(`/threats/?count=${count}`);
        return response.data;
    },

    getVulnerabilities: async (count: number = 10): Promise<Vulnerability[]> => {
        const response = await axiosInstance.get(`/vulnerabilities/?count=${count}`);
        return response.data;
    },

    getHoneypots: async (count: number = 5): Promise<Honeypot[]> => {
        const response = await axiosInstance.get(`/honeypots/?count=${count}`);
        return response.data;
    },

    getAlerts: async (count: number = 10): Promise<Alert[]> => {
        const response = await axiosInstance.get(`/alerts/?count=${count}`);
        return response.data;
    },

    getThreatMapData: async (): Promise<Threat[]> => {
        const response = await axiosInstance.get('/threat-map/');
        return response.data;
    },

    getVulnerabilityMapData: async (): Promise<Vulnerability[]> => {
        const response = await axiosInstance.get('/vulnerability-map/');
        return response.data;
    }
};

export const api = {
    getDashboardStats: async (): Promise<DashboardStats> => {
        const response = await axiosInstance.get('/dashboard/stats/');
        return response.data;
    },

    getThreats: async (count: number = 10): Promise<Threat[]> => {
        const response = await axiosInstance.get(`/threats/?count=${count}`);
        return response.data;
    },

    getVulnerabilities: async (count: number = 10): Promise<Vulnerability[]> => {
        const response = await axiosInstance.get(`/vulnerabilities/?count=${count}`);
        return response.data;
    },

    getHoneypots: async (count: number = 5): Promise<Honeypot[]> => {
        const response = await axiosInstance.get(`/honeypots/?count=${count}`);
        return response.data;
    },

    getAlerts: async (count: number = 10): Promise<Alert[]> => {
        const response = await axiosInstance.get(`/alerts/?count=${count}`);
        return response.data;
    },

    getThreatMapData: async (): Promise<Threat[]> => {
        const response = await axiosInstance.get('/threat-map/');
        return response.data;
    },

    getVulnerabilityMapData: async (): Promise<Vulnerability[]> => {
        const response = await axiosInstance.get('/vulnerability-map/');
        return response.data;
    }
}; 