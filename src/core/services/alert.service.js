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
  warn: (message) => {
    Swal.fire({
      icon: 'warning',
      title: 'Cảnh báo',
      text: message,
    });
  },
  confirm: (message) => {
    return Swal.fire({
      icon: 'question',
      title: 'Xác nhận',
      text: message,
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
      confirmButtonColor: 'red',
      confirmButtonText: 'Xoá',
    });
  },
};
