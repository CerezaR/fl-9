class UserAccount {
  constructor(name) {
    this.name = name;
    this.cards = [];
  }
  
  getName() {
    return this.name;
  }
  
  addCard() {
    const amountOfCards = 3;
    if (this.cards.length < amountOfCards) {
      this.cards.push(userCard(this.cards.length + 1));
      } else {
      console.log('You have reached max amount of cards');
    }
  }
  
  getCardByKey(key) {
    return this.cards[key - 1];
  }
}

function userCard(index) {
  let balance = 100;
  let transactionLimit = 100;
  let historyLog = [];
  let key = index;
  
  return {
    getCardOptions() {
      return { balance, transactionLimit, historyLog, key} ;
    },
    
    putCredits(credits) {
      balance += credits;
      historyLog.push({operationType: 'Received credits', credits: credits, operationTime: getCurrentDate()});
    },
    
    takeCredits(credits) {
      if (credits > balance) {
        console.log('Remaining balance is lower than credits you want to take.');
      } else if (credits > transactionLimit) {
        console.log('Transaction limit is lower than credits you want to take.');
      } else {
        balance -= credits;
        historyLog.push({operationType: 'Withdrawal of credits', credits: credits, operationTime: getCurrentDate()});
      }
    },
    
    setTransactionLimit(credits) {
      transactionLimit = credits;
      historyLog.push({operationType: 'Transaction limit change', credits: credits, operationTime: getCurrentDate()});
    },
    
    transferCredits(credits, card) {
      const tax = 0.005;
      if (credits > balance) {
        console.log('Remaining balance is lower than credits you want to take.');
      } else if (credits > transactionLimit) {
        console.log('Transaction limit is lower than credits you want to take.');
      } else {
        this.takeCredits(credits + credits * tax);
        card.putCredits(credits);
      }
    }
  };
}

function getCurrentDate() {
  const date = new Date();
  const sliceNum = -2;
  return ('0' + date.getDate()).slice(sliceNum) + 
  '/' + ('0' + (date.getMonth() + 1)).slice(sliceNum) + 
  '/' + date.getFullYear() + 
  ', ' + ('0' + date.getHours()).slice(sliceNum) + 
  ':' + ('0' + date.getMinutes()).slice(sliceNum) + 
  ':' + ('0' + date.getSeconds()).slice(sliceNum);
}