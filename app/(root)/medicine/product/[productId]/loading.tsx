import React from "react";
import ContentLoader from "react-content-loader";

const ProductLoading = () => {
  return (
    <div className="wrapper">
      <ContentLoader
        speed={2}
        width="100%"
        height="70%"
        viewBox="0 0 1000 600"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="20" y="20" rx="8" ry="8" width="60%" height="40" />
        <rect x="20" y="80" rx="6" ry="6" width="40%" height="20" />
        <rect x="20" y="120" rx="10" ry="10" width="95%" height="200" />
        <rect x="20" y="340" rx="10" ry="10" width="95%" height="200" />
        <rect x="80%" y="120" rx="10" ry="10" width="15%" height="420" />
      </ContentLoader>
    </div>
  );
};

export default ProductLoading;
