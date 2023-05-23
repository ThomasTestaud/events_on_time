<template>
  <div>
    <canvas ref="graphCanvas" :width="canvasWidth" :height="canvasHeight"></canvas><br/>
    <p>Group by 
    <input name="stepTime" type="number" v-model="stepTime" @change="updateStepTime()"> seconds.
    </p>
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
      canvasWidth: this.calculateGraphWidth(),
      canvasHeight: this.calculateGraphHeight(),
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
      return localStorage.getItem(this.graphData[0].graphName) === null ? 3600 : localStorage.getItem(this.graphData[0].graphName);
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

      drawGraph() {
        // Get the canvas element and its context
        const canvas = this.$refs.graphCanvas;
        const ctx = canvas.getContext("2d");

        //////////////////////CALCULATE STUFF
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
        

        //////////////////////DRAW STUFF
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

        //DRAW LINES
        // Iterate over the data array and draw each data point
        this.data.forEach((d, index) => {
          // Calculate the x and y coordinates for the data point
          const x = graphMargin + ((d.x_value - minX) / (maxX - minX)) * graphWidth; // Scale the x-coordinate based on the maximum time value
          const y = this.canvasHeight - graphMargin - (d.y_value / maxY) * graphHeight; // Scale the y-coordinate based on the maximum event value
          
          if (index > 0) {
            const prevX = graphMargin + ((this.data[index - 1].x_value - minX) / (maxX - minX)) * graphWidth;
            const prevY = this.canvasHeight - graphMargin - (this.data[index - 1].y_value / maxY) * graphHeight;
            
            ctx.strokeStyle = "#ff8c8c";
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        });

        //DRAW DOTS
        // Iterate over the data array and draw each data point
        this.data.forEach((d) => {
          // Calculate the x and y coordinates for the data point
          const x = graphMargin + ((d.x_value - minX) / (maxX - minX)) * graphWidth; // Scale the x-coordinate based on the maximum time value
          const y = this.canvasHeight - graphMargin - (d.y_value / maxY) * graphHeight; // Scale the y-coordinate based on the maximum event value

          //WRITE Y VALUES
          // Clear background
          //ctx.clearRect(0, d.y_value -12, graphMargin, 14);
          // Set the font properties
          ctx.font = '12px Arial';
          ctx.fillStyle = 'black';
          const textWidth = ctx.measureText(d.y_value).width;
          // Draw the text on the canvas
          ctx.fillText(d.y_value, 30-textWidth, y - 0);

          
          // Set the fill style for the data points
          ctx.fillStyle = "blue";
          ctx.beginPath();

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
      width: 5rem;
    }
    p {
      margin: 0px;
    }

  </style>
  