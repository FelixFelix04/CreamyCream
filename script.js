// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有套餐选择按钮
    const packageButtons = document.querySelectorAll('.select-package');
    const orderForm = document.getElementById('orderForm');
    const selectedPackageInput = document.getElementById('selectedPackage');

    // 为每个套餐按钮添加点击事件
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            selectedPackageInput.value = packageType;
            
            // 显示订单表单
            orderForm.style.display = 'block';
            
            // 滚动到表单位置
            orderForm.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 表单提交处理
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                selectedPackage: selectedPackageInput.value,
                deliveryDate: document.getElementById('deliveryDate').value,
                customerName: document.getElementById('customerName').value,
                customerPhone: document.getElementById('customerPhone').value,
                customerAddress: document.getElementById('customerAddress').value,
                specialInstructions: document.getElementById('specialInstructions').value
            };
            
            // 验证表单数据
            if (validateForm(formData)) {
                // 显示成功消息
                showMessage('订单提交成功！我们会尽快与您联系确认订单详情。', 'success');
                // 重置表单
                orderForm.reset();
                // 隐藏表单
                orderForm.style.display = 'none';
            }
        });
    }
    
    // 设置日期选择器的最小日期为今天
    const deliveryDateInput = document.getElementById('deliveryDate');
    if (deliveryDateInput) {
        const today = new Date().toISOString().split('T')[0];
        deliveryDateInput.min = today;
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 表单验证函数
function validateForm(data) {
    // 检查必填字段
    const requiredFields = ['selectedPackage', 'deliveryDate', 'customerName', 'customerPhone', 'customerAddress'];
    
    for (const field of requiredFields) {
        if (!data[field]) {
            showMessage(`请填写${getFieldName(field)}`, 'error');
            return false;
        }
    }
    
    // 验证电话号码
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(data.customerPhone)) {
        showMessage('请输入有效的手机号码', 'error');
        return false;
    }
    
    // 验证配送日期
    const deliveryDate = new Date(data.deliveryDate);
    const today = new Date();
    if (deliveryDate < today) {
        showMessage('配送日期不能早于今天', 'error');
        return false;
    }
    
    return true;
}

// 获取字段中文名称
function getFieldName(field) {
    const fieldNames = {
        selectedPackage: '蛋糕套餐',
        deliveryDate: '配送日期',
        customerName: '姓名',
        customerPhone: '电话',
        customerAddress: '配送地址'
    };
    return fieldNames[field] || field;
}

// 显示消息函数
function showMessage(message, type) {
    // 创建消息元素
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // 添加样式
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.padding = '1rem 2rem';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = '1000';
    
    // 根据消息类型设置样式
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#4CAF50';
        messageDiv.style.color = 'white';
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#f44336';
        messageDiv.style.color = 'white';
    }
    
    // 添加到页面
    document.body.appendChild(messageDiv);
    
    // 3秒后移除消息
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// 添加导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.backgroundColor = '#fff';
    }
}); 