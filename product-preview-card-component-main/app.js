// ===== Select elements =====
const addToCartBtn = document.querySelector('button.add-to-cart-btn');
const modalOverlay = document.getElementById('modalOverlay');
const modalBox = document.getElementById('modalBox');
const closeModal = document.getElementById('closeModal');
const continueBtn = document.getElementById('continueBtn');

// ===== Safety check =====
if (addToCartBtn && modalOverlay && modalBox && closeModal && continueBtn) {

    // === Open modal ===
    addToCartBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
        // small delay for smooth animation
        setTimeout(() => modalBox.classList.add('active'), 50);
        // modalBox.classList.add('active');
    });

    // === Close modal helper ===
    function closeModalWindow() {
        modalBox.classList.remove('active');
        // delay to let modal fade out before overlay hides
        setTimeout(() => modalOverlay.classList.remove('active'), 200);
    }

    // === Close modal by clicking buttons or X ===
    closeModal.addEventListener('click', closeModalWindow);
    continueBtn.addEventListener('click', closeModalWindow);

    // === Close modal by clicking on overlay ===
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModalWindow();
    });

    // === Optional: close modal on Esc key ===
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModalWindow();
        }
    });
}
