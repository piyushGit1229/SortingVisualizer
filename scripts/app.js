"use strict";
const start = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) {
    speedValue = 1;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  // reset global comparison counter
  window.comparisonCount = 0;

  let algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 4) await algorithm.MergeSort();
  if (algoValue === 5) await algorithm.QuickSort();
  if (algoValue === 6) await algorithm.CountingSort();
  if (algoValue === 7) await algorithm.RadixSort();
  if (algoValue === 8) await algorithm.BucketSort();

  // update complexity display
  const compEle = document.getElementById('complexity');
  const statsCard = document.querySelector('.stats-card');
  if (!compEle) {
    const compEle = document.createElement('div');
    compEle.id = 'complexity';
    document.body.appendChild(compEle);
  }
  const complexities = {
    1: 'Bubble Sort: O(n^2)',
    2: 'Selection Sort: O(n^2)',
    3: 'Insertion Sort: O(n^2)',
    4: 'Merge Sort: O(n log n)',
    5: 'Quick Sort: O(n log n) on average',
    6: 'Counting Sort: O(n + k)',
    7: 'Radix Sort: O(d*(n + k))',
    8: 'Bucket Sort: O(n + k)'
  };
  compEle.textContent = complexities[algoValue] || '';
  if(statsCard) statsCard.classList.remove('hidden');

  // update comparison count
  const compCntEle = document.getElementById('comparisons');
  if (compCntEle) {
    await new Promise(resolve => setTimeout(resolve, speedValue));
    compCntEle.textContent = `Comparisons: ${window.comparisonCount}`;
  }
};

const RenderScreen = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  await RenderList();
  // hide stats until next sort
  const stats = document.querySelector('.stats-card');
  if(stats) stats.classList.add('hidden');
};

const RenderList = async () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");
  console.log(arrayNode);
  console.log(list);
  list.reverse();
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  }
};

const RenderArray = async (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderScreen);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
window.onload = RenderScreen;
