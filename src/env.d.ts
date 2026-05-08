interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_EMAILJS_SERVICE_ID: string;
  readonly PUBLIC_EMAILJS_TEMPLATE_CONTACT_ID: string;
  readonly PUBLIC_EMAILJS_TEMPLATE_VOLUNTEER_ID: string;
  readonly PUBLIC_EMAILJS_EMAIL: string;
  readonly PUBLIC_EMAILJS_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}