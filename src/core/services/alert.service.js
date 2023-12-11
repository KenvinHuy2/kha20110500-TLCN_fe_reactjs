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

  alertWithTextArea: () => {
    return Swal.fire({
      title: 'Vui Lòng Cho Biết Lý Do Huỷ',
      input: 'textarea',
      inputLabel: 'Lý do',
      inputPlaceholder:
        'Nhập lý do huỷ. Nếu bạn đã thanh toán, vui lòng nhập thông tin để chúng tôi hoàn tiền cho bạn',
      inputValidator: (value) => {
        if (!value.trim()) {
          return 'Vui lòng nhập lý do';
        }
      },
      showCancelButton: true,
      cancelButtonText: 'Đóng',
      confirmButtonText: 'Huỷ',
      confirmButtonColor: 'red',
    });
  },

  alertWithInputNumber: (defaultValue) => {
    return Swal.fire({
      title: 'Nhập Số Lượng Muốn Thay Đổi',
      input: 'number',
      inputLabel: 'Số lượng',
      inputValue: defaultValue || 0,
      inputPlaceholder: 'Nhập số lượng muốn đổi',
      inputValidator: (value) => {
        if (!Number.isInteger(+value) || +value < 0) {
          return 'Số lượng không hợp lệ';
        }
      },
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
      confirmButtonText: 'Cập nhật',
    });
  },

  confirmRefund: (notes) => {
    return Swal.fire({
      icon: 'question',
      title: 'Xác nhận Hoàn Tiền',
      text: notes,
      showCancelButton: true,
      cancelButtonText: 'Đóng',
      confirmButtonText: 'Xác nhận',
    });
  },
};
