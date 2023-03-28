# Rock-Paper-Scissors

Rock Paper Scissors DApp является децентрализованным приложением на базе BNB, позволяющим пользователям играть в классическую игру "Камень, Ножницы, Бумага" с участием смарт-контракта в качестве противника. Пользователи могут делать ставки на исход игры, а также видеть историю своих предыдущих игр.

# Требования
Node.js
Truffle
Ganache
Metamask
Или Visual Studio Server( что намного проще) 

# Установка и настройка
1. Клонируйте репозиторий:

  git clone https://github.com/yourusername/rock-paper-scissors-dapp.git
cd rock-paper-scissors-dapp

2. Установите зависимости:

npm install
  
3. Запустите локальный блокчейн с помощью Ganache:

ganache-cli
  
4. Скомпилируйте и разверните смарт-контракт:

truffle compile
truffle migrate

5. Запустите локальный сервер разработки:

npm run dev


# Использование
Откройте веб-браузер и установите расширение Metamask.

Импортируйте секретный ключ одного из сгенерированных Ganache аккаунтов в Metamask.

В Metamask измените сеть на "Localhost 8545" или настроенный порт вашего Ganache.

Откройте http://localhost:3000 в вашем браузере.

Выберите свой ход, нажав на одно из изображений (Камень, Ножницы или Бумага).

Metamask запросит подтверждение транзакции. Подтвердите транзакцию.

Результат игры и история игр будут отображаться на странице.



# Лицензия
Rock Paper Scissors DApp распространяется под лицензией MIT.