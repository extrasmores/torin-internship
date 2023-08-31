import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const Author = () => {
  const { id } = useParams();
  const [authorData, setAuthorData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  async function getAuthorData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthorData(data);
    setLoading(false);
  }
  useEffect(() => {
    getAuthorData();
  }, []);

  function addFollower() {
    let followers = authorData.followers;
    if (isFollowing === false) {
      authorData.followers = followers + 1;
      setIsFollowing(true);
    }
    if (isFollowing === true) {
      authorData.followers = followers - 1;
      setIsFollowing(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton
                            width={150}
                            height={150}
                            borderRadius={99}
                          />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <span className="profile_username">
                                <Skeleton width={200} height={30} />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width={75} height={22} />
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            <Skeleton width={100} height={24} />
                          </div>
                          <Skeleton width={125} height={35} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {Array(8)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                        key={index}
                      >
                        <div className="nft_col">
                          <div className="nft_col_pp">
                            <Skeleton
                              width={50}
                              height={50}
                              borderRadius={99}
                            />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_wrap">
                            <Skeleton width={300} height={441} />
                          </div>
                          <div className="nft_col_info">
                            <h4>
                              <Skeleton width="40%" height={20} />
                            </h4>
                            <span>
                              <Skeleton height={20} width="20%" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </>

               
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorData.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorData.authorName}
                            <span className="profile_username">
                              @{authorData.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorData.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {authorData.followers} followers
                        </div>
                        <Link to="#" onClick={addFollower} className="btn-main">
                          {isFollowing ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {!loading && <AuthorItems user={authorData} />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
