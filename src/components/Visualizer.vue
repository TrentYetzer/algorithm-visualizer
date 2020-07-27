<template>
  <div>
    <div class="menu-container flex">
      <button class="sort-menu" v-on:click="fillArray()">Reset Array</button>
      <div class="dropdown">
        <button class="sort-menu">Algorithms</button>
        <div class="dropdown-content">
          <div v-on:click="bubble()">Bubble Sort</div>
          <div v-on:click="selection()">Selection Sort</div>
          <div v-on:click="gnome()">Gnome Sort</div>
          <div v-on:click="merge()">Merge Sort</div>
          <div v-on:click="bogo()">Cocktail Bogo Sort</div>
          <div v-on:click="insertion()">Insertion Sort</div>
          <div v-on:click="tim()">Tim Sort</div>
          <div v-on:click="quick()">Quick Sort</div>
        </div>
      </div>
      <div class="slider-container flex column">
        <div class="flex row">
          <p>Less Bars</p>
          <input type="range" min="1" max="80" v-model="scaleFactor" class="slider" />
          <p>More Bars</p>
        </div>
        <div class="flex row">
          <p>1ms Delay</p>
          <input type="range" min="1" max="1000" v-model="visualizeSpeed" class="slider" />
          <p>1s Delay</p>
        </div>
      </div>
    </div>
    <div class="bars-section">
      <h3 id="current-sort" class="sort-header"></h3>
      <div class="bars-container">
        <div
          v-for="(item, index) in array"
          :key="index"
          class="bar"
          v-bind:style="{
            height: item + 'px',
            width: 160 / scaleFactor + 'px'
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import * as Algorithm from "../algorithms";

@Component
export default class Visualizer extends Vue {
  currentSort = "";
  array: number[] = [];
  numOfBars = 5;
  scaleFactor = 1;
  visualizeSpeed = 5;
  PRIMARY = "#A2E8DD";
  COMPARE = "#32DE8A";
  SWAP = "#FC7753";
  FINISH = "#779CAB";

  mounted() {
    this.fillArray();
  }

  @Watch("scaleFactor")
  onPropertyChanged() {
    this.fillArray();
  }

  fillArray(): void {
    this.resetAnimations();
    const newArray: number[] = [];
    for (let i = 0; i < this.numOfBars * this.scaleFactor; i++) {
      newArray.push(this.randomInt(1, 700));
    }
    this.array = newArray;
  }

  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  bubble(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("current-sort")!.innerText = "Bubble Sort";
    this.genericAnimation(Algorithm.bubbleSort(this.array));
  }

  selection(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("current-sort")!.innerText = "Selection Sort";
    this.genericAnimation(Algorithm.selectionSort(this.array));
  }

  gnome(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("current-sort")!.innerText = "Gnome Sort";
    this.genericAnimation(Algorithm.gnomeSort(this.array));
  }

  merge(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("current-sort")!.innerText = "Merge Sort";
    this.genericAnimation(Algorithm.mergeSort(this.array));
  }

  bogo(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("current-sort")!.innerText = "Cocktail Bogo Sort";
    this.genericAnimation(Algorithm.cocktailBogoSort(this.array));
  }

  insertion(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("current-sort")!.innerText = "Inseertion Sort";
    this.genericAnimation(Algorithm.insertionSort(this.array));
  }

  tim(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("current-sort")!.innerText = "Tim Sort";
    this.genericAnimation(Algorithm.timSort(this.array));
  }

  quick(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("current-sort")!.innerText = "Quick Sort";
    this.genericAnimation(Algorithm.quickSort(this.array));
  }

  resetAnimations() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("current-sort")!.innerText = "";
    const bars = document.getElementsByClassName("bar");
    for (const bar of bars) {
      (bar as HTMLElement).style.backgroundColor = this.PRIMARY;
    }
  }

  finishAnimation() {
    const bars = document.getElementsByClassName("bar");
    for (const bar of bars) {
      (bar as HTMLElement).style.backgroundColor = this.FINISH;
    }
    this.$forceUpdate();
  }

  genericAnimation(animations: (string | number)[][]): void {
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName("bar");
      const [barOne, barOneHeight, barTwo, barTwoHeight, step] = animations[i];
      const barOneStyle = (bars[barOne as number] as HTMLElement).style;
      const barTwoStyle = (bars[barTwo as number] as HTMLElement).style;
      if (step === "compare") {
        setTimeout(() => {
          barOneStyle.backgroundColor = this.COMPARE;
          barTwoStyle.backgroundColor = this.COMPARE;
        }, i * this.visualizeSpeed);
      } else if (step === "return") {
        setTimeout(() => {
          barOneStyle.backgroundColor = this.PRIMARY;
          barTwoStyle.backgroundColor = this.PRIMARY;
        }, i * this.visualizeSpeed);
      } else if (step === "overwrite") {
        setTimeout(() => {
          barOneStyle.backgroundColor = this.SWAP;
          barTwoStyle.backgroundColor = this.SWAP;
          barOneStyle.height = barOneHeight + "px";
        }, i * this.visualizeSpeed);
      } else if (step === "finished") {
        setTimeout(() => {
          this.finishAnimation();
        }, i * this.visualizeSpeed);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = this.SWAP;
          barTwoStyle.backgroundColor = this.SWAP;
          barOneStyle.height = barOneHeight + "px";
          barTwoStyle.height = barTwoHeight + "px";
        }, i * this.visualizeSpeed);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bars-section {
  position: relative;
  margin: 1rem;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.sort-header {
  margin-top: 0;
}

.bars-container {
  position: absolute;
  top: 3rem;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.bar {
  background-color: #a2e8dd;
  width: 2px;
  margin: 1px;
}

.menu-container {
  padding: 1rem;
  width: 100%;
  background-color: #4c5b5c;
  margin: 0;
}

.sort-menu {
  background-color: #a2e8dd;
  padding: 0.5rem;
  color: black;
  font-size: 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 10rem;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.row {
  flex-direction: row;
}

.column {
  flex-direction: column;
}

.dropdown {
  margin: 0.5rem 1rem;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  border-radius: 4px;
  margin-top: -4px;
  width: 10rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  font-size: 1rem;
  color: black;
  padding: 0.5rem;
  text-decoration: none;
}

.dropdown-content div:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown hover .sort-menu {
  filter: brightness(0.8);
}

.slider-container p {
  color: white;
  font-size: 1rem;
  text-align: center;
}

.slider {
  -webkit-appearance: none;
  width: 50vw;
  height: 1rem;
  border-radius: 10px;
  background: #a2e8dd;
  outline: none;
  filter: opacity(0.6);
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  filter: opacity(1);
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  background: #fc7753;
  cursor: pointer;
}

@media screen and (max-width: 1300px) {
  .menu-container {
    flex-direction: column;
  }
}
</style>
