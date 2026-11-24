import { Plus } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-bg-elev">
      {items.map((item, i) => (
        <details key={item.question} className="group px-6 sm:px-8" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-base font-semibold tracking-tight text-fg sm:text-lg [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-fg-muted transition group-open:rotate-45 group-open:border-accent/40 group-open:text-accent-text">
              <Plus className="size-4" />
            </span>
          </summary>
          <div className="pb-6 pr-12 text-sm leading-relaxed text-fg-muted sm:text-base">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
