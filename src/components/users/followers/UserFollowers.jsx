import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { setNavLocation } from "../../../store/nav/navLocation";
import { setSelectedUser } from "../../../store/users/users";
import { addAlert } from "../../../globalcomponents/alerts/addAlertsFunctions";
import { followUser } from "../../../store/auth";
import { dispatchSetAOS } from "../../../globalcomponents/authoverlaysignup/authOverlaySignupStates";
import { unfollowUser } from "../../../store/auth";

import UserRight from "../UserRight/UserRight";
import NoFollowers from "./NoFollowers";
import SearchSvg from "./svg/SearchSvg";

import "./ufol.scss";

const UserFollowers = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const selectedUser = useSelector((state) => state.selectedUser);
  const authState = useSelector((state) => state.auth);

  function handleFollowUser(selected) {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "" }));
      return;
    }

    const obj = {
      userFollowing: authState.id,
      userFollowed: selected.id,
    };

    dispatch(followUser(obj)).then(() => {
      addAlert(`Successfully followed ${selected.name}`, dispatch);
    });
  }

  function handleUnfollowUser(selected) {
    const obj = {
      userFollowing: authState.id,
      userFollowed: selected.id,
    };

    dispatch(unfollowUser(obj)).then(() => {
      addAlert(`Successfully unfollowed ${selected.name}`, dispatch);
    });
  }

  useEffect(() => {
    dispatch(
      setNavLocation({ name: `u/${selectedUser?.name}`, user: selectedUser })
    );
  }, [selectedUser]);

  useEffect(() => {
    const name = params.userid;

    dispatch(setSelectedUser(name));
  }, [window.location.href]);

  console.log(authState);

  return (
    <div className='uf-parent'>
      <div className='uf-top'>
        {selectedUser?.photo ? (
          <img
            src={`url(data:image/png;base64,${selectedUser?.photo}`}
            className='uf-pfp'
          />
        ) : (
          <img className='uf-pfp' src='/assets/defaultpfp.png' />
        )}

        <div
          className='uf-0079'
          onClick={() => (window.location.href = `/user/${selectedUser?.name}`)}
        >
          U/{selectedUser?.name?.toUpperCase()}
        </div>

        <span>/</span>

        <div className='uf-023'>FOLLOWERS</div>
      </div>
      <div className='uf-main'>
        {!selectedUser?.followedBy?.length ? (
          <NoFollowers />
        ) : (
          <div className='uf-left'>
            <div className='uf-e'>
              <div className='uf-col'>
                <div className='uf-f14fw500 uf-22'>Followers</div>
                <div
                  className='uf-f12fw300 col-7c'
                  style={{ paddingRight: "20px", maxWidth: "280px" }}
                >
                  This list is only visible to you. The most recent follows are
                  shown first.
                </div>
              </div>

              <div className='uf-inputp'>
                <input placeholder='Search for a user' className='uf-input' />
                <div className='uf-search'>
                  <SearchSvg />
                </div>
              </div>
            </div>

            <div className='uf-bot'>
              {selectedUser?.followedBy?.map((item, i) => (
                <div
                  className='uf-botch'
                  style={{
                    borderRadius:
                      i === selectedUser?.followedBy?.length - 1 &&
                      "0 0 4px 4px",
                  }}
                >
                  <div className='uf-ro'>
                    {item?.image ? (
                      <img
                        className='uf-chpfp'
                        src={`url(data:image/png;base64,${item?.photo}`}
                      />
                    ) : (
                      <img src='/assets/defaultpfp.png' className='uf-chpfp' />
                    )}

                    <div className='col-1c'>{item?.name}</div>
                  </div>

                  {authState?.following?.map((v) => v.id)?.includes(item.id) ? (
                    <div
                      className='uf-follow uf-unfol'
                      onClick={() => handleUnfollowUser(item)}
                    >
                      Following
                    </div>
                  ) : (
                    <div
                      className='uf-follow'
                      onClick={() => handleFollowUser(item)}
                    >
                      Follow
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <UserRight />
      </div>
    </div>
  );
};

export default UserFollowers;
