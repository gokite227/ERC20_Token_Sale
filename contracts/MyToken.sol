// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    //initialSupply가 발행수량 매개변수
    constructor(uint256 initialSupply) ERC20("StarDucks Capu-Token", "SCT") public {
        //mint 토큰을 발행하면 발행 수량을 전해줌(발행수량은 deploy_contracts.js에)
        //msg.sender는 계약을 처음 생성한사람 즉, 트러플에 연결된 첫번째 노드
        _mint(msg.sender, initialSupply);
    _setupDecimals(0);
    }
}
