// ==========================================
// نظام الترجمة
// ==========================================
const translations = {
    ar: {
        title: "أدواتي الذكية",
        subtitle: "مجموعتك المفضلة من الأدوات السريعة والمجانية",
        tool1Title: "مولد كلمات المرور",
        tool1Desc: "أنشئ كلمات مرور قوية ومعقدة لحماية حساباتك.",
        tool1Btn: "توليد كلمة مرور",
        passPlaceholder: "كلمة المرور ستظهر هنا",
        tool2Title: "PDF إلى صورة",
        tool2Desc: "حول ملفات الـ PDF الخاصة بك إلى صور بسهولة.",
        tool2Btn: "تحويل إلى صورة",
        footer: "تم التصميم بحب &copy; 2026 | مبرمج الأدوات",
        langText: "English",
        alertNoFile: "يرجى اختيار ملف PDF أولاً!",
        alertError: "حدث خطأ أثناء قراءة أو تحويل الملف."
    },
    en: {
        title: "Smart Tools",
        subtitle: "Your favorite collection of fast and free tools",
        tool1Title: "Password Generator",
        tool1Desc: "Create strong and complex passwords to protect your accounts.",
        tool1Btn: "Generate Password",
        passPlaceholder: "Password will appear here",
        tool2Title: "PDF to Image",
        tool2Desc: "Convert your PDF files to images easily.",
        tool2Btn: "Convert to Image",
        footer: "Designed with love &copy; 2026 | Tools Developer",
        langText: "عربي",
        alertNoFile: "Please select a PDF file first!",
        alertError: "An error occurred while reading or converting the file."
    }
};

let currentLang = "ar"; // اللغة الافتراضية

function toggleLanguage() {
    // تبديل اللغة
    currentLang = currentLang === "ar" ? "en" : "ar";
    
    // تغيير اتجاه الصفحة
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
    
    // تغيير كل النصوص اللي واخدة data-key
    document.querySelectorAll("[data-key]").forEach(elem => {
        const key = elem.getAttribute("data-key");
        elem.innerHTML = translations[currentLang][key];
    });

    // تغيير النصوص داخل الحقول (Placeholders)
    document.getElementById("passwordOutput").placeholder = translations[currentLang].passPlaceholder;
    
    // تغيير كلمة زرار اللغة نفسه
    document.getElementById("langText").innerText = translations[currentLang].langText;
}

// ==========================================
// أداة 1: مولد كلمات المرور
// ==========================================
function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 16; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    document.getElementById("passwordOutput").value = password;
}

// ==========================================
// أداة 2: تحويل PDF إلى صورة
// ==========================================
const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

async function convertPdfToImage() {
    const fileInput = document.getElementById('pdfInput');
    const canvas = document.getElementById('pdfCanvas');
    
    if (fileInput.files.length === 0) {
        alert(translations[currentLang].alertNoFile); // التنبيه حسب اللغة
        return;
    }

    const file = fileInput.files[0];
    const fileReader = new FileReader();

    fileReader.onload = async function() {
        const typedarray = new Uint8Array(this.result);
        try {
            const pdf = await pdfjsLib.getDocument(typedarray).promise;
            const page = await pdf.getPage(1);
            
            const viewport = page.getViewport({scale: 1.5});
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            await page.render({ canvasContext: context, viewport: viewport }).promise;
            canvas.style.display = "block"; 
        } catch (error) {
            console.error(error);
            alert(translations[currentLang].alertError); // التنبيه حسب اللغة
        }
    };
    fileReader.readAsArrayBuffer(file);
}
