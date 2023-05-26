<template>
  <div>
    <canvas ref="graphCanvas" :width="canvasWidth" :height="canvasHeight"></canvas><br/>
    <template v-if="configPannel">
      <div id="close-config">
        <svg @click="closeConfig" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </div>
      <div class="checkboxs">
        <span>
          <input @change="toggleValue('dots')" type="checkbox" id="dots" :checked="dots">
          <label for="dots">Blue dots</label>
        </span>
        <span>
          <input @change="toggleValue('lines')" type="checkbox" id="lines" :checked="lines">
          <label for="lines">Red lines</label>
        </span>
        <span>
          <input @change="toggleValue('indexLines')" type="checkbox" id="index-lines" :checked="indexLines">
          <label for="index-lines">Index lines</label>
        </span>
      </div>
      <p>Group by 
      <input name="stepTime" type="number" v-model="stepTime" @change="updateStepTime()"> seconds.
      </p>

    </template>
    <template v-else>
      <div id="open-config" >
        <svg @click="openConfig" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" /><path stroke-linecap="round" stroke-linejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" /></svg>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'GraphComponent',
  props: {
    graphData: Array
  },
  data() {
    return {
      graphId: parseInt(this.$route.params.id),
      configPannel: false,
      canvasWidth: this.calculateGraphWidth(),
      canvasHeight: this.calculateGraphHeight(),
      stepTime: this.getStepTime(),
      rawData: [], // Added rawData property
      data: [],
    };
  },
  created() {
    this.dots = this.getCheckboxValues('dots');
    this.lines = this.getCheckboxValues('lines');
    this.indexLines = this.getCheckboxValues('indexLines');
  },
  mounted() {
    this.rawData = this.graphData.map(obj => ({
      ...obj,
      x_value: parseInt(obj.x_value),
      y_value: parseInt(obj.y_value)
    })); // Convert the array from string to int
    this.drawAll();
    
  },
  methods: {

    ///////////////////////////CONFIG PANNEL///////////////////

    openConfig() {
      this.configPannel = true;
    },

    closeConfig() {
      this.configPannel = false;
    },

    toggleValue(property) { // Save the value of each checkbox in the localstorage
      if (this[property]) {
        this[property] = false;
        localStorage.setItem(property + this.graphId, 'false');
      } else {
        this[property] = true;
        localStorage.setItem(property + this.graphId, 'true');
      }
      this.drawGraph();
    },

    getCheckboxValues(property) { // Fetch the value of a given checkbox in the localstorage
      const storedValue = localStorage.getItem(property + this.graphId);
      if (storedValue !== null) {
        return storedValue === 'true';
      }
      return true;
    },

    updateStepTime() { // Save the value of the time steps in the local storage
      localStorage.setItem(this.graphData[0].graphName, this.stepTime);
      this.drawAll();
    },

    getStepTime() {  // Fetch the value of the time steps in the local storage
      return localStorage.getItem(this.graphData[0].graphName) === null ? 3600 : localStorage.getItem(this.graphData[0].graphName);
    },

    ///////////////////////////GRAPH///////////////////

    calculateGraphWidth() {
      let screenWidth = window.innerWidth;
        if(screenWidth < 1000){
          return screenWidth -20;
        }else {
          return 1000;
        }
    },

    calculateGraphHeight() {
      let screenHeight = window.innerHeight;
        if(screenHeight < 1000){
          return screenHeight / 2;
        }else {
          return 1000;
        }
    },

    drawAll() {
      this.scaleTime(this.stepTime);
      this.drawGraph();
    },

    scaleTime(fusedAmount) { //O(n2)
      const newData = [];
      let i = 0;
      while (i < this.rawData.length) {
        let newEvent = { ...this.rawData[i] };
        let j = i + 1;
        while (
          j < this.rawData.length &&
          this.rawData[i].x_value > this.rawData[j].x_value - fusedAmount
        ) {
          newEvent.y_value += this.rawData[j].y_value;
          j++;
        }
        newData.push(newEvent);
        i = j;
      }
      this.data = newData;
    },

    sortArrayByBiggest(array) {
      return array.sort((a, b) => b.y_value - a.y_value);
    },

      drawGraph() {
        // Get the canvas element and its context
        const canvas = this.$refs.graphCanvas;
        const ctx = canvas.getContext("2d");

        //////////////////////CALCULATE STUFF//////////////////////
        const graphMargin = 40;
        const firstPointDate = new Date(Math.min(...this.data.map((d) => d.x_value)) * 1000).toLocaleDateString('en-GB');
        const lastPointDate = new Date(Math.max(...this.data.map((d) => d.x_value)) * 1000).toLocaleDateString('en-GB');        // Calculate the dimensions of the graph area
        
        const graphWidth = this.canvasWidth - 80;
        const graphHeight = this.canvasHeight - 90;
        
        // Find the maximum values of time and event in the data array
        const maxX = Math.max(...this.data.map((d) => d.x_value));
        const maxY = Math.max(...this.data.map((d) => d.y_value));
        // Find the minimum values of time and event in the data array
        const minX = Math.min(...this.data.map((d) => d.x_value));
        //const minY = Math.min(...this.data.map((d) => d.y_value));
        

        //////////////////////DRAW STUFF//////////////////////
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the x-axis and y-axis lines
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(graphMargin, 10); // Starting point of the x-axis
        ctx.lineTo(graphMargin, this.canvasHeight - graphMargin); // Ending point of the x-axis
        ctx.lineTo(this.canvasWidth - 10, this.canvasHeight - graphMargin); // Ending point of the y-axis
        ctx.stroke(); // Draw the lines

        // Add arrowheads to the tips of the axes
        const arrowSize = 10;

        // X-axis arrowhead
        ctx.beginPath();
        ctx.moveTo(this.canvasWidth - 8 - arrowSize, this.canvasHeight - graphMargin - arrowSize / 2);
        ctx.lineTo(this.canvasWidth - 8, this.canvasHeight - graphMargin);
        ctx.lineTo(this.canvasWidth - 8 - arrowSize, this.canvasHeight - graphMargin + arrowSize / 2);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();

        // Y-axis arrowhead
        ctx.beginPath();
        ctx.moveTo(graphMargin - arrowSize / 2, 15);
        ctx.lineTo(graphMargin, 15 - arrowSize);
        ctx.lineTo(graphMargin + arrowSize / 2, 15);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();

        // Draw dates
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(firstPointDate, 40, this.canvasHeight - 20);
        ctx.fillText(lastPointDate, graphWidth, this.canvasHeight - 20);


        // Iterate over the array of data
        this.data.forEach((d) => {
          //const x = graphMargin + ((d.x_value - minX) / (maxX - minX)) * graphWidth; // Scale the x-coordinate based on the maximum time value
          const y = this.canvasHeight - graphMargin - (d.y_value / maxY) * graphHeight; // Scale the y-coordinate based on the maximum event value
          
          if(this.indexLines){
            //DRAW HORIZONTAL LINES
            ctx.strokeStyle = "#cecece";
            ctx.beginPath();
            ctx.moveTo(graphMargin + 1, y);
            ctx.lineTo(graphMargin + 20 + graphWidth, y);
            ctx.stroke();
          }

        });

        // Iterate over the array of data
        this.data.forEach((d, index) => {
          const x = graphMargin + ((d.x_value - minX) / (maxX - minX)) * graphWidth; // Scale the x-coordinate based on the maximum time value
          const y = this.canvasHeight - graphMargin - (d.y_value / maxY) * graphHeight; // Scale the y-coordinate based on the maximum event value

          if(this.lines){
            //DRAW RED LINES
            if (index > 0) {
              const prevX = graphMargin + ((this.data[index - 1].x_value - minX) / (maxX - minX)) * graphWidth;
              const prevY = this.canvasHeight - graphMargin - (this.data[index - 1].y_value / maxY) * graphHeight;
              ctx.strokeStyle = "#ff8c8c";
              ctx.beginPath();
              ctx.moveTo(prevX, prevY);
              ctx.lineTo(x, y);
              ctx.stroke();
            }
          }
        });

        // Iterate over the array of data a second time to avoid overlapping of lines
        this.data.forEach((d) => {
          // Calculate the x and y coordinates for the data point
          const x = graphMargin + ((d.x_value - minX) / (maxX - minX)) * graphWidth; // Scale the x-coordinate based on the maximum time value
          const y = this.canvasHeight - graphMargin - (d.y_value / maxY) * graphHeight; // Scale the y-coordinate based on the maximum event value
          
          //DRAW TEXT NUMBER Y VALUES
          ctx.font = '12px Arial';
          ctx.fillStyle = 'black';
          const textWidth = ctx.measureText(d.y_value).width;
          ctx.fillText(d.y_value, 30-textWidth, y - 0);

          if(this.dots){
            //DRAW DOTS
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
          }
        });


        
      },

    },
  };
  </script>

  <style scoped>

    input {
      margin-bottom: 2rem;
      width: 5rem;
    }
    p {
      margin: 0px;
    }
    svg {
      height:  2rem;
      cursor: pointer;
    }

    #open-config,
    #close-config {
      text-align: right;
      max-width: 1000px;
      margin: auto;
    }

    input[type="checkbox" i]{
      width: 2rem;
    }

    .checkboxs label {
      margin-right: 2rem;
    }

    .checkboxs input {
      cursor: pointer;
    }
  </style>
  