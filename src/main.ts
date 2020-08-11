import { Glscope } from './glscope';

import * as dat from 'dat.gui';

const gui = new dat.GUI({
  name: 'glscope',
});

const config = {
  xRangeMin: 0,
  xRangeMax: 50000,
  yRangeMin: -1000,
  yRangeMax: 1000,
};

const canvas = document.querySelector('canvas');

if (canvas) {

  const glscope = new Glscope(canvas);

  window.onload = () => {
    glscope.init();

    gui.add(config, 'xRangeMin', 0, 50000)
      .onChange(_ => glscope.xRange = [config.xRangeMin, config.xRangeMax]);

    gui.add(config, 'xRangeMax', 0, 50000)
      .onChange(_ => glscope.xRange = [config.xRangeMin, config.xRangeMax]);

    gui.add(config, 'yRangeMin', -1000, 1000)
      .onChange(_ => glscope.yRange = [config.yRangeMin, config.yRangeMax]);

    gui.add(config, 'yRangeMax', -1000, 1000)
      .onChange(_ => glscope.yRange = [config.yRangeMin, config.yRangeMax]);

  };

}
