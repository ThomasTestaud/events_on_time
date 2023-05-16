<template>
    <div>
      <canvas ref="graphCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GraphComponent',
    data() {
      return {
        canvasWidth: 400,
        canvasHeight: 300,
        data: [
          { time: 1684215730, event: 5 },
          { time: 1684215731, event: 7 },
          { time: 1684215732, event: 8 },
          { time: 1684215733, event: 10 },
          { time: 1684215734, event: 8 },
          { time: 1684215735, event: 9 },
          { time: 1684215736, event: 10 },
          { time: 1684215737, event: 11 },
          { time: 1684215738, event: 12 },
          { time: 1684215739, event: 20 },
          // Add more data points as needed
        ],
      };
    },
    mounted() {
      this.drawGraph();
    },
    methods: {
      drawGraph() {
        // Get the canvas element and its context
        const canvas = this.$refs.graphCanvas;
        const ctx = canvas.getContext("2d");
        
        // Calculate the dimensions of the graph area
        const graphWidth = this.canvasWidth - 40;
        const graphHeight = this.canvasHeight - 40;
        
        // Find the maximum values of time and event in the data array
        const maxX = Math.max(...this.data.map((d) => d.time));
        const maxY = Math.max(...this.data.map((d) => d.event));
        // Find the minimum values of time and event in the data array
        const minX = Math.min(...this.data.map((d) => d.time));
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
          const x = 20 + ((d.time - minX) / (maxX - minX)) * graphWidth; // Scale the x-coordinate based on the maximum time value
          const y = this.canvasHeight - 20 - (d.event / maxY) * graphHeight; // Scale the y-coordinate based on the maximum event value
          
          // Draw the circle representing the data point
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI); // Create a circle path
          ctx.fill(); // Fill the circle with the specified fill style
        });
      },
    },
  };
  </script>
  