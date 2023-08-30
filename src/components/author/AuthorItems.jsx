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
          {user.nftCollection.map((nft, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
