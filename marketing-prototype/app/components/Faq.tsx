'use client';

import { useState } from 'react';
import { Icon } from './Icon';

const faqs = [
  ['Is Frigo Flow a laboratory?', 'No. Frigo Flow is a diagnostic workflow technology platform. Laboratory testing and sample collection are provided by participating third-party partners.'],
  ['Can our clinic use its own branding?', 'Yes. Clinic branding is part of the Frigo Flow white-label experience. Our team will confirm the available branding options with you during onboarding.'],
  ['Can patients track their tests?', 'The patient experience is designed to display available status updates for their tests, subject to partner integrations.'],
  ['Can patients view their lab results?', 'The patient portal supports authorized access to results, in line with your clinic’s results-release policies.'],
  ['Does Frigo Flow make treatment decisions?', 'No. Clinical interpretation and care decisions always remain with your authorized healthcare professionals.'],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="faq__list">
      {faqs.map(([question, answer], i) => {
        const isOpen = open === i;
        return (
          <div key={question} className={`faq__item${isOpen ? ' is-open' : ''}`}>
            <h3>
              <button type="button" id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                {question}
                <Icon name="chevronDown" />
              </button>
            </h3>
            <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__answer" inert={!isOpen}>
              <div><p>{answer}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
