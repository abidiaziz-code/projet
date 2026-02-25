import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';
// إنشاء مثيل axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// طلب interceptor لإضافة التوكن
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// رد interceptor للتعامل مع الأخطاء
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // خطأ من الخادم
      const message = error.response.data?.message || 'حدث خطأ في الخادم';
      
      // إذا كان التوكن منتهي الصلاحية أو غير صالح
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // لم تصل الاستجابة
      return Promise.reject(new Error('تعذر الاتصال بالخادم'));
    } else {
      // خطأ في إعداد الطلب
      return Promise.reject(error);
    }
  }
);

export default api;