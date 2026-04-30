let gifs = [];
let bg;

let xs = [];
let ys = [];
let vxs = [];
let vys = [];

let sizes = [];

function preload() {
  gifs[0] = loadImage("bike_anim_(2).gif");
  gifs[1] = loadImage("bort_anim.gif");
  gifs[2] = loadImage("gold_anim.gif");
  gifs[3] = loadImage("phone_anim.gif");
  gifs[4] = loadImage("purse_anim.gif");
  gifs[5] = loadImage("statue_anim.gif");

  bg = loadImage("space_bck.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < gifs.length; i++) {
    xs[i] = random(width);
    ys[i] = random(height);
    vxs[i] = random(-2, 2);
    vys[i] = random(-2, 2);

    sizes[i] = 200;
  }
}

function draw() {
  image(bg, 0, 0, width, height);

  for (let i = 0; i < gifs.length; i++) {

    let dx = xs[i] - mouseX;
    let dy = ys[i] - mouseY;
    let distance = sqrt(dx * dx + dy * dy);

    let threshold = 250; // 🔥 bigger interaction range

    if (distance < threshold && distance > 0.0001) {
      let force = (threshold - distance) / threshold;

      let strength = 8; // 🔥 stronger push

      vxs[i] += (dx / distance) * force * strength;
      vys[i] += (dy / distance) * force * strength;
    }

    xs[i] += vxs[i];
    ys[i] += vys[i];

    // bounce
    if (xs[i] < 0) {
      xs[i] = 0;
      vxs[i] *= -1;
    } else if (xs[i] > width - sizes[i]) {
      xs[i] = width - sizes[i];
      vxs[i] *= -1;
    }

    if (ys[i] < 0) {
      ys[i] = 0;
      vys[i] *= -1;
    } else if (ys[i] > height - sizes[i]) {
      ys[i] = height - sizes[i];
      vys[i] *= -1;
    }

    // 🔥 slightly less friction so motion lasts longer
    vxs[i] *= 0.99;
    vys[i] *= 0.99;

    image(gifs[i], xs[i], ys[i], sizes[i], sizes[i]);
  }
}