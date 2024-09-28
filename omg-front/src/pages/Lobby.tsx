import { useCallback, useEffect, useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import ExitButton from '@/components/common/ExitButton';
import { useCreateWaitingRoom } from '@/hooks/useWaitingRoom';
import useUser from '@/stores/useUser';

export default function Lobby() {
  const { nickname, setNickname } = useUser();
  const [roomCode, setRoomCode] = useState<string>('');
  const navigate = useNavigate();
  const [isCopyEnabled, setIsCopyEnabled] = useState(false);

  // TODO: 임시 이름 설정
  useEffect(() => {
    const uniqueNickname = `testUser-${Date.now()}`;
    setNickname(uniqueNickname);
  }, [setNickname]);

  const createRoomMutation = useCreateWaitingRoom();

  const handleClickCreateRoom = () => {
    createRoomMutation.mutate(nickname);
  };

  useEffect(() => {
    if (createRoomMutation.isSuccess) {
      setRoomCode(createRoomMutation.data?.result || '');
    }
  }, [createRoomMutation.isSuccess, createRoomMutation.data]);

  const handleCopyToClipboard = useCallback(() => {
    if (roomCode.length === 10) {
      navigator.clipboard
        .writeText(roomCode)
        .then(() => alert('방 코드가 복사되었습니다!'))
        .catch(err => console.error('복사에 실패했습니다.: ', err));
    }
  }, [roomCode]);

  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  useEffect(() => {
    setIsCopyEnabled(roomCode.length === 10);
  }, [roomCode]);

  const handleClickEnterRoom = () => {
    navigate(`/waiting/${roomCode}`);
  };

  return (
    <div className='relative flex flex-col justify-center w-full h-screen p-10'>
      <div className='absolute right-8 bottom-9 text-omg-30'>
        <ExitButton showText={true} />
      </div>

      <div className='flex flex-col items-center justify-center w-full h-full '>
        <div className='flex flex-col gap-5'>
          <div>
            <button
              onClick={handleClickCreateRoom}
              className='w-full p-2 text-omg-40b'
              disabled={createRoomMutation.isPending}
            >
              {createRoomMutation.isPending ? '방 생성중...' : '방 생성하기'}
            </button>
            {createRoomMutation.isError && (
              <p className='text-center text-red text-omg-14'>
                {createRoomMutation.error.message}
              </p>
            )}
          </div>
          <div className='flex items-center justify-center w-full gap-5'>
            <div className='relative'>
              <input
                type='text'
                minLength={10}
                placeholder='코드 입력하기'
                value={roomCode}
                onChange={handleRoomCodeChange}
                className='w-full py-2 pl-10 pr-20 border-4 border-black rounded-40 text-omg-24'
              />
              <button
                className='absolute -translate-y-1/2 right-10 top-1/2'
                onClick={handleCopyToClipboard}
                disabled={!isCopyEnabled}
              >
                <FaCopy
                  className={`text-omg-24 ${isCopyEnabled ? 'text-black' : 'text-white3'}`}
                />
              </button>
            </div>

            <button
              className='w-1/4 text-omg-40b'
              onClick={handleClickEnterRoom}
            >
              입장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
