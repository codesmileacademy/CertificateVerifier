// Tələbə bazası - Hər yeni sertifikat verdikdə bura məlumatları əlavə edin
const certificatesDB = {
    "DAC-2026-011-157": {
        name: "Anar Mustafayev",
        course: "Data Analitika",
        date: "09 Noyabr 2026",
        file: "certificates/DAC-2026-011-157.png"
    },
    "CSA-2026-001": {
        name: "Əli Əliyev",
        course: "Manual QA və SQL",
        date: "15 Oktyabr 2026",
        file: "certificates/CSA-2026-001.pdf"
    },
    "CSA-2026-002": {
        name: "Aygün Məmmədova",
        course: "Manual QA",
        date: "18 Oktyabr 2026",
        file: "certificates/CSA-2026-002.pdf"
    }
    // Yeni tələbələri bu formata uyğun alta əlavə edə bilərsiniz
};

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

    // URL-dən ID-ni avtomatik oxumaq (Məsələn: codesmile.github.io/verify?id=CSA-2026-001)
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
            showError("Zəhmət olmasa sertifikat nömrəsini daxil edin.");
            return;
        }

        verifyCertificate(certId);
    });

    function verifyCertificate(id) {
        // Əvvəlki mesajları gizlət
        errorMsg.classList.add("hidden");
        resultCard.classList.add("hidden");
        notFound.classList.add("hidden");

        const data = certificatesDB[id];

        if (data) {
            // Məlumat tapıldı
            resName.textContent = data.name;
            resCourse.textContent = data.course;
            resDate.textContent = data.date;
            resId.textContent = id;
            resLink.href = data.file;
            
            resultCard.classList.remove("hidden");
        } else {
            // Məlumat tapılmadı
            notFound.classList.remove("hidden");
        }
    }

    function showError(msg) {
        errorMsg.textContent = msg;
        errorMsg.classList.remove("hidden");
        resultCard.classList.add("hidden");
        notFound.classList.add("hidden");
    }
});
