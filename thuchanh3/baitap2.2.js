// 1. Định nghĩa giá sản phẩm
const prices = {
    "laptop": 15000000,
    "phone": 25000000,
    "headphone": 5000000
};

const form = document.getElementById('orderForm');
const confirmBox = document.getElementById('confirmBox');
const summary = document.getElementById('summary');

// --- HÀM TIỆN ÍCH ---
function showError(id, isError) {
    const input = document.getElementById(id);
    const err = document.getElementById(`err-${id}`);
    if (isError) {
        input.classList.add('invalid');
        err.style.display = 'block';
    } else {
        input.classList.remove('invalid');
        err.style.display = 'none';
    }
}

// --- TÍNH TỔNG TIỀN ---
function calculateTotal() {
    const product = document.getElementById('product').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const total = (prices[product] || 0) * quantity;
    document.getElementById('totalDisplay').innerText = total.toLocaleString('vi-VN') + 'đ';
    return total;
}

document.getElementById('product').addEventListener('change', calculateTotal);
document.getElementById('quantity').addEventListener('input', calculateTotal);

// --- ĐẾM KÝ TỰ REALTIME ---
document.getElementById('note').addEventListener('input', function() {
    const len = this.value.length;
    const charCount = document.getElementById('currentChar');
    charCount.innerText = len;
    
    if (len > 200) {
        charCount.style.color = 'red';
        showError('note', true);
    } else {
        charCount.style.color = '#666';
        showError('note', false);
    }
});

// --- VALIDATION LOGIC ---
function validateForm() {
    let isValid = true;

    // Sản phẩm
    if (!document.getElementById('product').value) {
        showError('product', true); isValid = false;
    } else showError('product', false);

    // Số lượng
    const qty = parseInt(document.getElementById('quantity').value);
    if (isNaN(qty) || qty < 1 || qty > 99) {
        showError('quantity', true); isValid = false;
    } else showError('quantity', false);

    // Ngày giao hàng
    const dateVal = new Date(document.getElementById('deliveryDate').value);
    const today = new Date();
    today.setHours(0,0,0,0);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    if (!document.getElementById('deliveryDate').value || dateVal < today || dateVal > maxDate) {
        showError('date', true); isValid = false;
    } else showError('date', false);

    // Địa chỉ
    if (document.getElementById('address').value.trim().length < 10) {
        showError('address', true); isValid = false;
    } else showError('address', false);

    // Thanh toán
    const payment = document.querySelector('input[name="payment"]:checked');
    const errPayment = document.getElementById('err-payment');
    if (!payment) {
        errPayment.style.display = 'block'; isValid = false;
    } else errPayment.style.display = 'none';

    return isValid;
}

// --- XỬ LÝ SUBMIT ---
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        // Hiện tóm tắt
        const productText = document.getElementById('product').options[document.getElementById('product').selectedIndex].text;
        summary.innerHTML = `
            <p>🛍️ <b>Sản phẩm:</b> ${productText}</p>
            <p>🔢 <b>Số lượng:</b> ${document.getElementById('quantity').value}</p>
            <p>💰 <b>Tổng tiền:</b> ${document.getElementById('totalDisplay').innerText}</p>
            <p>📅 <b>Ngày giao:</b> ${document.getElementById('deliveryDate').value}</p>
        `;
        confirmBox.style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
    }
});

// --- NÚT XÁC NHẬN CUỐI CÙNG ---
document.getElementById('btnFinal').addEventListener('click', function() {
    confirmBox.style.display = 'none';
    form.style.display = 'none';
    document.getElementById('successMsg').style.display = 'block';
});

document.getElementById('btnCancel').addEventListener('click', function() {
    confirmBox.style.display = 'none';
});