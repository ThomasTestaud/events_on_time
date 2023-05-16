<template>
    <div>
      <canvas ref="graphCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
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
        data: this.graphData,
      };
    },

    mounted() {
      this.scaleTime(0);
      this.drawGraph();
    },

    methods: {
      
      scaleTime(fusedAmount) {
        let newData = [];
        let i = 0;
        while(i < this.data.length){
          let newEvent = this.data[i];
          let j = i + 1;
          while(j < this.data.length && this.data[i].x_value > this.data[j].x_value - fusedAmount){
            newEvent.Y_value += this.data[j].Y_value;
            j++;
          }
          newData.push(newEvent);
          i = j;
        }
        this.data = newData;
      },

      drawGraph() {
        console.log('DRAW');
        console.log(this.data);
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
        
        // Iterate over the data array and draw each data point as a circle
        this.data.forEach((d) => {
          // Calculate the x and y coordinates for the data point
          const x = 20 + ((d.x_value - minX) / (maxX - minX)) * graphWidth; // Scale the x-coordinate based on the maximum time value
          const y = this.canvasHeight - 20 - (d.y_value / maxY) * graphHeight; // Scale the y-coordinate based on the maximum event value
          
          // Draw the circle representing the data point
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI); // Create a circle path
          ctx.fill(); // Fill the circle with the specified fill style
        });
      },

    },
  };
  </script>
  