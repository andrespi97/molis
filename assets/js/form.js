/* Formulario de reserva: validación en cliente y estado de éxito.
   Pendiente: conectar a un endpoint real de envío. */

import { $, reduceMotion } from "./utils.js";

export function initForm() {
  const form = $("#trialForm");
  if (!form) return;

  const success = $("#formSuccess");
  const fields = {
    name: $("#name"),
    email: $("#email"),
    phone: $("#phone"),
    privacy: $("#privacy")
  };

  const fieldOf = (input) => input.closest(".field");

  const showError = (input, message) => {
    const field = fieldOf(input);
    if (!field) return;
    field.classList.add("has-error");
    const err = $(".field__error", field);
    if (err) err.textContent = message;
    input.setAttribute("aria-invalid", "true");
  };

  const clearError = (input) => {
    const field = fieldOf(input);
    if (!field) return;
    field.classList.remove("has-error");
    const err = $(".field__error", field);
    if (err) err.textContent = "";
    input.removeAttribute("aria-invalid");
  };

  const validate = () => {
    let firstInvalid = null;

    const fail = (input, msg) => {
      showError(input, msg);
      if (!firstInvalid) firstInvalid = input;
    };

    if (fields.name.value.trim().length < 2) fail(fields.name, "Dinos cómo te llamas.");
    else clearError(fields.name);

    const email = fields.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) fail(fields.email, "Revisa tu email.");
    else clearError(fields.email);

    const digits = fields.phone.value.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 11) fail(fields.phone, "Necesitamos un teléfono válido.");
    else clearError(fields.phone);

    if (!fields.privacy.checked) fail(fields.privacy, "Acepta la política para continuar.");
    else clearError(fields.privacy);

    return firstInvalid;
  };

  Object.values(fields).forEach((input) => {
    input.addEventListener("input", () => clearError(input));
    input.addEventListener("change", () => clearError(input));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const invalid = validate();
    if (invalid) {
      invalid.focus({ preventScroll: false });
      return;
    }

    form.classList.add("is-sent");
    if (success) {
      success.hidden = false;
      success.setAttribute("tabindex", "-1");
      success.focus({ preventScroll: true });
    }
    form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  });
}
