import React from "react"
import ContentLoader from "react-content-loader"

const RatingsSkeleton = (props:any) => (
  <ContentLoader 
    speed={2}
    width={268}
    height={84}
    viewBox="0 0 268 84"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="34" rx="4" ry="4" width="268" height="20" />
  </ContentLoader>
)

export default RatingsSkeleton