const context = new window.AudioContext();

interface Sounds {
  typewriter?: AudioBuffer;
  wrong?: AudioBuffer;
  correct?: AudioBuffer;
}

const sounds: Sounds = {};

interface Music {
  buffer: AudioBufferSourceNode;
  gain: GainNode;
  playing: boolean;
}

const music: Music = {
  buffer: context.createBufferSource(),
  gain: context.createGain(),
  playing: false,
};

export async function loadSounds() {
  const typewriterUrl = require('@/assets/sounds/typewriter.ogg');
  const wrongUrl = require('@/assets/sounds/wrong.wav');
  const correctUrl = require('@/assets/sounds/correct.wav');
  const musicUrl = require('@/assets/hell-vignette.ogg');

  sounds.typewriter = await loadSound(typewriterUrl);
  sounds.wrong = await loadSound(wrongUrl);
  sounds.correct = await loadSound(correctUrl);

  const musicBuffer = await loadSound(musicUrl);
  music.buffer.buffer = musicBuffer;
  music.buffer.loop = true;
  music.buffer.connect(music.gain);
  music.gain.connect(context.destination);
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

export function activateMusic() {
  if (!music.playing) {
    music.buffer.start();
    music.playing = true;
  } else {
    music.gain.gain.setTargetAtTime(1, context.currentTime, 1.2);
  }
}
export function deactivateMusic() {
  music.gain.gain.setTargetAtTime(0, context.currentTime, 0.7);
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
