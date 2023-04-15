import React, { useEffect, useState } from "react";
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
import NoPermission from "./NoPermission";

const UserFollowers = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const selectedUser = useSelector((state) => state.selectedUser);
  const authState = useSelector((state) => state.auth);
  const lnState = useSelector((state) => state.lnState);
  const lnnlState = useSelector((state) => state.lnnl);

  const [ready, setReady] = useState(false);

  const [query, setQuery] = useState("");

  const [mapResult, setMapResult] = useState([]);
  const [showResults, setShowResults] = useState(true);

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

  function queryUsers() {
    setShowResults(true);
    const followers = selectedUser?.followedBy;

    const slice = followers.slice().filter((f) => f.name.includes(query));

    setMapResult(slice);
  }

  useEffect(() => {
    dispatch(
      setNavLocation({ name: `u/${selectedUser?.name}`, user: selectedUser })
    );
  }, [selectedUser]);

  useEffect(() => {
    const name = params.userid;

    dispatch(setSelectedUser(name)).then(() => {
      setReady(true);
    });
  }, [window.location.href]);

  useEffect(() => {
    if (!selectedUser?.followedBy?.length) return;

    const followers = selectedUser?.followedBy;

    if (!query.length) {
      setMapResult(followers);
      return;
    }

    queryUsers();
  }, [query, selectedUser]);

  if (!ready) return "loading";

  if (selectedUser?.id !== authState?.id) {
    return <NoPermission />;
  }

  return (
    <div
      className='uf-parent'
      style={{ paddingLeft: (lnState || lnnlState) && "270px" }}
    >
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
                <input
                  placeholder='Search for a user'
                  className='uf-input'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className='uf-search' onClick={() => queryUsers()}>
                  <SearchSvg size={"16px"} fill='white' />
                </div>
              </div>
            </div>

            <div className='uf-bot'>
              {query?.length > 0 && mapResult?.length > 0 && showResults && (
                <div className='uf-botch uf-pla'>
                  <div className='uf-pl'>
                    {mapResult?.length} search results for{" "}
                    <span style={{ color: "#0079d3" }}>'{query}'</span>
                  </div>

                  <div
                    className='uf-f14fw500c00 uf-unfol uf-sh'
                    onClick={() => {
                      setShowResults(false);
                      setMapResult(selectedUser?.followedBy);
                    }}
                  >
                    See all
                  </div>
                </div>
              )}
              {mapResult?.length > 0 ? (
                mapResult?.map((item, i) => (
                  <div
                    className='uf-botch'
                    style={{
                      borderRadius:
                        i === mapResult?.length - 1 && "0 0 4px 4px",
                    }}
                  >
                    <div className='uf-ro'>
                      {item?.image ? (
                        <img
                          className='uf-chpfp'
                          src={`url(data:image/png;base64,${item?.photo}`}
                        />
                      ) : (
                        <img
                          src='/assets/defaultpfp.png'
                          className='uf-chpfp'
                        />
                      )}

                      <div className='col-1c'>{item?.name}</div>
                    </div>

                    {authState?.following
                      ?.map((v) => v.id)
                      ?.includes(item.id) ? (
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
                ))
              ) : (
                <div className='uf-nr'>
                  <SearchSvg size={"30px"} fill='#878a8c' />
                  <div className='uf-qe'>No results for u/{query}</div>
                  <div
                    className='uf-sh uf-f14fw500c00'
                    onClick={() => {
                      setShowResults(false);
                      setMapResult(selectedUser?.followedBy);
                    }}
                  >
                    See all
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <UserRight />
      </div>
    </div>
  );
};

export default UserFollowers;
