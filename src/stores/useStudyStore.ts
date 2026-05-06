import { create } from 'zustand';
import { api } from '@/lib/api';
import type { FormValuesStudy } from '@/schemas/formStudySchema';

type StudyApiData = Omit<FormValuesStudy, 'terms'>;

interface StudyState {
  data: FormValuesStudy | null;
  loading: boolean;
  error: string | null;
  submitStudy: (data: StudyApiData, onSuccess?: () => void) => Promise<void>;
  reset: () => void;
}

export const useStudyStore = create<StudyState>((set) => ({
  data: null,
  loading: false,
  error: null,

  submitStudy: async (data, onSuccess) => {
    set({ loading: true, error: null });
    try {
      const response = await api.study(data);
      if (response.status === 200 || response.status === 201) {
        set({ data });
        onSuccess?.();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error submitting study form';
      set({ error: message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set({ data: null, error: null, loading: false }),
}));