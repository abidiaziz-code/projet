import api from './api';

const authService = {
  // تسجيل الدخول
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response;
  },

  // التسجيل
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
  },

  // الحصول على بيانات المستخدم الحالي
  getCurrentUser: async () => {
    const response = await api.get('/auth/verify');
    return response.user;
  },

  // تسجيل الخروج
  logout: async () => {
    await api.post('/auth/logout');
  }
};

export default authService;