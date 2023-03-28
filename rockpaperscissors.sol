pragma solidity ^0.8.0;

contract RockPaperScissors {
    enum Move {
        Rock,
        Paper,
        Scissors
    }
    uint256 public betAmount = 100000000000000000; // 0.0001 tBNB

    address payable public owner;
    mapping(address => uint256) public bets;

    event GamePlayed(address indexed player, Move indexed move, bool won);

    constructor() {
        owner = payable(msg.sender);
    }

    function deposit() public payable {
        contractBalance += msg.value;
    }

    function play(Move _move) external payable {
        require(msg.value >= betAmount, "Insufficient bet amount");
        bets[msg.sender] += msg.value;

        uint8 winnerIndex = uint8(
            uint256(
                keccak256(abi.encodePacked(block.timestamp, block.difficulty))
            ) % 3
        );
        Move computerMove = Move(winnerIndex);

        bool won = false;
        if (
            (_move == Move.Rock && computerMove == Move.Scissors) ||
            (_move == Move.Paper && computerMove == Move.Rock) ||
            (_move == Move.Scissors && computerMove == Move.Paper)
        ) {
            won = true;
            uint256 reward = bets[msg.sender] * 2;
            payable(msg.sender).transfer(reward);
            bets[msg.sender] = 0;
        } else {
            bets[msg.sender] = 0;
        }

        emit GamePlayed(msg.sender, _move, won);
    }

    function withdraw() external {
        require(msg.sender == owner, "Only the owner can withdraw");
        uint256 contractBalance = address(this).balance;
        owner.transfer(contractBalance);
    }

    function updateBetAmount(uint256 _newBetAmount) external {
        require(
            msg.sender == owner,
            "Only the owner can update the bet amount"
        );
        betAmount = _newBetAmount;
    }
}
