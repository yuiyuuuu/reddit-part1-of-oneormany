import React, { useState, useEffect } from "react";
import InfoIconName from "../../../communitiessvg/InfoIconName";
import "./nameicon.scss";
import { Buffer } from "buffer";

import SelectedRadio2 from "../../../communitiessvg/SelectedRadio2";
import NotSelectedRadio2 from "../../../communitiessvg/NotSelectedradio2";
import TrashCan from "../../modtoolssvgs/TrashCan";
import UploadFileSvg from "../../modtoolssvgs/UploadFileSvg";

import { onSelectFile } from "../../../../../requests/getBase64Image";
import { useDispatch, useSelector } from "react-redux";
import { setIconImage } from "../../../../../store/selectedCommunityIconImage";
import { ChangeIconImage } from "../../../../../store/posts-individualcommunity";
import { setMadeChange } from "../../../../../store/comstyling/madeChange";

const NameIcon = ({ community, setSelectedSection }) => {
  const selectedImageState = useSelector((state) => state.iconImage);
  const dispatch = useDispatch();

  const [selectedName, setSelectedName] = useState(
    community?.communityNameFormat || `r/${community.name}`
  );
  const [selectedImageBlob, setSelectedImageBlob] = useState(null);

  async function getBase64Image(img) {
    const arrayBuffer = await (await fetch(img)).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer).toString("base64");

    dispatch(setIconImage(buffer));
  }

  function handleImageUpload(e) {
    const binary = onSelectFile(e);

    setSelectedImageBlob(binary.blob);

    getBase64Image(binary.blob);
    e.target.value = "";
    dispatch(setMadeChange(true));
  }

  function handleDeleteImage() {
    setSelectedImageBlob(null);
    dispatch(setIconImage(null));

    if (community?.iconImage) {
      dispatch(setMadeChange(true));
    }
  }

  function handleIconChange() {
    //change function here
    const obj = {
      id: community.id,
      image: selectedImageState,
      communityNameFormat: selectedName,
    };
    dispatch(ChangeIconImage(obj)).then(() => setSelectedSection(""));
  }

  useEffect(() => {
    if (community?.iconImage) {
      dispatch(setIconImage(community.iconImage));
    }
  }, [community?.iconImage]);

  return (
    <div>
      <div className='name-header'>
        <div className='name-title'>Name & icon</div>
        <div className='name-i'>
          <InfoIconName />
          <span>Name & icon</span>
        </div>
      </div>

      <div className='name-second'>
        <div className='name-nameformat'>Community Name Format</div>
        <div className='name-selection'>
          <div
            className='name-option'
            onClick={() => {
              setSelectedName(`r/${community.name}`);
              dispatch(setMadeChange(true));
            }}
          >
            {selectedName === `r/${community.name}` ? (
              <SelectedRadio2 />
            ) : (
              <NotSelectedRadio2 />
            )}
            r/{community.name}
          </div>

          <div
            className='name-option'
            onClick={() => {
              setSelectedName(`${community.name}`);
              dispatch(setMadeChange(true));
            }}
          >
            {selectedName === `${community.name}` ? (
              <SelectedRadio2 />
            ) : (
              <NotSelectedRadio2 />
            )}
            {community.name}
          </div>

          <div
            className='name-option'
            onClick={() => {
              setSelectedName("hide");
              dispatch(setMadeChange(true));
            }}
          >
            {selectedName === "hide" ? (
              <SelectedRadio2 />
            ) : (
              <NotSelectedRadio2 />
            )}
            Hide
          </div>
        </div>
      </div>

      <div className='name-third'>
        <div className='name-nameformat'>Community Icon</div>
        <div className='name-inputcol'>
          <div className='name-t'>Custom Image</div>
          <div
            className='name-inputimage'
            id='name-inputimage'
            onClick={() => {
              if (!selectedImageState) {
                document.getElementById("name-imageinput").click();
              } else {
                return;
              }
            }}
            style={{
              cursor: !selectedImageState ? "pointer" : "auto",
              backgroundImage:
                selectedImageState?.slice(4) === "blob"
                  ? `url(${selectedImageBlob})`
                  : `url(data:image/png;base64,${selectedImageState})`,
            }}
          >
            {!selectedImageState && <UploadFileSvg />}

            {!selectedImageState && (
              <div style={{ fontSize: "11px" }}>
                Drag and Drop or Upload Image
              </div>
            )}

            {selectedImageState && (
              <div className='comstyling-imageremove'>
                <TrashCan deleteFunction={handleDeleteImage} />
              </div>
            )}

            <input
              id='name-imageinput'
              type='file'
              hidden
              accept='image/png, image/jpeg'
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>

      <button
        className='bluebutton-button'
        style={{ margin: "8px 0", width: "100%" }}
        onClick={() => handleIconChange()}
      >
        Save
      </button>

      <button
        className='blueborder-button'
        onClick={() => {
          setSelectedSection("");
          dispatch(setIconImage(null));
          dispatch(setMadeChange(false));
        }}
        style={{ width: "100%" }}
      >
        Cancel
      </button>
    </div>
  );
};

export default NameIcon;
