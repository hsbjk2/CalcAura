import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getNextZIndex,
  getNextStackZIndex,
  bringToFront,
  sendToBack,
  bringForward,
  sendBackward,
  reorderSheetLayers,
  hitTestObject,
  hitTestTopObject,
} from './layerUtils.ts';
import { CanvasObject } from './types.ts';

test('layer stacking: getNextZIndex returns max + 1', () => {
  const items = [{ id: '1', zIndex: 1 }, { id: '2', zIndex: 5 }, { id: '3', zIndex: 3 }];
  assert.equal(getNextZIndex(items), 6);
});

test('layer stacking: bringToFront puts target at top', () => {
  const items = [{ id: 'img', zIndex: 1 }, { id: 'sticker', zIndex: 2 }, { id: 'text', zIndex: 3 }];
  const updated = bringToFront(items, 'img');
  const img = updated.find((o) => o.id === 'img');
  assert.equal(img?.zIndex, 3);
});

test('layer stacking: sendToBack puts target at bottom', () => {
  const items = [{ id: 'img', zIndex: 1 }, { id: 'sticker', zIndex: 2 }, { id: 'text', zIndex: 3 }];
  const updated = sendToBack(items, 'text');
  const text = updated.find((o) => o.id === 'text');
  assert.equal(text?.zIndex, 1);
});

test('layer stacking: bringForward steps target one level up', () => {
  const items = [{ id: 'img', zIndex: 1 }, { id: 'sticker', zIndex: 2 }, { id: 'text', zIndex: 3 }];
  const updated = bringForward(items, 'img');
  const img = updated.find((o) => o.id === 'img');
  const sticker = updated.find((o) => o.id === 'sticker');
  assert.equal(img?.zIndex, 2);
  assert.equal(sticker?.zIndex, 1);
});

test('layer stacking: sendBackward steps target one level down', () => {
  const items = [{ id: 'img', zIndex: 1 }, { id: 'sticker', zIndex: 2 }, { id: 'text', zIndex: 3 }];
  const updated = sendBackward(items, 'text');
  const text = updated.find((o) => o.id === 'text');
  const sticker = updated.find((o) => o.id === 'sticker');
  assert.equal(text?.zIndex, 2);
  assert.equal(sticker?.zIndex, 3);
});

test('layer hit testing: hitTestObject detects point inside bounds', () => {
  const rectObj: CanvasObject = {
    id: 'rect1',
    type: 'shape',
    shapeType: 'rect',
    x: 100,
    y: 100,
    width: 200,
    height: 150,
    strokeColor: '#000',
    fillColor: '#fff',
    strokeWidth: 2,
    zIndex: 1,
  };
  assert.equal(hitTestObject(rectObj, { x: 150, y: 150 }), true);
  assert.equal(hitTestObject(rectObj, { x: 50, y: 50 }), false);
});

test('layer hit testing: hitTestTopObject selects top-most overlapping object and cycles', () => {
  const img: CanvasObject = {
    id: 'img1',
    type: 'image',
    src: 'data:...',
    aspectRatio: 1,
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    zIndex: 1,
  };
  const text: CanvasObject = {
    id: 'text1',
    type: 'text',
    text: 'Caption',
    color: '#000',
    fontSize: 20,
    fontFamily: 'sans-serif',
    x: 120,
    y: 120,
    width: 100,
    height: 40,
    zIndex: 2,
  };

  const point = { x: 140, y: 130 }; // Inside both text and image
  const top = hitTestTopObject([img, text], point);
  assert.equal(top?.id, 'text1'); // Topmost is text!

  // Cycling when top is already selected returns the one underneath
  const cycled = hitTestTopObject([img, text], point, 'text1');
  assert.equal(cycled?.id, 'img1');
});

test('layer stacking: getNextStackZIndex computes max across both objects and paths', () => {
  const sheet = {
    objects: [{ id: 'img', zIndex: 2 }],
    paths: [{ id: 'path1', zIndex: 4 }, { id: 'path2', zIndex: 1 }],
  };
  assert.equal(getNextStackZIndex(sheet), 5);
});

test('layer stacking: reorderSheetLayers moves object above paths and back', () => {
  const objects = [{ id: 'img', zIndex: 1 }];
  const paths = [
    { id: 'p1', zIndex: 2 },
    { id: 'p2', zIndex: 3 },
  ];

  // 1. Bring img to front
  const toFront = reorderSheetLayers(objects, paths, 'img', 'front');
  const imgFront = toFront.objects.find((o) => o.id === 'img');
  const p1 = toFront.paths.find((p) => p.id === 'p1');
  const p2 = toFront.paths.find((p) => p.id === 'p2');
  assert.equal(imgFront?.zIndex, 3);
  assert.equal(p1?.zIndex, 1);
  assert.equal(p2?.zIndex, 2);

  // 2. Send img to back
  const toBack = reorderSheetLayers(toFront.objects, toFront.paths, 'img', 'back');
  const imgBack = toBack.objects.find((o) => o.id === 'img');
  assert.equal(imgBack?.zIndex, 1);

  // 3. Bring img forward by one step
  const stepForward = reorderSheetLayers(toBack.objects, toBack.paths, 'img', 'forward');
  const imgStep = stepForward.objects.find((o) => o.id === 'img');
  assert.equal(imgStep?.zIndex, 2);
});
