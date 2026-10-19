import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ItemGaleria } from '../config/courseConfig';

interface GalleryLightboxProps {
  items: ItemGaleria[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (currentIndex === null) return;

    // Foca no botão fechar ao abrir o modal para acessibilidade por teclado
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex !== null && !items[currentIndex]) return null;
  const activeItem = currentIndex === null ? null : items[currentIndex];

  return (
    <AnimatePresence>
      {currentIndex !== null && activeItem && (
        <motion.div
          key="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/95 p-4 backdrop-blur-sm sm:p-6 md:p-10"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
        >
          <motion.div
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-zinc-700/70 bg-obsidian-900 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-zinc-700/70 px-4 py-3 sm:px-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold-300">Trabalho {currentIndex + 1} de {items.length}</p>
                <h3 id="lightbox-title" className="font-serif text-lg text-zinc-100 sm:text-xl">{activeItem.titulo}</h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Fechar visualização ampliada (Esc)"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-obsidian-850 text-zinc-200 transition-colors hover:border-gold-300 hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex min-h-[300px] max-h-[72vh] items-center justify-center bg-obsidian-950 p-2 sm:p-4">
              <motion.img
                key={activeItem.id}
                src={activeItem.src}
                alt={activeItem.alt}
                className="lightbox-photo"
                width={activeItem.width}
                height={activeItem.height}
                decoding="async"
                drag={reduceMotion ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -90 || info.velocity.x < -480) onNext();
                  else if (info.offset.x > 90 || info.velocity.x > 480) onPrev();
                }}
                initial={reduceMotion ? false : { opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
              />

              <button type="button" onClick={onPrev} aria-label="Foto anterior" className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700/80 bg-obsidian-900/90 text-zinc-100 transition-colors hover:border-gold-300 hover:text-gold-300">
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={onNext} aria-label="Próxima foto" className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700/80 bg-obsidian-900/90 text-zinc-100 transition-colors hover:border-gold-300 hover:text-gold-300">
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col gap-2 border-t border-zinc-700/70 bg-obsidian-900 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-sm text-zinc-200">{activeItem.detalheTecnico}</p>
              <p className="text-xs text-zinc-400">Use as setas do teclado ou deslize para navegar</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
