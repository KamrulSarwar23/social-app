"use client";

import Image from "next/image";

const StoryList = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-2 cursor-pointer relative">
        <Image
          src="/noAvatar.png"
          alt=""
          width={80}
          height={80}
          className="w-20 h-20 rounded-full ring-2 object-cover"
        />

        <form>
          <button className="text-xs bg-blue-500 p-1 rounded-md text-white">
            Send
          </button>
        </form>

        <span className="font-medium">Add a Story</span>

        <div className="absolute text-6xl text-gray-200 top-1">+</div>
      </div>

      {/* STORY */}

      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <Image
          src="/noAvatar.png"
          alt=""
          width={80}
          height={80}
          className="w-20 h-20 rounded-full ring-2"
        />
        <span className="font-medium"></span>
      </div>
    </>
  );
};

export default StoryList;
