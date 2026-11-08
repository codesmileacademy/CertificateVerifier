// Tələbə bazası
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
        file: "certificates/DAC-2026-011-157.png" // BURA DİQQƏT: .pdf yox, .png olmalıdır
    }
};

// Tərcümə bazası
const translations = {
    "az": {
        title: "SERTİFİKAT VERİFİKASİYA PORTALI",
        subtitle: "SERTİFİKATIN ETİBARLILIĞINI YOXLAMAQ ÜÇÜN UNİKAL İDENTİFİKASİYA NÖMRƏSİNİ DAXİL EDİN.",
        placeholder: "MƏS: CSA-2026-001",
        btnVerify: "YOXLA",
        errorEmpty: "Sertifikat nömrəsi daxil edilməlidir.",
        status: "Təsdiqlənmiş Sertifikat",
        lblName: "TƏLƏBƏ:",
        lblCourse: "TƏDRİS PROQRAMI:",
        lblDate: "VERİLMƏ TARİXİ:",
        lblId: "SERTİFİKAT ID:",
        btnPdf: "SERTİFİKATA BAX (PDF)",
        notFound: "Qeyd etdiyiniz nömrəyə uyğun sertifikat tapılmadı.",
        footer: "&copy; 2026 CodeSmile Academy. Bütün hüquqlar qorunur."
    },
    "en": {
        title: "CERTIFICATE VERIFICATION PORTAL",
        subtitle: "ENTER THE UNIQUE IDENTIFICATION NUMBER TO VERIFY THE VALIDITY OF THE CERTIFICATE.",
        placeholder: "E.G: CSA-2026-001",
        btnVerify: "VERIFY",
        errorEmpty: "Certificate number is required.",
        status: "Verified Certificate",
        lblName: "STUDENT:",
        lblCourse: "TRAINING PROGRAM:",
        lblDate: "ISSUE DATE:",
        lblId: "CERTIFICATE ID:",
        btnPdf: "VIEW CERTIFICATE (PDF)",
        notFound: "No certificate found matching the entered ID.",
        footer: "&copy; 2026 CodeSmile Academy. All rights reserved."
    }
};

let currentLang = "az";
let currentSearchedId = null;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("verify-form");
    const input = document.getElementById("cert-id");
    const errorMsg = document.getElementById("error-msg");
    const resultCard = document.getElementById("result-card");
    const notFound = document.getElementById("not-found");
    
    // Nəticə elementləri
    const resName = document.getElementById("res-name");
    const resCourse = document.getElementById("res-course");
    const resDate = document.getElementById("res-date");
    const resId = document.getElementById("res-id");
    const resLink = document.getElementById("res-link");

    // Dil dəyişdirmə məntiqi
    document.getElementById("btn-az").addEventListener("click", () => switchLang("az"));
    document.getElementById("btn-en").addEventListener("click", () => switchLang("en"));

    function switchLang(lang) {
        currentLang = lang;
        
        // Butonların rəngini dəyişmə
        document.getElementById("btn-az").classList.toggle("active", lang === "az");
        document.getElementById("btn-en").classList.toggle("active", lang === "en");

        // Statik mətnlərin tərcüməsi
        document.getElementById("t-title").textContent = translations[lang].title;
        document.getElementById("t-subtitle").textContent = translations[lang].subtitle;
        document.getElementById("cert-id").placeholder = translations[lang].placeholder;
        document.getElementById("t-btn-verify").textContent = translations[lang].btnVerify;
        
        document.getElementById("t-status").innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> ${translations[lang].status}`;
        document.getElementById("t-lbl-name").textContent = translations[lang].lblName;
        document.getElementById("t-lbl-course").textContent = translations[lang].lblCourse;
        document.getElementById("t-lbl-date").textContent = translations[lang].lblDate;
        document.getElementById("t-lbl-id").textContent = translations[lang].lblId;
        document.getElementById("t-btn-pdf").textContent = translations[lang].btnPdf;
        
        document.getElementById("t-footer").innerHTML = translations[lang].footer;

        // Xəta pəncərələrinin tərcüməsi
        if (!notFound.classList.contains("hidden")) {
            notFound.textContent = translations[lang].notFound;
        }
        if (!errorMsg.classList.contains("hidden")) {
            errorMsg.textContent = translations[lang].errorEmpty;
        }

        // Tələbə məlumatlarının tərcüməsi
        if (currentSearchedId && certificatesDB[currentSearchedId]) {
            resCourse.textContent = lang === "az" ? certificatesDB[currentSearchedId].course_az : certificatesDB[currentSearchedId].course_en;
            resDate.textContent = lang === "az" ? certificatesDB[currentSearchedId].date_az : certificatesDB[currentSearchedId].date_en;
        }
    }

    // Axtarış funksiyası
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    if (idFromUrl) {
        input.value = idFromUrl;
        verifyCertificate(idFromUrl);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const certId = input.value.trim().toUpperCase();
        if (certId === "") {
            errorMsg.textContent = translations[currentLang].errorEmpty;
            errorMsg.classList.remove("hidden");
            resultCard.classList.add("hidden");
            notFound.classList.add("hidden");
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
            currentSearchedId = id;
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
});
