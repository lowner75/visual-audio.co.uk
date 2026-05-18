// src/modules/messages/messages.ts

import { openModal, closeModal } from '../../modules/utils/modal';

export default function initMessagesModule() {

  const contactFormModal = document.querySelector('.va-modal--contact-form') as HTMLElement;
  const contactFormContent = document.querySelector('.va-modal__content') as HTMLElement;
  const contactForm = document.getElementById('contact-form') as HTMLFormElement;
  const submitBtn = document.getElementById('btn-new-contact-form-message') as HTMLButtonElement;
  if (!contactForm || !submitBtn || !contactFormModal || !contactFormContent) return;

  // Handle contact form submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    openModal(contactFormModal, contactFormContent); // Use your existing modal
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = new FormData(contactForm);
    const body: any = {
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      email: formData.get('email'),
      telephone: formData.get('telephone'),
      message: formData.get('message'),
      source: 'contact-form',
    };

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      //console.log('Message submission response:', json);

      if (!json.success === false) console.log(json.message.error || 'Unknown server error');

      // Success
      contactForm.reset();
      openModal(contactFormModal, contactFormContent); // Use your existing modal
    } catch (err) {
      console.error('Message submission failed:', err);
      openModal(contactFormModal, contactFormContent); // Optional: error modal
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Enquiry';
    }
  });
}