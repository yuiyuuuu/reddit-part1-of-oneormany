import React, { useEffect, useState } from "react";
import $ from "jquery";

import { Buffer } from "buffer";

const ImageVideoText = ({
  setImages,
  images,
  setImagePreviews,
  imagePreviews,
}) => {
  const [selectedPreview, setSelectedPreview] = useState("");

  function handleClick() {
    const v = document.getElementById("upload-image").click();
  }

  function handleClick2() {
    const v = document.getElementById("upload-image2").click();
  }

  async function getBase64Image(img) {
    const arrayBuffer = await (await fetch(img)).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer).toString("base64");
    console.log(buffer);
    setImages(buffer);
  }

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#blah").attr("src", e.target.result).width(150).height(200);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    const objecturl = URL.createObjectURL(e.target.files[0]);
    setImagePreviews((prev) => [...prev, objecturl]);
    setSelectedPreview(objecturl);

    getBase64Image(objecturl);
  };

  return (
    <div>
      {!imagePreviews.length ? (
        <div className='imagevideo-container'>
          <div className='imagevideo-text'>
            Drag and drop images or{" "}
            <button
              className='imagevideo-uploadbut'
              id='imagevideo-upload'
              onClick={() => handleClick()}
            >
              Upload
              <input
                id='upload-image'
                type='file'
                hidden
                accept='image/png, image/jpeg'
                onChange={onSelectFile}
              />
            </button>
          </div>
        </div>
      ) : (
        <div className='imagevideo-previewcontainer'>
          <div className='imagevideo-previewinner'>
            {imagePreviews.map((im) => (
              <div
                className='imagevideo-previewp'
                style={{
                  opacity: selectedPreview === im ? 1 : "",
                  border: selectedPreview === im && "2px solid #878589",
                }}
              >
                <img
                  src={im}
                  className='imagevideo-previewimage'
                  onClick={() => setSelectedPreview(im)}
                />

                <div
                  className='x-containerimagevideo'
                  onClick={() => {
                    const l = imagePreviews.filter((i) => i !== im);
                    setImagePreviews(l);
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 40 40'
                    className='x-imagevideopreview'
                  >
                    <path d='M20 2.5C10.3 2.5 2.5 10.3 2.5 20c0 9.7 7.8 17.5 17.5 17.5S37.5 29.7 37.5 20C37.5 10.3 29.7 2.5 20 2.5zM24.2 27.7L20 23.5l-4.2 4.2c-1.1 1.1-2.5 1.1-3.5 0-1.1-1.1-1.1-2.4 0-3.5l4.2-4.2-4.2-4.2c-1.1-1.1-1.1-2.5 0-3.5 1.1-1.1 2.4-1.1 3.5 0l4.2 4.2 4.2-4.2c1.1-1.1 2.5-1.1 3.5 0 1.1 1.1 1.1 2.4 0 3.5L23.5 20l4.2 4.2c1.1 1.1 1.1 2.5 0 3.5C26.7 28.8 25.3 28.8 24.2 27.7z'></path>
                  </svg>
                </div>
              </div>
            ))}

            <button
              className='imagevideo-add'
              id='imagevideo-add'
              onClick={() => handleClick2()}
              style={{ border: "1px dashed #d2d0d6" }}
            >
              <svg
                className='imagevideo-addsvg'
                viewBox='0 0 20 20'
                version='1.1'
              >
                <g stroke='none'>
                  <g
                    transform='translate(-34.000000, -136.000000)'
                    fill='inherit'
                  >
                    <path d='M45.2,147.2 L48.8,147.2 C49.46272,147.2 50,146.66272 50,146 C50,145.33728 49.46272,144.8 48.8,144.8 L45.2,144.8 L45.2,141.2 C45.2,140.53728 44.66272,140 44,140 C43.33728,140 42.8,140.53728 42.8,141.2 L42.8,144.8 L39.2,144.8 C38.53728,144.8 38,145.33728 38,146 C38,146.66272 38.53728,147.2 39.2,147.2 L42.8,147.2 L42.8,150.8 C42.8,151.46272 43.33728,152 44,152 C44.66272,152 45.2,151.46272 45.2,150.8 L45.2,147.2 Z'></path>
                  </g>
                </g>
              </svg>
            </button>
            <input
              id='upload-image2'
              type='file'
              hidden
              accept='image/png, image/jpeg'
              onChange={onSelectFile}
            />
          </div>

          <div className='imagevideo-mainpreview'>
            <div className='imagevideo-mainl'>
              <img src={selectedPreview} className='preview-img' />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageVideoText;
