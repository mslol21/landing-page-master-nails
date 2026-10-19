import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { ItemFaq } from '../config/courseConfig';

interface FaqAccordionProps {
  items: ItemFaq[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="divide-y divide-zinc-800/90 rounded-xl border border-zinc-800/90 bg-obsidian-900">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <div key={item.id} className="transition-colors">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 text-left text-base sm:text-lg font-medium text-zinc-100 hover:text-gold-300 transition-colors"
              >
                <span>{item.pergunta}</span>
                <span
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-200 ${
                    isOpen
                      ? 'rotate-180 border-gold-400/60 bg-gold-400/10 text-gold-300'
                      : 'border-zinc-800 bg-obsidian-850 text-zinc-400'
                  }`}
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base leading-relaxed text-zinc-300"
            >
              <p>{item.resposta}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
