// ==========================================
// أداة 1: مولد كلمات المرور
// ==========================================
function generatePassword() {
    // الحروف والأرقام والرموز المسموح بيها
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    const passwordLength = 16; // طول كلمة المرور

    // حلقة تكرارية لاختيار حروف عشوائية
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    // عرض كلمة المرور في المربع المخصص
    document.getElementById("passwordOutput").value = password;
}

// ==========================================
// أداة 2: تحويل PDF إلى صورة (الصفحة الأولى كمثال)
// ==========================================

// إعداد مكتبة pdf.js
const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

async function convertPdfToImage() {
    const fileInput = document.getElementById('pdfInput');
    const canvas = document.getElementById('pdfCanvas');
    
    // التأكد من اختيار ملف
    if (fileInput.files.length === 0) {
        alert("يرجى اختيار ملف PDF أولاً!");
        return;
    }

    const file = fileInput.files[0];
    const fileReader = new FileReader();

    fileReader.onload = async function() {
        const typedarray = new Uint8Array(this.result);
        
        try {
            // قراءة ملف الـ PDF
            const pdf = await pdfjsLib.getDocument(typedarray).promise;
            
            // جلب الصفحة الأولى فقط (تقدر تعدلها لو عايز صفحات تانية)
            const page = await pdf.getPage(1);
            
            // إعداد أبعاد الصورة (Scale 1.5 لجودة أفضل)
            const viewport = page.getViewport({scale: 1.5});
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            // رسم الصفحة على الـ Canvas
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            
            await page.render(renderContext).promise;
            
            // إظهار الصورة بعد انتهاء التحويل
            canvas.style.display = "block"; 
            
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء قراءة أو تحويل الملف.");
        }
    };

    // بدء قراءة الملف
    fileReader.readAsArrayBuffer(file);
}
