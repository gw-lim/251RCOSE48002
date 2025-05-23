import { usePostChat } from 'src/services/chat.service';
import Input from './components/Input';
import { useState } from 'react';
import { useGetProject } from 'src/services/project.service';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewChatPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { data: project } = useGetProject(projectId ?? '');
  const brandName = project?.brandName ?? '';

  const { mutateAsync: postChat, isPending: isPosting } = usePostChat();
  const [value, setValue] = useState('');

  const handleSubmit = async () => {
    try {
      const newChat = await postChat({
        projectId: projectId ?? '',
        initialMessage: value,
      });
      navigate(`/project/${projectId}/chat/${newChat.id}`);
    } catch (error) {
      console.error(error);
      toast.error('채팅 생성에 실패했습니다.');
    }
  };

  return (
    <>
      <section className='relative flex-1 overflow-y-auto pb-200 pt-24'>
        {!isPosting && (
          <h2 className='absolute left-1/2 top-[35%] -translate-x-1/2 bg-gradient-to-r from-primary-500 to-[#00CCCC] bg-clip-text text-24 font-500 text-transparent'>
            {brandName} 팝업스토어를 어디에 개설할까요?
          </h2>
        )}
      </section>
      <Input
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        disabled={isPosting}
      />
    </>
  );
};

export default NewChatPage;
