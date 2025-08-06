for (let addr = 1; addr < 256; addr++) {
  let data = [];
  for (let n = 0; n < 1500; n++) {
    data.push(n < addr ? 3 : 0);
  }
  let ip = `10.0.0.${addr}`;
  request(ip, { command: "display", data })
    .then(() => console.log(`Request to ${ip} accepted`))
    .catch(() => {});
}

function displayFrame(frame) {
  return Promise.all(
    frame.map((data, i) => {
      return request(screenAddresses[i], {
        command: "display",
        data,
      });
    }),
  );
}

function wait(time) {
  return new Promise((accept) => setTimeout(accpet, time));
}

class VideoPlayer {
  constructor(frames, frameTime) {
    this.frames = frames;
    this.frameTime = frameTime;
    this.stopped = true;
  }

  async play() {
    this.stopped = false;
    for (let i = 0; !this.stopped; i++) {
      let nextFrame = wait(this.frameTime);
      await displayFrame(this.frames[i % this.frames.length]);
      await nextFrame;
    }
  }

  stop() {
    this.stopped = true;
  }
}

let video = new VideoPlayer(clipImages, 100);
video.play().catch((e) => {
  console.log("Playback failed: " + e);
});
setTimeout(() => video.stop(), 15000);
