const context = new window.AudioContext();

interface Sounds {
  typewriter?: AudioBuffer;
  wrong?: AudioBuffer;
  correct?: AudioBuffer;
}

const sounds: Sounds = {};

export async function loadSounds() {
  const typewriterUrl = require('@/assets/sounds/typewriter.ogg');
  const wrongUrl = require('@/assets/sounds/wrong.wav');
  const correctUrl = require('@/assets/sounds/correct.wav');

  sounds.typewriter = await loadSound(typewriterUrl);
  sounds.wrong = await loadSound(wrongUrl);
  sounds.correct = await loadSound(correctUrl);
}

export function playTypewriter() {
  if (sounds.typewriter) {
    playSound(sounds.typewriter);
  }
}
export function playWrong() {
  if (sounds.wrong) {
    playSound(sounds.wrong);
  }
}
export function playCorrect() {
  if (sounds.correct) {
    playSound(sounds.correct);
  }
}

async function loadSound(soundUrl: string) {
  const resTypeWriter = await fetch(soundUrl);
  const buffer = await resTypeWriter.arrayBuffer();
  return await context.decodeAudioData(buffer);
}

function playSound(buffer: AudioBuffer) {
  const audioNode = context.createBufferSource();
  audioNode.loop = false;
  audioNode.buffer = buffer;
  audioNode.connect(context.destination);
  audioNode.start();
}
