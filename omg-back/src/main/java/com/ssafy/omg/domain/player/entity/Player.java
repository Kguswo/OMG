package com.ssafy.omg.domain.player.entity;

/**
 * 플레이어 정보
 * 		- 대출 유무, 대출금,이자율, 현금, 금괴개수, 보유 주식, 플레이어 좌표(x, y, z),
 * 		- 플레이어 행위(무슨 행동을 하는지), 플레이어 행위 종료 상태, 플레이어 접속 상태, 한 행위 시간
 */

public class Player {

    private int[] position;			// 플레이어 좌표(x, y, z)

    private int hasLoan;			// 대출 유무
    private int loan;  				// 대출금
    private int interestRate;		// 이자율
    private int cash;				// 현금
    private int gold;				// 금괴 개수
    private int[] stock;			// 보유 주식 개수

    private PlayerAction action; 	// 플레이어 행위 (주식 매수, 주식 매도, 금괴 매입, 대출, 상환)
    private PlayerStatus state;		// 플레이어 행위 상태 (시작전, 진행중, 완료)
    private int time; 				// 플레이어의 한 행위 남은 시간

    private int isConnected;		// 플레이어 접속 상태 (0: 끊김, 1: 연결됨)

}