import * as dat from 'dat.gui';

import { Glscope, GlscopeSignal } from './glscope';

// new Array(132*2).fill(0).map((n, i) => i % 2 === 0 ? i/2*1000 : Math.random()*1000);
// const torqueData = [0, 0, 1002, 6, 1999, 0, 3245, 0, 3996, -3, 5004, -5, 5996, 2, 7002, -4, 8000, 1, 9004, 0, 10003, -3, 11001, 2, 12003, 2, 13000, 0, 14004, 2, 15001, 4, 15999, -4, 17003, 0, 18000, 0, 18996, 3, 20000, 4, 20998, -2, 22002, -1, 23000, 0, 24004, 0, 25003, 0, 26003, -3, 27002, 0, 27998, 0, 29003, 4, 29999, 2, 31003, 5, 32001, 2, 33003, -4, 34000, -2, 35003, -5, 35999, -4, 37003, 3, 38001, 5, 38998, 0, 40003, 0, 41000, -5, 41996, 8, 43002, 2, 43999, 5, 45003, 0, 46000, 0, 47004, -2, 47996, 0, 49002, -5, 50000, 0, 51004, 2, 51996, -3, 53003, 0, 54000, 0, 55002, 2, 55999, 0, 57000, 0, 58002, -4, 59002, 0, 59999, 3, 60999, -1, 62003, 0, 63000, 1, 64004, 0, 64996, 0];
// const randomData = [9000, 586.3267168238461, 10000, 908.0120768434472, 11000, 935.3723009668003, 12000, 191.43810403670813, 13000, 206.1692377055213, 14000, 576.6090854762244, 15000, 591.1059603273334, 16000, 499.38148031910123, 17000, 965.6829981590458, 18000, 871.5993574606966, 19000, 741.3875562445292, 20000, 157.95806540234224, 21000, 117.92535128997228, 22000, 506.1847827362538, 23000, 973.3485460894346, 24000, 185.76530702990658, 25000, 443.433362597236, 26000, 96.50603250742363, 27000, 539.1228064900175, 28000, 505.6408735809588, 29000, 505.58430427851, 30000, 107.34201753543826, 31000, 124.95142497142186, 32000, 573.1144650812206, 33000, 642.4863530315502, 34000, 735.1575544981807, 35000, 494.6026088819018, 36000, 610.8810151051512, 37000, 649.4442544599198, 38000, 286.28223548480423, 39000, 637.9070637151996, 40000, 594.3307215972146, 41000, 678.1463133830581, 42000, 463.23624400666375, 43000, 87.24865939047999, 44000, 81.53610868060612, 45000, 601.0391243468334, 46000, 450.6753675469532, 47000, 302.0500726153503, 48000, 476.7012912877047, 49000, 975.9080179778714, 50000, 574.4777996091619, 51000, 399.8786269724439, 52000, 360.38609270452906, 53000, 972.0596982020581, 54000, 81.59216515525536, 55000, 749.7475537618096, 56000, 799.0950828487273, 57000, 522.7947191668536, 58000, 95.18221816933448, 59000, 745.4052136066435, 60000, 564.2149704491137, 61000, 69.83843411306, 62000, 522.6453563024962, 63000, 52.28049741517849, 64000, 488.5459336976545, 65000, 284.76223470499383, 66000, 525.4892946415499, 67000, 973.8822240331444, 68000, 706.2731734918179, 69000, 987.2440924557997, 70000, 573.6870591924035, 71000, 62.19093573356105, 72000, 494.89449128975707, 73000, 603.2138966090228, 74000, 360.5512047947255, 75000, 976.9194406511292, 76000, 811.5822568542568, 77000, 463.0594567273998, 78000, 333.49632292917295, 79000, 404.9842675559474, 80000, 607.1877077878403, 81000, 613.4011009017919, 82000, 485.1775738714428, 83000, 586.8666726452598, 84000, 283.6863559634997, 85000, 119.6114720041479, 86000, 810.8697652723076, 87000, 137.37057993635827, 88000, 314.3921777444374, 89000, 665.3749761181626, 90000, 39.762966348633185, 91000, 5.489782016320222, 92000, 558.1278231317273, 93000, 562.4209644668501, 94000, 567.3161224113165, 95000, 131.73964595043296, 96000, 547.911791483297, 97000, 444.23554663716925, 98000, 823.2044201711337, 99000, 992.2222332224558, 100000, 321.394264219993, 101000, 689.040912373516, 102000, 836.7949966820701, 103000, 474.18178582853045, 104000, 216.0113566044033, 105000, 261.1818373907797, 106000, 787.2636002038329, 107000, 110.16936199031457, 108000, 93.27945223656565, 109000, 990.1162342528285, 110000, 932.9055567722766, 111000, 804.9417574548534, 112000, 201.8059582548073, 113000, 243.7923866390632, 114000, 140.57483441879316, 115000, 145.63575054847468, 116000, 487.6576039895861, 117000, 698.3280085750146, 118000, 757.6968744009782, 119000, 702.4171058661883, 120000, 647.5897840605215, 121000, 554.6648036240798, 122000, 818.9508884973216, 123000, 173.87431154821954, 124000, 550.4639678666721, 125000, 914.9269211643833, 126000, 895.8544151484356, 127000, 617.92118165979, 128000, 197.54720306688455, 129000, 746.3316558006612, 130000, 41.05705354426847, 131000, 212.73082679725275];
// const torqueDataSignal: GlscopeSignal = { color: [1.0, 0.0, 0.5, 1.0], data: torqueData };
// const randomDataSignal: GlscopeSignal = { color: [0.5, 0.7, 0.5, 1.0], data: randomData };

const gui = new dat.GUI({
  name: 'glscope',
});

const xRange = {
  min: 0,
  max: 50000,
};

const yRange = {
  min: -1000,
  max: 1000,
};

const sineWave = {
  length: 0.005,
  amplitude: 250,
  frequency: 0.01,
};

const canvas = document.querySelector('canvas');

if (canvas) {

  const glscope = new Glscope(canvas);

  // glscope.addSignal(torqueDataSignal);
  // glscope.addSignal(randomDataSignal);

  const sineWaveSignal: GlscopeSignal = { color: [1.0, 0.0, 0.5, 1.0], data: [] };
  glscope.addSignal(sineWaveSignal);

  let sineWaveIncrement = sineWave.frequency;
  const tx = Date.now();

  function loop() {
    const time = Date.now();
    const amplitude = Math.sin(time * sineWave.length + sineWaveIncrement) * sineWave.amplitude;
    glscope.addData(0, time - tx, amplitude);
    sineWaveIncrement += sineWave.frequency;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  window.onload = () => {
    glscope.init();

    const xRangeFolder = gui.addFolder('xRange');
    xRangeFolder.add(xRange, 'min', 0, 50000).onChange(_ => glscope.xRange = [xRange.min, xRange.max]);
    xRangeFolder.add(xRange, 'max', 0, 50000).onChange(_ => glscope.xRange = [xRange.min, xRange.max]);
    xRangeFolder.open();

    const yRangeFolder = gui.addFolder('yRange');
    yRangeFolder.add(yRange, 'min', -1000, 1000).onChange(_ => glscope.yRange = [yRange.min, yRange.max]);
    yRangeFolder.add(yRange, 'max', -1000, 1000).onChange(_ => glscope.yRange = [yRange.min, yRange.max]);
    yRangeFolder.open();

    const sineWaveFolder = gui.addFolder('Sine wave');
    sineWaveFolder.add(sineWave, 'length', -0.01, 0.01);
    sineWaveFolder.add(sineWave, 'amplitude', -1000, 1000);
    sineWaveFolder.add(sineWave, 'frequency', -0.01, 1);
    sineWaveFolder.open();

  };

}
