import Modal from 'react-modal';
import { Route, Routes } from 'react-router-dom';

import loadable from '@loadable/component';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

Modal.setAppElement('#root');

const Login = loadable(() => import('@/pages/Login'), {
  fallback: <div>로그인 로딩중</div>,
});
const Lobby = loadable(() => import('@/pages/Lobby'), {
  fallback: <div>로비입장 로딩중</div>,
});
const Waiting = loadable(() => import('@/pages/Waiting'), {
  fallback: <div>대기방 로딩중</div>,
});
const Game = loadable(() => import('@/pages/Game'), {
  fallback: <div>게임화면 로딩중</div>,
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/lobby' element={<Lobby />}></Route>
        <Route path='/waiting' element={<Waiting />}></Route>
        <Route path='/game' element={<Game />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}
