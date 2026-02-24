const originalMessages: Map<HTMLElement, string> = new Map();

function getOriginalMessage(span: HTMLElement): string {
  if (!originalMessages.has(span)) {
    originalMessages.set(span, span.textContent || "");
  }
  return originalMessages.get(span)!;
}

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

//Longitud de los inputs
function validateMinimumMaximum (selector: string, minimum: number, maximum?:number) {
  const input = document.querySelector(selector) as HTMLInputElement;
  if (!input) return;
  
  const span = input.nextElementSibling as HTMLElement;
  const mensajeOriginal = getOriginalMessage(span);
  
  const validate = () => {
    if (input.value.trim() === '') return;

    if (input.value.length < minimum) {
      input.style.border = "2px solid red";
      span.textContent = `Mínimo ${minimum} caracteres`;
      span.classList.remove('hidden');
      return;
    } 
    if (maximum !== undefined && input.value.length > maximum) {
      input.style.border = "2px solid red";
      span.textContent = `Debe tener como maximo ${maximum} caracteres`;
      span.classList.remove('hidden');
      return;
    }
    input.style.border = "";
    span.textContent = mensajeOriginal;
    span.classList.add('hidden')
  };

  input.addEventListener('input', validate);
  input.addEventListener('blur', validate);
}

function validateExactLength(selector: string, length: number) {
  const input = document.querySelector(selector) as HTMLInputElement;
  if (!input) return;
  
  const span = input.nextElementSibling as HTMLElement;
  const mensajeOriginal = getOriginalMessage(span); 
  
  const validate = () => {
    if (input.value.trim() === '') return;
    
    const valido = input.value.length === length;
    input.style.border = valido ? "" : "2px solid red";

    if (!valido) {
      span.textContent = `Debe tener exactamente ${length} dígitos`;
      span.classList.remove('hidden');
    } else {
      span.textContent = mensajeOriginal;
      span.classList.add('hidden');
    }
  };

  input.addEventListener('input', validate);
  input.addEventListener('blur', validate);
}

function validateAgeRange(selector: string) {
  const input = document.querySelector(selector) as HTMLInputElement;
  if (!input) return;

  const span = input.nextElementSibling as HTMLElement;
  const mensajeOriginal = getOriginalMessage(span);
  
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
    } else if (age > 125) {
      input.style.border = "2px solid red";
      span.textContent = "La edad no puede ser mayor a 125 años";
      span.classList.remove('hidden');
    } else {
      input.style.border = "";
      span.textContent = mensajeOriginal; 
      span.classList.add('hidden');
    }
  };

  input.addEventListener('input', validate);
  input.addEventListener('blur', validate);
}

function validarEmail(selector: string) {
  const input = document.querySelector(selector) as HTMLInputElement;
  if (!input) return;
  
  const span = input.nextElementSibling as HTMLElement;
  const mensajeOriginal = getOriginalMessage(span);

  
  const validate = () => {
    if (input.value.trim() === '') return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(input.value)) {
      input.style.border = "2px solid red";
      span.textContent = "Correo electrónico no válido";
      span.classList.remove('hidden');
    } else {
      input.style.border = "";
      span.textContent = mensajeOriginal;
      span.classList.add('hidden');
    }
  };

  input.addEventListener('input', validate);
  input.addEventListener('blur', validate);
}

function validateRequired(selector:string){
  const input = document.querySelector(selector) as HTMLInputElement;
  if (!input) return;

  const span = input.nextElementSibling as HTMLElement;
  const mensajeOriginal = getOriginalMessage(span);

  const validate = () => {
    if(input.value.trim()  === ''){
      span.textContent = "Campo requerido";
      span.classList.remove('hidden');
      input.style.border = "2px solid red";
    }else{
      span.textContent = mensajeOriginal;
    }
  }
  input.addEventListener('blur', validate);  
  input.addEventListener('input', validate);
}

function limitDigitCount(select: string, digit: number){
  const input = document.querySelector(select) as HTMLInputElement;
  if(!input) return;

  input.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
        if(target.value.length > digit){
      target.value = target.value.slice(0, digit);
    }
  });
}

function validateBirthDate(selector: string) {
  const input = document.querySelector(selector) as HTMLInputElement;
  if (!input) return;

  const today = new Date();
  const maximumDate = new Date();

  maximumDate.setFullYear(today.getFullYear() - 18);

  const year = maximumDate.getFullYear();
  const month = String(maximumDate.getMonth() + 1).padStart(2, '0');
  const day = String(maximumDate.getDate()).padStart(2, '0');

  const maxDate = `${year}-${month}-${day}`;
  input.setAttribute('max', maxDate);
}


export function initFormValidations() {
  // Nombres
  validateOnlyLetters("#names");
  validateRequired("#names");
  validateMinimumMaximum('#names', 2, 50);
  
  // Apellidos
  validateOnlyLetters("#last_names");
  validateRequired("#last_names");
  validateMinimumMaximum('#last_names', 2, 50);
  
  // Número identificación
  validateOnlyNumber("#identification_number");
  validateRequired("#identification_number");
  validateMinimumMaximum('#identification_number', 6, 50);
  
  // Teléfono
  validateOnlyNumber("#phone");
  limitDigitCount("#phone", 10);
  validateRequired("#phone");         
  validateExactLength('#phone', 10); 
  
  // Email
  validateRequired("#email");         
  validarEmail("#email");           
  
  // Edad
  validateOnlyNumber("#age");
  validateRequired("#age");
  limitDigitCount("#age", 3);
  validateAgeRange("#age");

  validateBirthDate("#date_birth");

}