import { Buffer } from "buffer";

async function getBase64Image(img) {
  const arrayBuffer = await (await fetch(img)).arrayBuffer();
  const buffer = Buffer.from(arrayBuffer).toString("base64");

  return buffer;
}

const onSelectFile = (e) => {
  if (!e.target.files || e.target.files.length === 0) {
    return;
  }

  // I've kept this example simple by using the first image instead of multiple
  const objecturl = URL.createObjectURL(e.target.files[0]);
  // setImagePreviews((prev) => [...prev, objecturl]);
  // setSelectedPreview(objecturl);

  return {
    binary: getBase64Image(objecturl),
    blob: objecturl,
  };
};

export { onSelectFile };
