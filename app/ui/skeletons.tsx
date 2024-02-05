import React from "react";
import ContentLoader from "react-content-loader";

// make this component with an array of length four
// and map over it to create a skeleton for each item in the array
//
const BooksSkeleton = (props: any) => (
  <>
    {Array.from({ length: 4 }, (_, index) => (
      // <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      <ContentLoader
        key={index}
        speed={2}
        width={430}
        height={262}
        viewBox="0 0 150 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#c0c0c0"
      >
        <rect x="29" y="14" rx="0" ry="0" width="90" height="103" />
        <rect x="29" y="122" rx="0" ry="0" width="88" height="14" />
        <rect x="29" y="141" rx="0" ry="0" width="62" height="14" />
      </ContentLoader>
      // </div>
    ))}
  </>
);

export default BooksSkeleton;
