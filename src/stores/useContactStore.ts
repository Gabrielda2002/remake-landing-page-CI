import { create } from 'zustand';
import { api } from '@/lib/api';
import type { FormValuesContact } from '@/schemas/formContactSchema';
import emailJs from '@emailjs/browser';

interface ContactState {
  data: FormValuesContact | null;
  loading: boolean;
  error: string | null;
  submitContact: (data: FormValuesContact, onSuccess?: () => void) => Promise<void>;
  reset: () => void;
}

export const useContactStore = create<ContactState>((set) => ({
  data: null,
  loading: false,
  error: null,

  submitContact: async (data, onSuccess) => {
    set({ loading: true, error: null });
    try {
      const response = await api.contact(data);
      if (response.status === 200 || response.status === 201) {
        set({ data });
        onSuccess?.();

        await emailJs.send(
          import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
          import.meta.env.PUBLIC_EMAILJS_TEMPLATE_CONTACT_ID,
          { t_email: import.meta.env.PUBLIC_EMAILJS_EMAIL,...data },
          import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
        )

      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error submitting contact form';
      set({ error: message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ data: null, error: null, loading: false }),
}));