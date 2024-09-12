import { useCallback, useEffect, useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { handleApiError } from '@/apis/errorHandler';
import { createWaitingRooms, enterWaitingRoom } from '@/apis/room/roomAPI';
import ExitButton from '@/components/ExitButton';
import { AxiosError } from 'axios';

export default function Lobby() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState<string>('');
  const [isCopyEnabled, setIsCopyEnabled] = useState(false);

  const handleClickCreateRoom = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: test로 넣어놓은 것 로그인 연동하면 바꿔야 함
      const response = await createWaitingRooms('test17');
      setRoomCode(response);
    } catch (err) {
      const handledError = handleApiError(err as AxiosError);
      setError(handledError.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = useCallback(() => {
    if (roomCode.length === 10) {
      navigator.clipboard
        .writeText(roomCode)
        .then(() => alert('방 코드가 복사되었습니다!'))
        .catch(err => console.error('복사에 실패했습니다.: ', err));
    }
  }, [roomCode]);

  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRoomCode = e.target.value;
    setRoomCode(newRoomCode);
  };

  useEffect(() => {
    setIsCopyEnabled(roomCode.length === 10);
  }, [roomCode]);

  const handleClickEnterRoom = async () => {
    // TODO: 에러처리 필요
    try {
      const response = await enterWaitingRoom(roomCode, 'test17');
      if (response.success) {
        console.log(`입력된 방코드: ${response.roomId}`);
        navigate('/waiting');
      } else {
        console.warn('대기방 입장에 실패했습니다.');
      }
    } catch (err) {
      const handledError = handleApiError(err as AxiosError);
      setError(handledError.message);
      console.error(err);
    }
  };
  return (
    <div className='relative flex flex-col items-center justify-center w-full h-screen p-10 bg-lime-100'>
      <div className='absolute right-1 bottom-1'>
        <ExitButton showText={true} />
      </div>

      <div className='flex flex-col justify-center w-full h-full gap-10'>
        <h2 className='text-center text-omg-lg font-omg-body'>대기방</h2>
        <div className='flex flex-col justify-center gap-5'>
          <div className='h-20'>
            <button
              onClick={handleClickCreateRoom}
              className='w-full p-2 rounded bg-emerald-200'
              disabled={loading}
            >
              {loading ? '생성 중...' : '방 생성하기'}
            </button>
            {error && <p className='text-red-500'>{error}</p>}
          </div>
          <div className='relative flex w-1/2 gap-3 mx-auto'>
            <input
              type='text'
              minLength={10}
              placeholder='코드 입력하기'
              value={roomCode}
              onChange={handleRoomCodeChange}
              className='flex-1 px-2 py-1'
            />
            <button
              className='absolute -translate-y-1/2 right-14 top-1/2'
              onClick={handleCopyToClipboard}
              disabled={!isCopyEnabled}
            >
              <FaCopy fill={isCopyEnabled ? '#444' : '#aaa'} />
            </button>
            <button onClick={handleClickEnterRoom}>이동</button>
          </div>
        </div>
      </div>
    </div>
  );
}