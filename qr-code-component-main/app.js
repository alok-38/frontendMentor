document.addEventListener("DOMContentLoaded", () => {
    const qrcodeContainer = document.getElementById("qrcode");

    const link = document.createElement("a");
    link.href = "https://www.frontendmentor.io";
    link.target = "_blank";
    link.rel = "noopener";
    qrcodeContainer.appendChild(link);

    new QRCode(link, {
        text: "https://www.frontendmentor.io",
        width: 280,
        height: 280,
        colorDark: "#2c7dfa",   // dark color of the QR code (modules)
        colorLight: "#ffffffff",  // background color of the QR code
        correctLevel: QRCode.CorrectLevel.H,
    });
});
