// API服务层 - 统一管理所有API调用
const API_BASE_URL = '/api';

// 通用请求函数
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// 认证相关API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData: { username: string; email: string; password: string; firstName?: string; lastName?: string }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/me');
  },

  refreshToken: async () => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
    });
  },
};

// 主播相关API
export const streamersAPI = {
  getOnlineStreamers: async (params?: { category?: string; page?: number; limit?: number; sort?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/streamers/online?${queryParams.toString()}`);
  },

  getRecommendedStreamers: async (params?: { page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/streamers/recommended?${queryParams.toString()}`);
  },

  getNewStreamers: async (params?: { page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/streamers/new?${queryParams.toString()}`);
  },

  getHotStreamers: async (params?: { page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/streamers/hot?${queryParams.toString()}`);
  },

  getVIPStreamers: async (params?: { page?: number; limit?: number; level?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/streamers/vip?${queryParams.toString()}`);
  },

  getStreamerById: async (id: string) => {
    return apiRequest(`/streamers/${id}`);
  },

  followStreamer: async (id: string) => {
    return apiRequest(`/streamers/${id}/follow`, {
      method: 'POST',
    });
  },

  unfollowStreamer: async (id: string) => {
    return apiRequest(`/streamers/${id}/follow`, {
      method: 'DELETE',
    });
  },

  rateStreamer: async (id: string, rating: number, comment?: string) => {
    return apiRequest(`/streamers/${id}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating, comment }),
    });
  },

  searchStreamers: async (query: string, params?: { page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams({ q: query });
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/streamers/search?${queryParams.toString()}`);
  },

  getCategoryStreamers: async (category: string, params?: { page?: number; limit?: number; sort?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/streamers/category/${category}?${queryParams.toString()}`);
  },
};

// 用户相关API
export const usersAPI = {
  getProfile: async () => {
    return apiRequest('/users/profile');
  },

  updateProfile: async (profileData: { country?: string; age?: number; gender?: string; bio?: string }) => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const token = localStorage.getItem('authToken');
    return fetch(`${API_BASE_URL}/users/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(res => res.json());
  },

  getFollowing: async (params?: { page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/users/following?${queryParams.toString()}`);
  },

  getFavorites: async (params?: { page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/users/favorites?${queryParams.toString()}`);
  },

  addFavorite: async (streamerId: string) => {
    return apiRequest(`/users/favorites/${streamerId}`, {
      method: 'POST',
    });
  },

  removeFavorite: async (streamerId: string) => {
    return apiRequest(`/users/favorites/${streamerId}`, {
      method: 'DELETE',
    });
  },

  getNotifications: async (params?: { page?: number; limit?: number; unread_only?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/users/notifications?${queryParams.toString()}`);
  },

  markNotificationRead: async (id: string) => {
    return apiRequest(`/users/notifications/${id}/read`, {
      method: 'PUT',
    });
  },

  markAllNotificationsRead: async () => {
    return apiRequest('/users/notifications/read-all', {
      method: 'PUT',
    });
  },

  deleteNotification: async (id: string) => {
    return apiRequest(`/users/notifications/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return apiRequest('/users/stats');
  },
};

// 直播相关API
export const liveAPI = {
  getRoomInfo: async (roomId: string) => {
    return apiRequest(`/live/room/${roomId}`);
  },

  getRoomMessages: async (roomId: string, params?: { limit?: number; before?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/live/room/${roomId}/messages?${queryParams.toString()}`);
  },

  sendMessage: async (roomId: string, message: string, isPrivate?: boolean) => {
    return apiRequest(`/live/room/${roomId}/message`, {
      method: 'POST',
      body: JSON.stringify({ message, isPrivate }),
    });
  },

  sendGift: async (roomId: string, giftId: string, quantity?: number, message?: string) => {
    return apiRequest(`/live/room/${roomId}/gift`, {
      method: 'POST',
      body: JSON.stringify({ giftId, quantity, message }),
    });
  },

  getGifts: async () => {
    return apiRequest('/live/gifts');
  },

  enterPrivateShow: async (roomId: string) => {
    return apiRequest(`/live/room/${roomId}/private`, {
      method: 'POST',
    });
  },

  endPrivateShow: async (roomId: string) => {
    return apiRequest(`/live/room/${roomId}/private/end`, {
      method: 'POST',
    });
  },

  updateViewers: async (roomId: string, action: 'join' | 'leave') => {
    return apiRequest(`/live/room/${roomId}/viewers`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    });
  },
};

// 管理员API
export const adminAPI = {
  getStats: async () => {
    return apiRequest('/admin/stats');
  },

  getUsers: async (params?: { page?: number; limit?: number; search?: string; sort?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/admin/users?${queryParams.toString()}`);
  },

  getStreamers: async (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/admin/streamers?${queryParams.toString()}`);
  },

  verifyStreamer: async (id: string) => {
    return apiRequest(`/admin/streamers/${id}/verify`, {
      method: 'POST',
    });
  },

  unverifyStreamer: async (id: string) => {
    return apiRequest(`/admin/streamers/${id}/unverify`, {
      method: 'POST',
    });
  },

  banUser: async (id: string, reason?: string) => {
    return apiRequest(`/admin/users/${id}/ban`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  unbanUser: async (id: string) => {
    return apiRequest(`/admin/users/${id}/unban`, {
      method: 'POST',
    });
  },

  getReports: async (params?: { page?: number; limit?: number; type?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/admin/reports?${queryParams.toString()}`);
  },

  getLogs: async (params?: { page?: number; limit?: number; type?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/admin/logs?${queryParams.toString()}`);
  },

  broadcastNotification: async (title: string, message: string, type?: string, target?: string) => {
    return apiRequest('/admin/notifications/broadcast', {
      method: 'POST',
      body: JSON.stringify({ title, message, type, target }),
    });
  },
};

// 支付相关API
export const paymentsAPI = {
  getMethods: async () => {
    return apiRequest('/payments/methods');
  },

  getPackages: async () => {
    return apiRequest('/payments/packages');
  },

  createOrder: async (packageId: string, paymentMethod: string, returnUrl?: string) => {
    return apiRequest('/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({ packageId, paymentMethod, returnUrl }),
    });
  },

  getOrder: async (orderId: string) => {
    return apiRequest(`/payments/order/${orderId}`);
  },

  withdraw: async (amount: number, method: string, accountInfo: any) => {
    return apiRequest('/payments/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount, method, accountInfo }),
    });
  },

  getTransactions: async (params?: { page?: number; limit?: number; type?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    return apiRequest(`/payments/transactions?${queryParams.toString()}`);
  },

  getWallet: async () => {
    return apiRequest('/payments/wallet');
  },
};

// 健康检查API
export const healthAPI = {
  check: async () => {
    return apiRequest('/health');
  },
};