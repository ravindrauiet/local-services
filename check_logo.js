import { Image } from 'image-js';

async function checkImage() {
  try {
    const image = await Image.load('f:/Freelacing Projects/Milyo/public/logo.png');
    console.log(`Width: ${image.width}, Height: ${image.height}, Ratio: ${image.width / image.height}`);
  } catch (err) {
    console.error(err);
  }
}

checkImage();
