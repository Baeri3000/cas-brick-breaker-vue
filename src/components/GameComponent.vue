<template>
  <section id="game">
    <div class="main-container">
      <div class="content">
        <div class="row">
          <div class="col">
            <div id="canvas-container">
              <canvas id="gameCanvas" class="gameCanvas" width="800" height="600"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  display: -webkit-box;
  display: -ms-flexbox;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  text-align: center;
  flex-direction: column;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.gameCanvas {
  min-width: 800px;
  min-height: 600px;
}
</style>