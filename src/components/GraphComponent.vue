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
          { time: 1, event: 5 },
          { time: 2, event: 7 },
          { time: 3, event: 8 },
          { time: 4, event: 10 },
          { time: 5, event: 8 },
          { time: 6, event: 9 },
          { time: 7, event: 10 },
          { time: 8, event: 11 },
          { time: 9, event: 12 },
          { time: 10, event: 20 },
          // Add more data points as needed
        ],
      };
    },
    mounted() {
      this.drawGraph();
    },
    methods: {
      drawGraph() {
        const canvas = this.$refs.graphCanvas;
        const ctx = canvas.getContext("2d");
        const graphWidth = this.canvasWidth - 40;
        const graphHeight = this.canvasHeight - 40;
        const maxX = Math.max(...this.data.map((d) => d.time));
        const maxY = Math.max(...this.data.map((d) => d.event));
  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(20, this.canvasHeight - 20);
        ctx.lineTo(this.canvasWidth - 20, this.canvasHeight - 20);
        ctx.stroke();
  
        ctx.fillStyle = "blue";
        this.data.forEach((d) => {
          const x = 20 + (d.time / maxX) * graphWidth;
          const y = this.canvasHeight - 20 - (d.event / maxY) * graphHeight;
  
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        });
      },
    },
  };
  </script>
  