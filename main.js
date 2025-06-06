///////////////////////////////////////////////////////////////////////////

// function newPromise(text, delay) {
//     const promise = new Promise((resolve) => {
//         setTimeout(() =>{
//             resolve(text);
//         }, delay)
//     })
//     return promise
// }
// const firstPromise = newPromise("smth", 2000)
// const secondPormise = newPromise("nothing", 4000)
// const thirdPromise = newPromise("not smth", 1000)
// // Promise.all([firstPromise, secondPormise])
// // .then((result) => {
// //     console.log(result);
// // })
// Promise.race([firstPromise, secondPormise, thirdPromise])
// .then((result) => {
//     console.log(result);  
// })

////////////////////////////////////////////////////////////////////////////


//Декларуємо змінні
let raceIsInSession = false; 
let coefficient = 1.25;
let moneyThatAreBeingBet = 0;
let selectedHorse = "";
let balance = 0;
let balanceText = document.querySelector(".balance__number");
const coefficientText = document.querySelector(".coefficient");
const increaseCoefficient = document.querySelector(".increase__coefficient");
const decreaseCoefficient = document.querySelector(".decrease__coefficient");
let stakeNumber = document.querySelector(".stake__number");
const horseSelectionInput = document.querySelector(".horse__selection__input");
if(localStorage.getItem("balance") != null) {
    balance = localStorage.getItem("balance")
    balanceText.textContent = balance;
} else {
    balance = 1000;
    balanceText.textContent = balance;
}
increaseCoefficient.addEventListener("click", () => {
    if(coefficient < 2 && raceIsInSession == false) {
        coefficient += 0.25;
        coefficientText.textContent = `${coefficient}X`;
    }
});
decreaseCoefficient.addEventListener("click", () => {
    if (coefficient > 1.25 && raceIsInSession == false) {
      coefficient -= 0.25;
      coefficientText.textContent = `${coefficient}X`;
    }
});

//Цю частину коду давали у завданні але крім кнопки вона нічого не робить
const refs = {
  startBtn: document.querySelector(".js-start-race"),
  winnerField: document.querySelector(".js-winner"),
  progressField: document.querySelector(".js-progress"),
  tableBody: document.querySelector(".js-results-table > tbody"),
};


// проміс
function race(horseName, delay) {
    runingAnimation(horseName, delay);
    const promise = new Promise((resolve) => {
        setInterval(() => {
            resolve(horseName);
        }, delay);
    })
    return promise;
};

// функція завдяки якої відбувається анімація конів (Анімація відбувається незалежно від результату тому якщо анімація забагається ви гру не програєте)
function runingAnimation(horseName, delay) {
    // console.log("starting: runing animation");
    const racer = document.querySelector(`.${horseName}`);
    let currentPosition = 0;
    const interval = setInterval( () => {
        // console.log(`Trying to chagne current marign of ${horseName} to ${currentPosition}`);
        const speed = 95/(delay/1000)/4
        currentPosition += speed
        if (currentPosition >= 95) {
            racer.style.marginLeft = "95%";
            clearInterval(interval);     
        } else {
            racer.style.marginLeft = `${currentPosition}%`;
        }
    }, 250);
}

// Початок гонки (Тут стоїть два іфи тому що у мене з одним не виходило, він просто не рахував умову)
refs.startBtn.addEventListener("click", () => {
    if (
      horseSelectionInput.value == "Secretariat" || horseSelectionInput.value == "Eclipse" || horseSelectionInput.value == "West" || horseSelectionInput.value == "Fox" || horseSelectionInput.value == "Seabiscuit"
    ) {
        if(stakeNumber.value <= balance && raceIsInSession == false && stakeNumber.value > 0 ) {
        raceIsInSession = true;
        moneyThatAreBeingBet = stakeNumber.value;
        balance -= moneyThatAreBeingBet;
        balanceText.textContent = balance;
        selectedHorse = horseSelectionInput.value;
        const firstHorse = race(
          "Secretariat",
          Math.floor(Math.random() * (20000 - 15000) + 15000)
        );
        const secondHorse = race(
          "Eclipse",
          Math.floor(Math.random() * (20000 - 15000) + 15000)
        );
        const thirdHorse = race(
          "West",
          Math.floor(Math.random() * (20000 - 15000) + 15000)
        );
        const fourthHorse = race(
          "Fox",
          Math.floor(Math.random() * (20000 - 15000) + 15000)
        );
        const fifthHorse = race(
          "Seabiscuit",
          Math.floor(Math.random() * (20000 - 15000) + 15000)
        );
        Promise.race([
          firstHorse,
          secondHorse,
          thirdHorse,
          fourthHorse,
          fifthHorse,
        ]).then((result) => {
          console.log(result);
          resultAlgorithm(result);
        });}
    } else {
        alert("Перевірте свою ставку або зачекайте доки гонка закінчиться!")
    }
});


//Алгоритм який відповідає за закінчення рейсу та видання винагороди
function resultAlgorithm(winningHorse) {
    if(winningHorse == selectedHorse ) {
        moneyThatAreBeingBet = moneyThatAreBeingBet * coefficient;
        balance += moneyThatAreBeingBet;
        alert(`Ви виграли ${moneyThatAreBeingBet} Hкоінів`);
    } else {
        alert("Нажаль ви не змогли виграти, але завжди можна спробувати ще раз!")
    }
    localStorage.setItem("balance", balance)
    balanceText.textContent = balance;
    raceIsInSession = false;
    moneyThatAreBeingBet = 0;
}
// PS. Я всі картинки (Коні та монету) сам робив)))))