import Flag from 'assets/UI/flag.svg?react';
import Persona from 'assets/UI/persona.svg?react';
import Terminal from 'assets/UI/terminal.svg?react';
import Tone from 'assets/UI/tone.svg?react';

import InputContextCard from './InputContextCard';

const inputContexts = [
  {
    title: 'Goal',
    Icon: Flag
  },
  {
    title: 'Tone',
    Icon: Tone
  },
  {
    title: 'Persona',
    Icon: Persona
  },
  {
    title: 'Select Style',
    Icon: Terminal
  }
];

export default function InputContextGrid() {
  return (
    <article className="grid grid-cols-2 gap-1 p-3">
      {inputContexts.map(({ title, Icon }) => (
        <InputContextCard key={title} Icon={Icon}>
          {title}
        </InputContextCard>
      ))}
    </article>
  );
}
