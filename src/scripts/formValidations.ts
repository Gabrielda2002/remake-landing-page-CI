function validateOnlyLetters (selector: string) {
  const input = document.querySelector(selector) as HTMLInputElement;
  input?.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
  });
}

function validateOnlyNumber(selector: string) {
  const input = document.querySelector(selector) as HTMLInputElement;
  input?.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, '');
  });
}

function validateMinimum(selector: string, minimo: number) {
  const input = document.querySelector(selector) as HTMLInputElement;
  if (!input) return;
  
  const span = input.nextElementSibling as HTMLElement;
  
  const validate = () => {
    const valido = input.value.length === 0 || input.value.length >= minimo;
    input.style.border = valido ? "" : "2px solid red";
    span.classList.toggle('hidden', valido);
  };

  input.addEventListener('input', validate);
  input.addEventListener('blur', validate);
}

function validateExactLength(selector: string, longitud: number) {
  const input = document.querySelector(selector) as HTMLInputElement;
  if (!input) return;
  
  const span = input.nextElementSibling as HTMLElement;
  
  const validate = () => {
    const valido = input.value.length === 0 || input.value.length === longitud;
    input.style.border = valido ? "" : "2px solid red";
    span.classList.toggle('hidden', valido);
  };

  input.addEventListener('input', validate);
  input.addEventListener('blur', validate);
}

function validateAgeRange(selector: string) {
  const input = document.querySelector(selector) as HTMLInputElement;
  if (!input) return;

  const span = input.nextElementSibling as HTMLElement;
  
  const validate = () => {
    if (input.value === '') {
      input.style.border = "";
      span.classList.add('hidden');
      return;
    }

    const age = parseInt(input.value);
    
    if (age < 18) {
      input.style.border = "2px solid red";
      span.textContent = "Debes tener al menos 18 años";
      span.classList.remove('hidden');
    } else if (age > 120) {
      input.style.border = "2px solid red";
      span.textContent = "La edad no puede ser mayor a 120 años";
      span.classList.remove('hidden');
    } else {
      input.style.border = "";
      span.classList.add('hidden');
    }
  };

  input.addEventListener('input', validate);
  input.addEventListener('blur', validate);
}

export function initFormValidations(){
  validateOnlyLetters("#names");
  validateOnlyLetters("#last_names");
  validateOnlyNumber("#phone");
  validateOnlyNumber("#identification_number");

  validateMinimum('#names', 2);
  validateMinimum('#last_names', 2);
  validateMinimum('#identification_number', 6);
  
  validateExactLength('#phone', 10);
  validateAgeRange("#age");
}

