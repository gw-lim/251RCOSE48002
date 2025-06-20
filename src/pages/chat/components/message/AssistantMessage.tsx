import { useState } from 'react';
import Tabs from 'src/components/Tabs';
import TextTab from './TextTab';
import ChartTab from './ChartTab';
import { ExecutionPhase, Message } from 'src/types/chat.type';
import LoadingPhase from './LoadingPhase';

type ChatTab = 'text' | 'chart';

interface Props {
  message: Message;
  phase: ExecutionPhase | null;
  phaseMessage: string | null;
}

const AssistantMessage = ({ message, phase, phaseMessage }: Props) => {
  const [selected, setSelected] = useState<ChatTab>('text');

  const isGenerating =
    phase === 'PLANNING' ||
    phase === 'STEP_EXECUTING' ||
    phase === 'STEP_COMPLETED' ||
    phase === 'STEP_FAILED';

  return (
    <article className='mb-48 flex flex-col gap-8 border-b border-grey-200 pb-24'>
      <div className='w-[150px]'>
        <Tabs
          items={[{ label: '답변', value: 'text' }]}
          selected={selected}
          onSelect={setSelected}
          disabled={isGenerating}
        />
      </div>
      <div className='w-full py-8'>
        {!isGenerating &&
          (selected === 'text' ? (
            <TextTab text={message.content} />
          ) : (
            <ChartTab />
          ))}
        {isGenerating && (
          <LoadingPhase phase={phase} phaseMessage={phaseMessage} />
        )}
      </div>
    </article>
  );
};

export default AssistantMessage;
