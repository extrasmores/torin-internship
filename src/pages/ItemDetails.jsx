import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nftInfo, setNftInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  async function itemDetailsData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    setNftInfo(data);
    setLoading(false);
  }
  useEffect(() => {
    itemDetailsData();
  }, [nftId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {!loading ? (
                
                <>
              <div className="col-md-6 text-center">
                <img
                  src={nftInfo.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {nftInfo.title} #{nftInfo.tag}
                  </h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {nftInfo.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {nftInfo.likes}
                    </div>
                  </div>
                  <p>{nftInfo.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftInfo.ownerId}`}>
                            <img
                              className="lazy"
                              src={nftInfo.ownerImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftInfo.ownerId}`}>
                            {nftInfo.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${nftInfo.creatorId}`}>
                            <img
                              className="lazy"
                              src={nftInfo.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${nftInfo.creatorId}`}>
                            {nftInfo.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{nftInfo.price}</span>
                    </div>
                  </div>
                </div>
              </div>
              </>


              ) : (

              <>
                  <div className="col-md-6 text-center">
                    <Skeleton width={550} height={450} />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        <Skeleton width={400} height={40} />
                      </h2>
                      <div className="item_info_counts">
                        <Skeleton count={2} width={80} height={26} />
                      </div>
                      <>
                        <Skeleton width={525} height={100} />
                      </>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width={50}
                                height={50}
                                borderRadius={99}
                              />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton width={65} height={21} />
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width={50}
                                height={50}
                                borderRadius={99}
                              />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton width={65} height={21}  />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>
                          <Skeleton width={50} height={15} />
                        </h6>
                        <div className="nft-item-price">
                          <span>
                            <Skeleton width={65} height={24} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
