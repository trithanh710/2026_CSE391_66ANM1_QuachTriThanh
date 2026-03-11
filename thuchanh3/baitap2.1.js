const form = document.getElementById('registerForm');
const successBox = document.getElementById('successBox');

// Các Regex theo yêu cầu
const RE_NAME = /^[a-zA-ZÀ-ỹ\s]{3,}$/;
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RE_PHONE = /^0[0-9]{9}$/;
const RE_PASS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Hàm hiển thị lỗi
function setError(id, message) {
    const element = document.getElementById(id);
    const parent = element.closest('.form-control');
    parent.classList.add('error');
    parent.classList.remove('success');
    parent.querySelector('.error-msg').innerText = message;
}

// Hàm xóa lỗi
function setSuccess(id) {
    const element = document.getElementById(id);
    const parent = element.closest('.form-control');
    parent.classList.add('success');
    parent.classList.remove('error');
}

// Các hàm kiểm tra (Validation Functions)
const validateFullname = () => {
    const val = document.getElementById('fullname').value.trim();
    if (!RE_NAME.test(val)) {
        setError('fullname', "Họ tên từ 3 ký tự và chỉ chứa chữ");
        return false;
    }
    setSuccess('fullname'); return true;
};

const validateEmail = () => {
    const val = document.getElementById('email').value.trim();
    if (!RE_EMAIL.test(val)) {
        setError('email', "Email không hợp lệ");
        return false;
    }
    setSuccess('email'); return true;
};

const validatePhone = () => {
    const val = document.getElementById('phone').value.trim();
    if (!RE_PHONE.test(val)) {
        setError('phone', "SĐT phải 10 số, bắt đầu bằng 0");
        return false;
    }
    setSuccess('phone'); return true;
};

const validatePassword = () => {
    const val = document.getElementById('password').value;
    if (!RE_PASS.test(val)) {
        setError('password', "Mật khẩu 8+ ký tự, có Hoa, thường, số");
        return false;
    }
    setSuccess('password'); return true;
};

const validateConfirm = () => {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (confirm !== pass || confirm === "") {
        setError('confirmPassword', "Mật khẩu xác nhận không khớp");
        return false;
    }
    setSuccess('confirmPassword'); return true;
};

// Gắn sự kiện Blur (rời khỏi ô) và Input (đang gõ)
const inputs = [
    {id: 'fullname', func: validateFullname},
    {id: 'email', func: validateEmail},
    {id: 'phone', func: validatePhone},
    {id: 'password', func: validatePassword},
    {id: 'confirmPassword', func: validateConfirm}
];

inputs.forEach(item => {
    const inputEl = document.getElementById(item.id);
    // Khi rời khỏi ô thì kiểm tra ngay
    inputEl.addEventListener('blur', item.func);
    // Khi đang gõ thì xóa màu đỏ lỗi
    inputEl.addEventListener('input', () => {
        inputEl.closest('.form-control').classList.remove('error');
    });
});

// Xử lý nút Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Kiểm tra tất cả các trường
    const isNameOk = validateFullname();
    const isEmailOk = validateEmail();
    const isPhoneOk = validatePhone();
    const isPassOk = validatePassword();
    const isConfirmOk = validateConfirm();

    // Kiểm tra Radio Giới tính
    const genderChecked = document.querySelector('input[name="gender"]:checked');
    const isGenderOk = !!genderChecked;
    document.getElementById('genderError').style.visibility = isGenderOk ? 'hidden' : 'visible';

    // Kiểm tra Checkbox Điều khoản
    const termsChecked = document.getElementById('terms').checked;
    const isTermsOk = termsChecked;
    document.getElementById('termsError').style.visibility = isTermsOk ? 'hidden' : 'visible';

    if (isNameOk && isEmailOk && isPhoneOk && isPassOk && isConfirmOk && isGenderOk && isTermsOk) {
        form.style.display = 'none';
        successBox.style.display = 'block';
        document.getElementById('welcomeUser').innerText = `Chào mừng ${document.getElementById('fullname').value} đã gia nhập!`;
    }
});