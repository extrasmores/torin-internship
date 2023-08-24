import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.css";

const HotCollections = ({}) => {
  useEffect(() => {
  });

  const [hotCollectionsData, setHotCollectionsData] = useState([]);
  async function fetchHotCollections() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setHotCollectionsData(data);
  }
  fetchHotCollections();

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
         
            {hotCollectionsData.map((user, index) => (
              <div className="col-lg-3 col-d-6 col-sm6 col-xs-12" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={user.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={user.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{user.title}</h4>
                    </Link>
                    <span>ERC-{user.code}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
