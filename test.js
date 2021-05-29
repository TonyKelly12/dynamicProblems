const numQue = [];
let solutions = 0;
let memo = { 2: 2, 1: 1 };

function takeSteps(n) {
  if (n > 0) {
    const minusOne = n - 1;
    const minusTwo = n - 2;
    return [minusOne, minusTwo];
  } else {
    return [];
  }
}

function setQue(optionsArray) {
  if (optionsArray[0] > 0) numQue.push(optionsArray[0]);
  if (optionsArray[1] > 0) numQue.push(optionsArray[1]);
}

function atTop(optionsArray) {
  if (optionsArray[0] === 0) solutions++;
  if (optionsArray[1] === 0) solutions = solutions + 2;
}

function tookOneStep(num, originalNumber) {
  const oneStepOptions = takeSteps(num);
  const shouldAddToMemo = [];
  oneStepOptions.forEach((n) => {
    const isInMemo = inMemo(n);
    if (isInMemo) {
        shouldAddToMemo.push(n)
    } else {
        if(n > 0) numQue.push(n);
    };

    // Push to que if not in memo ???
  });
  if (shouldAddToMemo.length === 2) addToMemo(oneStepOptions, originalNumber);
}

function tookTwoSteps(num, originalNumber) {
  const twoStepsOptions = takeSteps(num);
  const shouldAddSumToMemo = [];
  twoStepsOptions.forEach((n) => {
    const isInMemo = inMemo(n);
    if (isInMemo) {
        shouldAddSumToMemo.push(n)
      addToSolutions(memo[n]);
    } else {
       if(n > 0) numQue.push(n);
    };

    // Push to que if not in memo ???
  });
  if (shouldAddSumToMemo.length === 2) addToMemo(twoStepsOptions, originalNumber);
}

function inMemo(number) {
  if (memo[number]) {
    solutions = solutions + memo[number];
    return;
  } else {
    return number;
  }
}

function addToMemo(stepsArray, originalNumber) {
  const oneStepMemo = stepsArray[0];
  const twoStepsMemo = stepsArray[0];
  memo[originalNumber] = memo[oneStepMemo] + memo[twoStepsMemo];
  addToSolutions(memo[originalNumber]);
}

function addToSolutions(number) {
  solutions = solutions + number;
}

function climbStairs(n) {
  if (n > 0) {
    const optionsArray = takeSteps(n);
    let notInMemoArray = [];
    optionsArray.forEach(num =>{
       const notInMemNum = inMemo(num)
       if(notInMemNum && notInMemNum > 0){
         notInMemoArray.push(notInMemNum);
       }
    });
    console.log('not in memo', notInMemoArray); 
    setQue(notInMemoArray);
    atTop(notInMemoArray);
    tookOneStep(notInMemoArray[0], n);
    if(notInMemoArray.length === 2){
      tookTwoSteps(notInMemoArray[1], n);
    }
    
    if (numQue.length > 0) {
      console.log(memo);
      let newNum = numQue.pop();
      console.log("numQue", numQue);
      climbStairs(newNum, memo, numQue, solutions);
    }

    return solutions;
  }
  return solutions;
}

// console.log(climbStairs(1))
// console.log(climbStairs(2))
// console.log(climbStairs(4))
// console.log(climbStairs(5))
console.log(climbStairs(5));
