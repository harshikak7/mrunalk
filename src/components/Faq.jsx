import { useState } from 'react'
import { about } from '../data/about'
import FaqItem from './FaqItem'

// Accordion: one item open at a time; clicking the open item closes it.
export default function Faq({ className = '' }) {
  const { title, items } = about.faq
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section aria-labelledby="faq" className={`border-t border-line pt-[22px] ${className}`}>
      <div className="mx-auto flex w-full flex-col gap-[19px] px-[18px] md:max-w-[603px] md:px-0">
        <h2 id="faq" className="border-b border-line pb-[22px] font-serif text-2xl leading-[normal]">
          {title}
        </h2>
        <ul className="flex flex-col gap-[19px]">
          {items.map((item, i) => (
            <FaqItem
              key={item.question}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
