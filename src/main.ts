import { Glscope } from './glscope';

let xRangeMinInput: HTMLInputElement;
let xRangeMaxInput: HTMLInputElement;

let yRangeMinInput: HTMLInputElement;
let yRangeMaxInput: HTMLInputElement;

const canvas = document.querySelector('canvas');

if (canvas) {

  const glscope = new Glscope(canvas);

  window.onload = () => {
    glscope.init();

    xRangeMinInput = document.querySelector('input[name="xRangeMin"]') as HTMLInputElement;
    xRangeMaxInput = document.querySelector('input[name="xRangeMax"]') as HTMLInputElement;

    xRangeMinInput.addEventListener('change', () => glscope.xRange = [parseInt(xRangeMinInput!.value, 10), parseInt(xRangeMaxInput!.value, 10)]);
    xRangeMaxInput.addEventListener('change', () => glscope.xRange = [parseInt(xRangeMinInput!.value, 10), parseInt(xRangeMaxInput!.value, 10)]);

    yRangeMinInput = document.querySelector('input[name="yRangeMin"]') as HTMLInputElement;
    yRangeMaxInput = document.querySelector('input[name="yRangeMax"]') as HTMLInputElement;

    yRangeMinInput.addEventListener('change', () => glscope.yRange = [parseInt(yRangeMinInput!.value, 10), parseInt(yRangeMaxInput!.value, 10)]);
    yRangeMaxInput.addEventListener('change', () => glscope.yRange = [parseInt(yRangeMinInput!.value, 10), parseInt(yRangeMaxInput!.value, 10)]);

  };

}
