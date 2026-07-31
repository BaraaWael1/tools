:root {
    --primary-color: #0071e3; /* لون أبل الأزرق */
    --background-color: #fbfbfd;
    --card-bg: rgba(255, 255, 255, 0.7);
    --text-color: #1d1d1f;
    --text-muted: #86868b;
    --success-color: #34c759;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Cairo', -apple-system, BlinkMacSystemFont, sans-serif;
    scroll-behavior: smooth;
}

body {
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    transition: direction 0.3s ease;
    overflow-x: hidden;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

/* الهيدر الزجاجي Glassmorphism */
.header {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color);
}

.subtitle {
    text-align: center;
    color: var(--text-muted);
    font-size: 1rem;
    margin-top: 10px;
}

/* الأزرار العلوية */
.lang-btn, .menu-btn, .close-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: var(--primary-color);
    cursor: pointer;
    transition: transform 0.2s ease;
}

.lang-btn:hover, .menu-btn:hover {
    transform: scale(1.1);
}

.lang-btn {
    background-color: rgba(0, 113, 227, 0.1);
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
}

/* القائمة الجانبية (Sidebar) */
.sidebar {
    position: fixed;
    top: 0;
    right: -300px;
    width: 280px;
    height: 100vh;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: -5px 0 30px rgba(0,0,0,0.1);
    z-index: 1000;
    transition: right 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    padding: 30px 20px;
}

html[dir="ltr"] .sidebar {
    right: auto;
    left: -300px;
    box-shadow: 5px 0 30px rgba(0,0,0,0.1);
    transition: left 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.sidebar.active { right: 0; }
html[dir="ltr"] .sidebar.active { left: 0; }

.close-btn { position: absolute; top: 20px; left: 20px; font-size: 1.5rem; color: #ff3b30; }
html[dir="ltr"] .close-btn { left: auto; right: 20px; }

.menu-list { list-style: none; }
.menu-list li { margin-bottom: 15px; }
.menu-list a {
    text-decoration: none;
    color: var(--text-color);
    font-size: 1.1rem;
    font-weight: 600;
    display: block;
    padding: 10px;
    border-radius: 10px;
    transition: background 0.3s;
}
.menu-list a:hover { background: rgba(0, 113, 227, 0.1); color: var(--primary-color); }
.menu-list i { width: 25px; color: var(--primary-color); }

.overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.4); z-index: 999; display: none; opacity: 0;
    transition: opacity 0.4s;
}
.overlay.active { display: block; opacity: 1; }

/* الكروت (أبل ستايل) */
.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin: 50px 0;
}

.tool-card {
    background: var(--card-bg);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.8);
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
}

.tool-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.icon-wrapper {
    width: 60px; height: 60px;
    background: linear-gradient(135deg, var(--primary-color), #4db8ff);
    color: white;
    border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem;
    margin: 0 auto 20px;
    box-shadow: 0 10px 20px rgba(0, 113, 227, 0.3);
}

.tool-input, .file-input {
    width: 100%; padding: 12px; margin-bottom: 15px;
    border: 1px solid #d2d2d7; border-radius: 12px;
    font-size: 1rem; background-color: #fff;
    text-align: center; outline: none; transition: border-color 0.3s;
}
.tool-input:focus { border-color: var(--primary-color); }

.btn {
    background-color: var(--primary-color); color: white;
    border: none; padding: 12px 25px; border-radius: 25px;
    font-size: 1rem; font-weight: 600; cursor: pointer;
    transition: transform 0.2s, background 0.3s; width: 100%;
    display: inline-block;
}
.btn:active { transform: scale(0.95); }
.btn:hover { background-color: #005bb5; }
.btn-success { background-color: var(--success-color); }
.btn-success:hover { background-color: #28a745; }

/* عداد الكلمات */
.counter-stats {
    display: flex; justify-content: space-around;
    margin-top: 15px; background: rgba(0,0,0,0.03);
    padding: 10px; border-radius: 12px;
}
.counter-stats strong { font-size: 1.5rem; color: var(--primary-color); }

/* قسم التعليمات */
.instructions {
    background: white; padding: 30px; border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    margin-bottom: 50px;
}
.instructions h2 { margin-bottom: 20px; color: var(--text-color); }
.instructions ul { padding-right: 20px; }
html[dir="ltr"] .instructions ul { padding-right: 0; padding-left: 20px; }
.instructions li { margin-bottom: 10px; color: var(--text-muted); }

/* الفوتر */
.footer {
    text-align: center; padding: 30px;
    background-color: #f5f5f7; color: var(--text-muted);
    margin-top: auto;
}
.contact-info {
    display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; font-size: 1.1rem;
}

/* مؤثرات أبل (الحركة عند التمرير) */
.animate { opacity: 0; }
.fade-up { transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
.fade-in { transition: opacity 1s ease-out; }
.animate.show { opacity: 1; transform: translateY(0); }
