// src/modules/users/auth/auth.client.ts

import { openModal, closeModal } from '../../../modules/utils/modal';

type AuthResponse =
  | { success: true; isAdmin: boolean }
  | { success: false; message: string };

export default function initAuthClient() {

  const form = document.querySelector<HTMLFormElement>("#login-form");
  const emailInput = document.querySelector<HTMLInputElement>("#email");
  const passwordInput = document.querySelector<HTMLInputElement>("#password");
  const submitButton = document.querySelector<HTMLButtonElement>("#btn-login");

  // Modal elements
  const modalBg = document.querySelector<HTMLElement>(".va-modal");
  const modalWrapper = document.querySelector<HTMLElement>(".va-modal__content");
  const modalText = document.querySelector<HTMLElement>(".va-modal__body");

  if (submitButton && form && emailInput && passwordInput) {
    submitButton.addEventListener("click", async (e) => {
      e.preventDefault();

      submitButton.disabled = true;

      const email = emailInput?.value.trim() || "";
      const password = passwordInput?.value || "";

      if (!email || !password) {
        if (modalText && modalBg && modalWrapper) {
          modalText.textContent = "Please enter both email and password.";
          openModal(modalBg, modalWrapper);
        }
        submitButton.disabled = false;
        return;
      }

      try {
        const res = await fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data: AuthResponse = await res.json();

        if (!data.success) {
          if (modalText && modalBg && modalWrapper) {
            modalText.textContent = data.message;
            openModal(modalBg, modalWrapper);
          }
          submitButton.disabled = false;
          return;
        }

        // Redirect based on role
        window.location.href = "/beta";
      } catch (err) {
        if (modalText && modalBg && modalWrapper) {
          modalText.textContent = "Something went wrong. Please try again.";
          openModal(modalBg, modalWrapper);
        }
      } finally {
        submitButton.disabled = false;
      }
    });

  }

}