// Замените этими значениями, полученными из вашей среды разработки
const contractAddress = "0x3222017A9b617299b8eA1EE19648520dF6F023B7";
const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: true,
        internalType: "enum RockPaperScissors.Move",
        name: "move",
        type: "uint8",
      },
      { indexed: false, internalType: "bool", name: "won", type: "bool" },
      {
        indexed: false,
        internalType: "uint8",
        name: "botChoice",
        type: "uint8",
      },
    ],
    name: "GamePlayed",
    type: "event",
  },
  {
    inputs: [],
    name: "betAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "bets",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum RockPaperScissors.Move",
        name: "_move",
        type: "uint8",
      },
    ],
    name: "play",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newBetAmount", type: "uint256" },
    ],
    name: "updateBetAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]; // ABI вашего контракта

let web3;
let contract;
let account;

window.addEventListener("load", async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      account = (await web3.eth.getAccounts())[0];
      contract = new web3.eth.Contract(abi, contractAddress);
      getGameHistory();
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
});

async function getGameHistory() {
    const pastEvents = await contract.getPastEvents('GamePlayed', {
        filter: { player: account },
        fromBlock: 0,
        toBlock: 'latest'
    });

    const gameHistoryList = document.getElementById('gameHistoryList');
    gameHistoryList.innerHTML = '';

    for (const event of pastEvents) {
        const { move, won, botChoice } = event.returnValues;
        const block = await web3.eth.getBlock(event.blockNumber);
        const timestamp = block.timestamp;
        displayGameHistory(move, won, botChoice, timestamp);
    }
}

async function makeMove(move) {
  const betAmount = await contract.methods.betAmount().call();
  try {
    await contract.methods.play(move).send({ from: account, value: betAmount });
    getGameHistory();
  } catch (error) {
    console.error("Error while making a move:", error);
  }
}


function displayGameHistory(move, won, botChoice, timestamp) {
    const gameHistoryList = document.getElementById('gameHistoryList');
    const listItem = document.createElement('li');
    const moves = ['Rock', 'Paper', 'Scissors'];
    const date = new Date(timestamp * 1000).toLocaleString();

    listItem.textContent = `You: ${moves[move]}, Computer: ${moves[botChoice]}, Result: ${won ? 'Won' : 'Lost'} (${date})`;
    listItem.classList.add(won ? 'won' : 'lost');
    gameHistoryList.appendChild(listItem);
}