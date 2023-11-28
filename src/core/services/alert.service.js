import Swal from 'sweetalert2';

export const AlertService = {
  success: (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Thành Công',
      text: message,
    });
  },
  error: (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: message,
    });
  },
};
