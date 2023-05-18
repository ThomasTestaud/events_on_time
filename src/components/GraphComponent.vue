<template>
  <div>
    <canvas ref="graphCanvas" :width="canvasWidth" :height="canvasHeight"></canvas><br/>
    <label for="stepTime">Fuse points: </label>
    <input name="stepTime" type="number" v-model="stepTime" @change="updateStepTime()">
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
      canvasWidth: 400,
      canvasHeight: 300,
      stepTime: this.getStepTime(),
      rawData: [], // Added rawData property
      data: [],
    };
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

    getStepTime() {
      return localStorage.getItem(this.graphData[0].graphName) === null ? 2 : localStorage.getItem(this.graphData[0].graphName);
    },

    updateStepTime() {
      //console.log(this.graphData[0].graphName);
      localStorage.setItem(this.graphData[0].graphName, this.stepTime);
      this.drawAll();
    },

    drawAll() {
      this.scaleTime(this.stepTime);
      this.drawGraph();
    },
    scaleTime(fusedAmount) {
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

      drawGraph() {
        // Get the canvas element and its context
        const canvas = this.$refs.graphCanvas;
        const ctx = canvas.getContext("2d");
        
        // Calculate the dimensions of the graph area
        const graphWidth = this.canvasWidth - 40;
        const graphHeight = this.canvasHeight - 40;
        
        // Find the maximum values of time and event in the data array
        const maxX = Math.max(...this.data.map((d) => d.x_value));
        const maxY = Math.max(...this.data.map((d) => d.y_value));
        // Find the minimum values of time and event in the data array
        const minX = Math.min(...this.data.map((d) => d.x_value));
        //const minY = Math.min(...this.data.map((d) => d.event));
        
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the x-axis and y-axis lines
        ctx.beginPath();
        ctx.moveTo(20, 20); // Starting point of the x-axis
        ctx.lineTo(20, this.canvasHeight - 20); // Ending point of the x-axis
        ctx.lineTo(this.canvasWidth - 20, this.canvasHeight - 20); // Ending point of the y-axis
        ctx.stroke(); // Draw the lines
        
        // Set the fill style for the data points
        ctx.fillStyle = "blue";
        ctx.beginPath();
        // Iterate over the data array and draw each data point as a circle
        this.data.forEach((d, index) => {
          // Calculate the x and y coordinates for the data point
          const x = 20 + ((d.x_value - minX) / (maxX - minX)) * graphWidth; // Scale the x-coordinate based on the maximum time value
          const y = this.canvasHeight - 20 - (d.y_value / maxY) * graphHeight; // Scale the y-coordinate based on the maximum event value
          
          // Connect the data points with a red line
          if (index > 0) {
            const prevX = 20 + ((this.data[index - 1].x_value - minX) / (maxX - minX)) * graphWidth;
            const prevY = this.canvasHeight - 20 - (this.data[index - 1].y_value / maxY) * graphHeight;
            
            ctx.strokeStyle = "grey";
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
          // Draw the circle representing the data point
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI); // Create a circle path
          ctx.fill(); // Fill the circle with the specified fill style
          
        });
      },

    },
  };
  </script>

  <style scoped>

    input {
      margin-bottom: 2rem;
    }

  </style>
  