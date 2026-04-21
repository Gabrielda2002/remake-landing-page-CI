export const defaultLang = "es";

export const translations = {
  es: {
    //header
    nav: {
      inicio: "Inicio",
      quienesSomos: "Quienes Somos",
      trayectoria: "Trayectoria",
      instituto: "Instituto de Investigación",
      servicios: "Servicios",
      contactenos: "Contáctenos", 
    },
    social: {
      facebook: "Seleccione para ir a la pagina de Facebook",
      instagram: "Seleccione para ir a la pagina de Instagram",
      tiktok: "Seleccione para ir a la pagina de Tiktok",
    },
    languages:{ 
      selectPrompt: "Seleccione para ver las opciones de navegación",
      es: "Español",
      en: "Inglés"
    },

    //Landing
    landing:{
      title: "Innovamos con ciencia,",
      subtitle: "Transformamos con conocimiento.",
      text: "Aplicando rigor, estrategia y tecnología en cada desafío."
    },

    //about
    aboutUs: {
      title: "SOMOS",
      nordvital: { 
        subtitle: "NORDVITAL IPS SAS", 
        paragraph: "Somos una Institución Prestadora de Servicios de Salud (IPS) que ofrece atención de baja y mediana complejidad, comprometida con la calidad e innovación. Contamos con 11 sedes distribuidas estratégicamente en los departamentos de Norte de Santander, Cundinamarca y Amazonas, lo que nos permite brindar una cobertura efectiva y oportuna en diferentes regiones del país." },
      commitment: { 
        subtitle: "NUESTRO COMPROMISO",
        paragraph: "En nuestra búsqueda constante por la innovación y la contribución efectiva al avance de la salud, nuestra institución ha obtenido la certificación de cumplimiento de las Buenas Prácticas Clínicas en la ciudad de Cúcuta. Este importante logro nos faculta para continuar aportando a la ciencia a través de la realización de investigaciones con medicamentos en seres humanos."},
      vision: {
        subtitle: "VISIÓN",
        paragraph: "Actualmente, desarrollamos estudios clínicos en diversas especialidades, entre ellas: fisioterapia, cardiología, dermatología, endocrinología, medicina general, medicina interna, neumología, ortopedia, psicología y reumatología."
      },
      text: "Lo hacemos porque creemos en una medicina que evoluciona con propósito. Investigamos para anticiparnos a los desafíos de la salud y ofrecer soluciones reales que mejoren la vida de las personas, <strong>hoy y mañana.</strong>"
    },
    
    //texto
    text: {
      title: "NUESTRO CAMINO",
      subtitle: "Hoy Somos:",
      year: "AÑOS",
      paragraph: "Impulsando la salud con servicios de baja y mediana complejidad, respaldados por excelencia humana y profesional. Nuestras alianzas con EPS de alto prestigio fortalecen nuestra posición en el sector.",
      pioneers:{ 
        accent: "Pioneros en Norte de Santander:",
        content: "Primeros en obtener la certificación en Buenas Prácticas Clínicas del Invima."
      },
      capacity:{ 
        accent: "Capacidad validada:",
        content: "Autorizados para conducir investigaciones clínicas con medicamentos en seres humanos."
      },
      infrastructure:{ 
        accent: "Infraestructura de alto nivel:",
        content: "Espacios y recursos para estudios de Fases II, III y IV." 
      },
      experts:{ 
        accent: "Expertos en nuevas evidencias:", 
        content: "Desarrollamos estudios observacionales, Real World Evidence (RWE) e Investigación Aplicada." 
      }
    },

    //institute
    institute: {
      title: "INSTITUTO DE INVESTIGACIÓN",
      cert2010: { 
        description: "Se certifica por el INVIMA el primer Centro de Investigación en Colombia en el Departamento de Cundinamarca." 
      },
      cert2024: { 
        description: "162 IPS certificadas como Centros de Investigación en el país. Principalmente en el Departamento de Cundinamarca con 51 centros, seguido de Antioquia y Atlántico." 
      },
      cert2025: { 
        description: "Se otorga la certificación en Buenas Prácticas Clínicas a la institución NORDVITAL IPS S.A.S sede NORDVITAL 3E para realizar investigaciones con medicamentos en seres humanos." 
      }
    },

    //Professional
    professional: {
      title: "NUESTRO EQUIPO",
      positions: ["Investigador", "Subinvestigador", "Coordinadora de Laboratorio", "Bacteriologo", "Coordinadora de Estudios"]
    },

    //Research
    research: {
      title: "NUESTRAS AREAS DE INVESTIGACIÓN",
      
      laboratory: {
        subtitle: "Laboratorio Clínico",
        paragraph: "En el Laboratorio Clínico Norvital IPS cuidamos tu salud con confianza y precisión. Somos un laboratorio privado comprometido con la excelencia. Nuestro equipo de bacteriólogos y tecnología avanzada garantizan resultados confiables y oportunos. Ofrecemos una amplia variedad de análisis en Coagulación, Hematología, Microscopía, Inmunoquímica e Inmunoserología, con calidad en cada proceso. Confía en nosotros para un cuidado integral y eficiente."
      },
      pharmacy:{
        subtitle: "Farmacia",
        paragraph: "Nuestro Servicio Farmacéutico está enfocado en brindar atención integral para ensayos clínicos. Nos especializamos en la dispensación, seguimiento farmacoterapéutico y farmacovigilancia, garantizando el uso seguro y efectivo de los medicamentos. Cumplimos con las Buenas Prácticas Clínicas, priorizando la seguridad del paciente y el cumplimiento normativo."
      },
      sample: {
        subtitle: "Toma de muestras de Laboratorio Clínico",
        paragraph: "En Nordvital I.P.S., la toma de muestras es segura, cómoda y precisa. Nuestro personal calificado asegura un trato profesional y humano, siguiendo protocolos estrictos y utilizando insumos de alta calidad. Nos esforzamos para que te sientas tranquilo y bien atendido desde el primer momento. ¡Tu salud está en las mejores manos!"
      },
      lines: {
        subtitle: "Lineas de investigación",
        paragraph: "Ofertamos servicios de consulta externa general y especializada para lo cual contamos con profesionales con amplia experiencia en el sector."
      },
      services : ["Medicina General", "Fisioterapia", "Psicología", "Cardiología", "Dermatología", "Endocrinología", "Medicina Interna", "Neumología", "Ortopedia y/o Traumatología"]
    },

    //Forms
    form:{
      title: "CONTÁCTENOS",
      buttons: {
        contact: "Contacto",
        study: "Estudio Clínico"
      }
    },

    //Form estudio
    formStudy: {
      subtitle: "¿Quieres participar en un estudio clínico?",
      fields: {
        names: "Nombres",
        lastNames: "Apellidos",
        identificationType: "Tipo de identificación",
        identificationNumber: "Número de identificación",
        department: "Departamento",
        municipality: "Municipio",
        phone: "Número de teléfono",
        email: "Correo electrónico",
        eps: "EPS",
        age: "Edad",
        nationality: "Nacionalidad",
        date: "Fecha de nacimiento"
      },
      placeholders: {
        identificationType: "Tipo de identificación",
        department: "Departamento",
        municipality: "Municipio",
        eps: "EPS",
        nationality: "Nacionalidad"
      },
      button: {
        submit: "Enviar",
        submitting: "Enviando..."
      },
      validations: {
        required: "{{field}} requerido",
        requiredFemale: "{{field}} requerida",
        onlyLetters: "Solo se permiten letras",
        onlyNumbers: "Solo se permiten números",
        minChars: "Mínimo {{min}} caracteres",
        maxChars: "Máximo {{max}} caracteres",
        exactChars: "Debe tener exactamente {{count}} caracteres",
        validEmail: "Debe ser un correo electrónico válido",
        validAge: "La edad debe ser entre {{min}} y {{max}} años",
        phoneLength: "El teléfono debe tener exactamente {{count}} dígitos"
      },
      loading: {
        form: "Cargando formulario...",
        municipalities: "Cargando municipios..."
      },
      messages: {
        selectDepartmentFirst: "Primero seleccione un departamento",
        departmentsError: "Error al cargar los departamentos"
      }
    },
    
    //Form contact
    formContact: {
      subtitle: "Nos pondremos en contacto contigo",
      fields:{
        subject: "Asunto",
        descipcion: "Descripción"
      }
    },

    //footer
    footer: {
      title: "Contacto",
      address: "Dirección: AV 3A E #13A - 82 CAOBOS"
    }
  },
  
  en: {
    //header
    nav: {
      inicio: "Home",
      quienesSomos: "About Us",
      trayectoria: "History",
      instituto:"Research Institute",
      servicios: "Services",
      contactenos: "Contact Us",
    },
    social: {
      facebook: "Select to go Facebook page",
      instagram: "Select to go Instagram page",
      tiktok: "Select to go Tiktok page",
    },
    languages:{
      selectPrompt: "Select to see navigation options",
      es: "Spanish",
      en: "English"
    },

    //Landing
    landing:{
      title: "We innovate with science,",
      subtitle: "We transform with knowledge.",
      text: "Applying rigor, strategy, and technology to every challenge."
    },

    //about
    aboutUs: {
      title: "WE ARE",
      nordvital: {
        subtitle: "NORDVITAL IPS SAS",
        paragraph: "We are a Health Services Provider (IPS) that offers low- and medium-complexity care, committed to quality and innovation. We have 11 facilities strategically located in the departments of Norte de Santander, Cundinamarca, and Amazonas, which allows us to provide effective and timely care in different regions of the country."},
      commitment: { 
        subtitle: "OUR COMMITMENT",
        paragraph: "In our ongoing pursuit of innovation and our commitment to advancing healthcare, our institution has obtained certification of compliance with Good Clinical Practice in the city of Cúcuta. This significant achievement enables us to continue contributing to science through the conduct of clinical trials involving human subjects."},
      vision: { 
        subtitle: "OUR VISION",
        paragraph: "We are currently conducting clinical trials in a variety of specialties, including physical therapy, cardiology, dermatology, endocrinology, general medicine, internal medicine, pulmonology, orthopedics, psychology, and rheumatology."
      },
      text: "We do it because we believe in a purpose-driven evolution of medicine. We conduct research to anticipate healthcare challenges and provide real solutions that improve people's lives, <strong>today and tomorrow.</strong>"
    },

    //text
    text: {
      title: "OUR JOURNEY",
      subtitle: "Today we are:",
      year: "YEARS",
      paragraph: "Driving health with low- and medium-complexity services, backed by human and professional excellence. Our partnerships with high-prestige EPS strengthen our position in the sector.",
      pioneers:{ 
        accent: "Pioneers in Norte de Santander",
        content: " First to obtain INVIMA's Good Clinical Practices certification."
      },
      capacity:{ 
        accent: "Validated capacity:",
        content: "Authorized to conduct clinical research with medicinal products in humans."
      },
      infrastructure:{ 
        accent: "High-level infrastructure:",
        content: "Facilities and resources for Phase II, III, and IV studies." 
      },
      experts:{ 
        accent: "Experts in new evidence:", 
        content: "We develop observational studies, Real-World Evidence (RWE), and Applied Research." 
      }
    },

    //institute
    institute: {
      title: "RESEARCH INSTITUTE",
      cert2010: { 
        description: "The first Research Center in Colombia is certified by INVIMA in the Department of Cundinamarca."
      },
      cert2024: { 
        description: "162 healthcare providers (IPS) certified as Research Centers in the country, mainly in the Department of Cundinamarca with 51 centers, followed by Antioquia and Atlántico." 
      },
      cert2025: {
         description: "The NORDVITAL IPS S.A.S. institution, NORDVITAL 3E site, is granted Good Clinical Practices certification to conduct research involving human subjects with medications." 
      }
    },

    //Professional
    professional: {
      title: "OUR TEAM",
      positions: ["Researcher", "Research Associate", "Laboratory Coordinator", "Bacteriologist", "Research Coordinator"]
    },

    //Research
    research: {
      title: "OUR RESEARCH AREAS",
      
      laboratory: {
        subtitle: "Clinical Laboratory",
        paragraph: "At Norvital IPS Clinical Laboratory, we care for your health with confidence and precision. We are a private laboratory committed to excellence. Our team of bacteriologists and advanced technology ensure reliable and timely results. We offer a wide variety of tests in Coagulation, Hematology, Microscopy, Immunochemistry, and Immunoserology, with quality in every process. Trust us for comprehensive and efficient care."
      },
      pharmacy:{
        subtitle: "Pharmacy",
        paragraph: "Our Pharmaceutical Service focuses on providing comprehensive care for clinical trials. We specialize in dispensing, pharmacotherapeutic follow-up, and pharmacovigilance, ensuring the safe and effective use of medications. We comply with Good Clinical Practices, prioritizing patient safety and regulatory compliance."
      },
      sample: {
        subtitle: "Clinical Laboratory Sample Collection",
        paragraph: "At Nordvital I.P.S., sample collection is safe, comfortable, and accurate. Our qualified staff ensures professional and compassionate care, following strict protocols and using high-quality materials. We strive to make you feel calm and well cared for from the very first moment. Your health is in the best hands!"
      },
      lines: {
        subtitle: "Research Lines",
        paragraph: "We offer general and specialized outpatient consultation services, supported by professionals with extensive experience in the field."
      },
      services : ["General Medicine", "Physiotherapy", "Psychology", "Cardiology", "Dermatology", "Endocrinology", "Internal Medicine", "Pulmonology", "Orthopedics and/or Traumatology"]
    },

    //Forms
    form:{
      title: "CONTACT US",
      buttons: {
        contact: "Contact",
        study: "Clinical Study"
      }
    },

    //formStudy
    formStudy: {
      subtitle: "Would you like to participate in a clinical study?",
      fields: {
        names: "First Names",
        lastNames: "Last Names",
        identificationType: "Identification Type",
        identificationNumber: "Identification Number",
        department: "Department",
        municipality: "Municipality",
        phone: "Phone Number",
        email: "Email",
        eps: "Health Insurance Provider",
        age: "Age",
        nationality: "Nationality",
        date: "Date of Birth"
      },
      placeholders: {
        identificationType: "Identification Type",
        department: "Department",
        municipality: "Municipality",
        eps: "Health Insurance Provider",
        nationality: "Nationality"
      },
      button: {
        submit: "Submit",
        submitting: "Submitting..."
      },
      validations: {
        required: "{{field}} is required",
        requiredFemale: "{{field}} is required",
        onlyLetters: "Only letters are allowed",
        onlyNumbers: "Only numbers are allowed",
        minChars: "Minimum {{min}} characters",
        maxChars: "Maximum {{max}} characters",
        exactChars: "Must have exactly {{count}} characters",
        validEmail: "Must be a valid email address",
        validAge: "Age must be between {{min}} and {{max}} years",
        phoneLength: "Phone number must have exactly {{count}} digits"
      },
      loading: {
        form: "Loading form...",
        municipalities: "Loading municipalities..."
      },
      messages: {
        selectDepartmentFirst: "First select a department",
        departmentsError: "Error loading departments"
      }
    },
    
    //Form contact
    formContact: {
      subtitle: "We will get in touch with you",
      fields:{
        subject: "Subject",
        descipcion: "Descipcion"
      }
    },

    //footer
    footer: {
      title: "Contact Us",
      address: "Address: AV 3A E #13A - 82 CAOBOS"
    }
  }
};
