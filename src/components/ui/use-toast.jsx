import { useState, useEffect, useCallback } from "react"

const TOAST_LIMIT = 3 // Limit 1 çok kısıtlayıcı olabilir, 3 idealdir.
const TOAST_REMOVE_DELAY = 5000

let count = 0
function generateId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

// Global Store: Bileşenler dışında veriyi tutar
const toastStore = {
  state: { toasts: [] },
  listeners: new Set(), // Array yerine Set kullanarak performans ve güvenlik artırıldı
  
  getState: () => toastStore.state,
  
  setState: (nextState) => {
    toastStore.state = typeof nextState === 'function' 
      ? nextState(toastStore.state) 
      : { ...toastStore.state, ...nextState };
    
    toastStore.listeners.forEach(listener => listener(toastStore.state));
  },
  
  subscribe: (listener) => {
    toastStore.listeners.add(listener);
    return () => toastStore.listeners.delete(listener);
  }
}

// Bildirim tetikleyici fonksiyon
export const toast = ({ ...props }) => {
  const id = generateId()

  const update = (newProps) =>
    toastStore.setState((state) => ({
      ...state,
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, ...newProps } : t
      ),
    }))

  const dismiss = () => toastStore.setState((state) => ({
    ...state,
    toasts: state.toasts.filter((t) => t.id !== id),
  }))

  toastStore.setState((state) => ({
    ...state,
    toasts: [
      { ...props, id, dismiss, update }, // Update fonksiyonu da toast objesine eklendi
      ...state.toasts,
    ].slice(0, TOAST_LIMIT),
  }))

  return { id, dismiss, update }
}

// Hook: Bileşenlerin store'a bağlanmasını sağlar
export function useToast() {
  const [state, setState] = useState(toastStore.getState())
  
  useEffect(() => {
    return toastStore.subscribe(setState) // Tek satırda güvenli abonelik
  }, [])
  
  // Otomatik silme mekanizması (Clean-up odaklı)
  useEffect(() => {
    const timeouts = state.toasts.map((t) => {
      if (t.duration === Infinity) return null;
      
      return setTimeout(() => {
        t.dismiss();
      }, t.duration || TOAST_REMOVE_DELAY);
    });

    return () => {
      timeouts.forEach((timeout) => timeout && clearTimeout(timeout));
    };
  }, [state.toasts]);

  return {
    toast,
    toasts: state.toasts,
    // Yardımcı fonksiyonlar: Pratik kullanım için
    dismissAll: () => toastStore.setState({ toasts: [] })
  }
}