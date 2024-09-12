package com.ssafy.omg.domain.room.service;

import com.ssafy.omg.config.baseresponse.BaseException;
import com.ssafy.omg.domain.room.dto.CommonRoomRequest;
import com.ssafy.omg.domain.room.dto.CommonRoomResponse;
import com.ssafy.omg.domain.room.dto.RoomInfo;

public interface RoomService {

    // 고유 대기 방 ID 생성
    String createRoomId() throws BaseException;

    // 대기 방 생성
    String createRoom(String userNickname) throws BaseException;

    // 대기 방 입장
    CommonRoomResponse enterRoom(CommonRoomRequest request) throws BaseException;

    // 대기 방 나가기
    CommonRoomResponse leaveRoom(CommonRoomRequest request) throws BaseException;

    // 시작 버튼 활성화 여부
    boolean isStartButtonActive(CommonRoomRequest request) throws BaseException;

    // 시작 버튼 클릭
    CommonRoomResponse clickStartButton(CommonRoomRequest request) throws BaseException;

    // 사용자 렌더 완료
    CommonRoomResponse handleRenderedComplete(CommonRoomRequest request) throws BaseException;

    // 모든 사용자 렌더 완료 여부
    CommonRoomResponse checkAllRenderedCompleted(CommonRoomRequest request) throws BaseException;

    // 방 정보 반환
    RoomInfo getRoomInfo(String roomId) throws BaseException;
}