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
  alertWithEmailInput: () => {
    return Swal.fire({
      title: 'Khôi Phục Lại Mật Khẩu',
      input: 'email',
      inputLabel: 'Email',
      inputPlaceholder: 'Nhập địa chỉ email đã đăng ký',
      inputValidator: (value) => {
        if (!value.trim()) {
          return 'Email không được để trống';
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          return 'Email không hợp lệ';
        }
      },
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
    });
  },
};
