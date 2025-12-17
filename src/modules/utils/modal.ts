// src/modules/utils/modal.ts

// GLOBAL: Handle any .btn-cancel-modal click
document.addEventListener("click", (e) => {
  const btn = e.target as HTMLElement;
  if (!btn.closest(".btn-va-modal--secondary")) return;

  const modalWrapper = btn.closest<HTMLElement>(".va-modal__content");
  if (!modalWrapper) return;

  const modalBg = modalWrapper.closest<HTMLElement>(".va-modal");
  if (!modalBg) return;

  closeModal(modalBg, modalWrapper);

});

// Animate open modal
export function openModal(modalBg: HTMLElement, modalWrapper: HTMLElement, onComplete?: () => void) {
  modalBg.classList.add("open");

  // Reset any persisted GSAP styles
  gsap.set(modalWrapper, { clearProps: "all" });
  
  gsap.timeline({
    onComplete: () => {
      modalBg.classList.add("open");
      if (onComplete) onComplete();
    }
  })
  .to(modalWrapper, { y: -20, autoAlpha: 1, duration: 0.5, ease: "power4.out" }, 0)
  .to(modalBg, { autoAlpha: 1, duration: 0.5, ease: "power4.out" }, 0);

  // Add Escape key listener
  const escHandler = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal(modalBg, modalWrapper);
      document.removeEventListener("keydown", escHandler); // Clean up listener
    }
  };

  document.addEventListener("keydown", escHandler);

}

// Animate close modal
export function closeModal(modalBg: HTMLElement | null, modalWrapper: HTMLElement | null, onComplete?: () => void) {
  if (!modalBg || !modalWrapper) return;

  gsap.timeline({
    onComplete: () => {
      modalBg.classList.remove("open");
      if (onComplete) onComplete();
    }
  })
  .to(modalWrapper, { y: 20, autoAlpha: 0, duration: 0.25, ease: "power4.in" }, 0)
  .to(modalBg, { autoAlpha: 0, duration: 0.25, ease: "power4.in" }, 0);
}