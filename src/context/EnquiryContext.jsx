import { createContext, useCallback, useContext, useState } from 'react';
import EnquiryModal from '../components/EnquiryModal';

const EnquiryContext = createContext(null);

// Provides a single, app-wide enquiry modal. Any CTA can call openEnquiry()
// (optionally with a product name to pre-select in the dropdown) instead of
// each section owning its own modal instance.
export function EnquiryProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [prefillProduct, setPrefillProduct] = useState('');

  const openEnquiry = useCallback((product = '') => {
    setPrefillProduct(typeof product === 'string' ? product : '');
    setOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => setOpen(false), []);

  return (
    <EnquiryContext.Provider value={{ openEnquiry, closeEnquiry }}>
      {children}
      {open && <EnquiryModal prefillProduct={prefillProduct} onClose={closeEnquiry} />}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used within an EnquiryProvider');
  return ctx;
}
