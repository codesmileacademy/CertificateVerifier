// Tələbə bazası - Hər yeni sertifikat verdikdə bura məlumatları əlavə edin
const certificatesDB = {
    "CSA-2026-001": {
        name: "Əli Əliyev",
        course_az: "Manual QA və SQL",
        course_en: "Manual QA and SQL",
        date_az: "15 Oktyabr 2026",
        date_en: "October 15, 2026",
        file: "certificates/CSA-2026-001.pdf"
    },
    "DAC-2026-011-157": {
        name: "Anar Mustafayev",
        course_az: "Data Analitika",
        course_en: "Data Analytics",
        date_az: "09 Noyabr 2026",
        date_en: "November 09, 2026",
        file: "certificates/DAC-2026-011-157.pdf"
    }
};

// --- DİL TƏRCÜMƏ BAZASI (Lüğət) ---
const translations = {
    "az": {
        title: "Sertifikat Verifikasiya Portalı",
        subtitle: "Sertifikatın etibarlılığını yoxlamaq üçün unikal identifikasiya nömrəsini daxil edin.",
        placeholder: "MƏS: CSA-2026-001",
        btnVerify: "YOXLA",
        errorEmpty: "Sertifikat nömrəsi daxil edilməlidir.",
        status: "Təsdiqlənmiş Sertifikat",
        lblName: "TƏLƏBƏ:",
        lblCourse: "TƏDRİS PROQRAMI:",
        lblDate: "VERİLMƏ TARİXİ:",
        lblId: "SERTİFİKAT ID:",
        btnPdf: "Sertifikata Bax (PDF)",
        notFound: "Qeyd etdiyiniz nömrəyə uyğun sertifikat tapılmadı.",
        footer: "&copy; 2026 CodeSmile Academy. Bütün hüquqlar qorunur."
    },
    "en": {
        title: "Certificate Verification Portal",
        subtitle: "Enter the unique identification number to verify the validity of the certificate.",
        placeholder: "E.G: CSA-2026-001",
        btnVerify: "VERIFY",
        errorEmpty: "Certificate number is required.",
        status: "Verified Certificate",
        lblName: "STUDENT:",
        lblCourse: "TRAINING PROGRAM:",
        lblDate: "ISSUE DATE:",
        lblId: "CERTIFICATE ID:",
        btnPdf: "View Certificate (PDF)",
        notFound: "No certificate found matching the entered ID.",
        footer: "&copy; 2026 CodeSmile Academy. All rights reserved."
    }
};

let currentLang = "az"; // Standart dil
let currentSearchedId = null; // Hazırda ekranda görünən tələbənin ID-si

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("verify-form");
    const input = document.getElementById("cert-id");
    const errorMsg = document.getElementById("error-msg");
    const resultCard = document.getElementById("result-card");
    const notFound = document.getElementById("not-found");

    // Dil düymələri
    const btnAz = document.getElementById("btn-az");
    const btnEn = document.getElementById("btn-en");

    // Nəticə elementləri
    const resName = document.getElementById("res-name");
    const resCourse = document.getElementById("res-course");
    const resDate = document.getElementById("res-date");
    const resId = document.getElementById("res-id");
    const resLink = document.getElementById("res-link");

    // URL-dən ID-ni avtomatik oxumaq
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');

    if (idFromUrl) {
        input.value = idFromUrl;
        verifyCertificate(idFromUrl);
    }

    // Yoxla düyməsi basıldıqda
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const certId = input.value.trim().toUpperCase();

        if (certId === "") {
            showError(translations[currentLang].errorEmpty);
            return;
        }
        verifyCertificate(certId);
    });

    function verifyCertificate(id) {
        errorMsg.classList.add("hidden");
        resultCard.classList.add("hidden");
        notFound.classList.add("hidden");

        const data = certificatesDB[id];

        if (data) {
            currentSearchedId = id; // Cari ID-ni yadda saxlayırıq ki, dil dəyişəndə datanı yeniləyək
            resName.textContent = data.name;
            resCourse.textContent = currentLang === "az" ? data.course_az : data.course_en;
            resDate.textContent = currentLang === "az" ? data.date_az : data.date_en;
            resId.textContent = id;
            resLink.href = data.file;
            
            resultCard.classList.remove("hidden");
        } else {
            currentSearchedId = null;
            notFound.textContent = translations[currentLang].notFound;
            notFound.classList.remove("hidden");
        }
    }

    function showError(msg) {
        errorMsg.textContent = msg;
        errorMsg.classList.remove("hidden");
        resultCard.classList.add("hidden");
        notFound.classList.add("hidden");
    }

    // --- DİL DƏYİŞDİRMƏ MƏNTİQİ ---
    btnAz.addEventListener("click", () => switchLang("az"));
    btnEn.addEventListener("click", () => switchLang("en"));

    function switchLang(lang) {
        currentLang = lang;
        
        // Düymələrin rəngini dəyiş
        if (lang === "az") {
            btnAz.classList.add("active");
            btnEn.classList.remove("active");
        } else {
            btnEn.classList.add("active");
            btnAz.classList.remove("active");
        }

        // Statik mətnləri tərcümə et
        document.getElementById("t-title").textContent = translations[lang].title;
        document.getElementById("t-subtitle").textContent = translations[lang].subtitle;
        document.getElementById("cert-id").placeholder = translations[lang].placeholder;
        document.getElementById("t-btn-verify").textContent = translations[lang].btnVerify;
        
        // Kartın içindəkiləri tərcümə et
        document.getElementById("t-status").innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> ` + translations[lang].status;
        document.getElementById("t-lbl-name").textContent = translations[lang].lblName;
        document.getElementById("t-lbl-course").textContent = translations[lang].lblCourse;
        document.getElementById("t-lbl-date").textContent = translations[lang].lblDate;
        document.getElementById("t-lbl-id").textContent = translations[lang].lblId;
        document.getElementById("res-link").textContent = translations[lang].btnPdf;
        
        // Footer-i tərcümə et
        document.getElementById("t-footer").innerHTML = translations[lang].footer;

        // Xəta pəncərəsi açıqdırsa onu da tərcümə et
        if (!notFound.classList.contains("hidden")) {
            notFound.textContent = translations[lang].notFound;
        }

        // Əgər ekranda tələbə sertifikatı açıqdırsa, onun kurs və tarix datasını tərcümə et
        if (currentSearchedId && certificatesDB[currentSearchedId]) {
            resCourse.textContent = lang === "az" ? certificatesDB[currentSearchedId].course_az : certificatesDB[currentSearchedId].course_en;
            resDate.textContent = lang === "az" ? certificatesDB[currentSearchedId].date_az : certificatesDB[currentSearchedId].date_en;
        }
    }
});
