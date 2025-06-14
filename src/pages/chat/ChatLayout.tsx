import { Outlet, useParams } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useGetChats } from 'src/services/chat.service';
import { useMemo } from 'react';
import Header from './components/Header';
import { useGetProject } from 'src/services/project.service';

const ChatLayout = () => {
  const { projectId, chatId } = useParams();

  const { data: project } = useGetProject(projectId ?? '');

  const { data: chats } = useGetChats();
  const chatsOfProject = useMemo(
    () => chats?.filter((chat) => chat.projectId === projectId) ?? [],
    [chats, projectId],
  );
  const currentChatTitle = useMemo(
    () => chats?.find((chat) => chat.id === chatId)?.title ?? '',
    [chats, chatId],
  );

  return (
    <div className='flex h-full w-full overflow-hidden'>
      <NavBar
        projectId={projectId ?? ''}
        chats={chatsOfProject}
        currentChatId={chatId}
      />
      <main className='relative flex flex-1 flex-col'>
        <Header project={project} currentChatTitle={currentChatTitle} />
        <Outlet key={chatId} />
      </main>
    </div>
  );
};

export default ChatLayout;
