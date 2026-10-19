import React, { useEffect, useRef } from 'react';
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

  if (currentIndex === null || !items[currentIndex]) {
    return null;
  }

  const activeItem = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/95 p-4 sm:p-6 md:p-10 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-zinc-800 bg-obsidian-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-3 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold-400">
              Trabalho {currentIndex + 1} de {items.length}
            </p>
            <h3 id="lightbox-title" className="font-serif text-lg sm:text-xl text-zinc-100">
              {activeItem.titulo}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar visualização ampliada (Esc)"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-obsidian-850 text-zinc-300 transition-colors hover:border-gold-400/50 hover:text-zinc-100"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Image container */}
        <div className="relative flex min-h-[300px] max-h-[72vh] items-center justify-center bg-obsidian-950 p-2 sm:p-4">
          <img
            src={activeItem.src}
            alt={activeItem.alt}
            className="lightbox-photo"
          />

          <button
            type="button"
            onClick={onPrev}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700/80 bg-obsidian-900/90 text-zinc-100 transition-colors hover:border-gold-400 hover:text-gold-300"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700/80 bg-obsidian-900/90 text-zinc-100 transition-colors hover:border-gold-400 hover:text-gold-300"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Caption footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-zinc-800/80 bg-obsidian-900 px-4 py-3.5 sm:px-6">
          <p className="text-sm text-zinc-300">{activeItem.detalheTecnico}</p>
          <p className="text-xs text-zinc-400">
            Use as setas do teclado para navegar ou Esc para fechar
          </p>
        </div>
      </div>
    </div>
  );
};
