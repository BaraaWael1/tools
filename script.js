// ==========================================
// 1. نظام القائمة الجانبية (التلت شرط) والترجمة
// ==========================================
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
}

let isArabic = true;
function toggleLanguage() {
    isArabic = !isArabic;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = isArabic ? 'ar' : 'en';
}

// ==========================================
// 2. عداد الكلمات والحروف (شغال لحظياً)
// ==========================================
const textInput = document.getElementById('text-input');
const wordCountDisplay = document.getElementById('word-count');
const charCountDisplay = document.getElementById('char-count');

textInput.addEventListener('input', () => {
    const text = textInput.value.trim();
    charCountDisplay.textContent = text.length;
    const words = text === '' ? 0 : text.split(/\s+/).length;
    wordCountDisplay.textContent = words;
});

// ==========================================
// 3. أداة توليد الباركود
// ==========================================
function generateBarcode() {
    const text = textInput.value.trim();
    if (!text) {
        alert("اكتب نص أو أرقام في المربع أولاً لتوليد الباركود!");
        return;
    }
    try {
        JsBarcode("#barcode", text, {
            format: "CODE128",
            lineColor: "#6A0DAD",
            width: 2,
            height: 60,
            displayValue: true
        });
    } catch (e) {
        alert("يرجى إدخال حروف إنجليزية أو أرقام صحيحة للباركود.");
    }
}

// ==========================================
// 4. حفظ النص في ملف .txt
// ==========================================
function saveFile() {
    const text = textInput.value;
    if (!text) {
        alert("مفيش نص عشان نحفظه!");
        return;
    }
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "my-document.txt";
    link.click();
}

// ==========================================
// 5. رفع ملف نصي وقراءته
// ==========================================
document.getElementById('file-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        textInput.value = e.target.result;
        textInput.dispatchEvent(new Event('input')); // تحديث العداد تلقائياً
    };
    reader.readAsText(file);
});

// ==========================================
// 6. أدوات مسح ونسخ النص
// ==========================================
function clearText() {
    textInput.value = '';
    textInput.dispatchEvent(new Event('input'));
    document.getElementById('barcode').innerHTML = '';
}

function copyText() {
    if (!textInput.value) {
        alert("مفيش نص للنسخ!");
        return;
    }
    textInput.select();
    navigator.clipboard.writeText(textInput.value);
    alert("تم نسخ النص بنجاح!");
}
