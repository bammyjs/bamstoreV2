import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { shortenText } from "../../utils";
import { FeedbackData } from "../../datas/testimonyData";

const Recommendation = () => {
  return (
    <section className="w-full  flex flex-col items-center gap-8">
      <h2 className=" max-w-3xl w-full text-dark text-center font-bold text-2xl md:text-5xl">
        Recommended By
      </h2>
      <Splide
        className="w-full container max-w-7xl "
        aria-label="Feedback"
        options={{
          fixedWidth: "300px",
          perPage: 4,
          gap: "2rem",
          breakpoints: {
            640: {
              perPage: 2,
              gap: "1rem",
              height: "6rem",
            },
            480: {
              perPage: 1,
              gap: ".7rem",
              height: "6rem",
            },
          },
          pagination: false,
          arrows: true,
          focus: "center",
          autoplay: false,
          rewind: true,
          type: "loop",
        }}
      >
        {FeedbackData.map((feed) => {
          return (
            <SplideSlide>
              <Slides feed={feed} key={feed.id} />
            </SplideSlide>
          );
        })}
      </Splide>
    </section>
  );
};

const Slides = (props) => {
  const { image, name, testimony, handle } = props.feed;
  return (
    <div className="max-w-[270px] py-4 px-8 bg-white border-2 shadow-lg rounded-lg my-20">
      <div className="flex justify-center md:justify-end -mt-16">
        <img
          className="w-20 h-20 object-cover rounded-full border-2 border-dark"
          src={image}
        />
      </div>
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold">{name}</h2>
        <p className="mt-2 text-gray-600">{shortenText(testimony, 90)}</p>
      </div>
      <div className="flex justify-end mt-4">
        <Link to={"/"} className="text-sm font-medium text-sec-color">
          {handle}
        </Link>
      </div>
    </div>
  );
};

export default Recommendation;
