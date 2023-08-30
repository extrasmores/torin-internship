import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { NftItem } from "../UI/NftItem";

const AuthorItems = ({ user }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!loading ? (
            <>
              {Array(8).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft_col">
                    <div className="nft_col_pp">
                      <Skeleton width={50} height={50} borderRadius={99} />
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
            user.nftCollection.map((nft, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <NftItem
                  user={user}
                  nft={{
                    ...nft,
                    authorImage: nft.authorImage,
                    authorId: nft.authorId,
                  }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
