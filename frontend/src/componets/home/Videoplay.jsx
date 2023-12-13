import { motion, AnimatePresence } from "framer-motion";
import video from "../../assets/playvideo.mp4";

import { useState } from "react";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

function Videoplay() {
  const [showVideo, setShowVideo] = useState(false);

  function watchVideo() {
    return setShowVideo(!showVideo);
  }
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.9 }}
      whileInView={{ scale: 1 }}
      className="bg-cover  w-full flex items-center justify-center relative "
    >
      <video
        muted
        loop
        autoPlay
        playsInline
        width="100%"
        className=" aspect-video  w-full  "
      >
        <source src={video} type="video/webm" className="aspect-video w-full" />
        <source
          allow="autoplay"
          src={video}
          type="video/mp4"
          className="aspect-video w-full"
        />
      </video>
      <div className="overlay absolute grid top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* <p>VIDEO REEL</p> */}
        <motion.img
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9, bounce: 3, x: 10, delay: 100 }}
          whileInView={{ scale: 1 }}
          onClick={() => watchVideo()}
          src={video}
          alt=""
        />
        <h3 className="text-light absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          Unlock the Greatest Value Possible
        </h3>
      </div>
    </motion.div>
  );
}

export default Videoplay;
