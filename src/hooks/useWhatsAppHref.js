import { useMemo } from 'react';

export function useWhatsAppHref(numberRaw, messageRaw) {
  return useMemo(() => {
    const whatsappNumber = numberRaw.replace(/\D/g, '');

    if (!/^\d{8,15}$/.test(whatsappNumber)) {
      return null;
    }

    const whatsappMessage = encodeURIComponent(messageRaw);
    return `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  }, [numberRaw, messageRaw]);
}
