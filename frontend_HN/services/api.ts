const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

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

export const api = {
    login: async (username: string, password: string) => {
        const response = await fetch(`${API_BASE_URL}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        localStorage.setItem('token', data.access);
        return data;
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getDashboardStats: async (): Promise<DashboardStats> => {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats/`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch dashboard stats');
        }
        return response.json();
    },

    getThreats: async (count: number = 10): Promise<Threat[]> => {
        const response = await fetch(`${API_BASE_URL}/threats/?count=${count}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch threats');
        }
        return response.json();
    },

    getVulnerabilities: async (count: number = 10): Promise<Vulnerability[]> => {
        const response = await fetch(`${API_BASE_URL}/vulnerabilities/?count=${count}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch vulnerabilities');
        }
        return response.json();
    },

    getHoneypots: async (count: number = 5): Promise<Honeypot[]> => {
        const response = await fetch(`${API_BASE_URL}/honeypots/?count=${count}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch honeypots');
        }
        return response.json();
    },

    getAlerts: async (count: number = 10): Promise<Alert[]> => {
        const response = await fetch(`${API_BASE_URL}/alerts/?count=${count}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch alerts');
        }
        return response.json();
    },

    getThreatMapData: async (): Promise<Threat[]> => {
        const response = await fetch(`${API_BASE_URL}/threat-map/`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch threat map data');
        }
        return response.json();
    },

    getVulnerabilityMapData: async (): Promise<Vulnerability[]> => {
        const response = await fetch(`${API_BASE_URL}/vulnerability-map/`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch vulnerability map data');
        }
        return response.json();
    }
}; 