import { Rate } from "antd";

export default function Review ()  {
  return (
    <div className="grid gap-4">
      <div className="grid gap-1.5">
        <h3 className="font-bold text-lg">Amanda</h3>
        <div className="flex items-center gap-0.5">
          <Rate />
        </div>
        <p>
          I loved the concept of this book. The writing was beautiful and I
          found myself reflecting on my own life choices. The idea of being able
          to explore the different paths my life could have taken was both
          intriguing and thought-provoking. I would definitely recommend this
          book to anyone who enjoys contemplating the what-ifs in life.
        </p>
      </div>
    </div>
  );
};
