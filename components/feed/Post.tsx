import Image from "next/image";
import Comments from "./Comments";
import PostInteraction from "./PostInteraction";

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/noAvatar.png"
            width={40}
            height={40}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">Abdullah</span>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image
            src="https://images.pexels.com/photos/34104581/pexels-photo-34104581.jpeg"
            fill
            className="object-cover rounded-md"
            alt=""
          />
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          obcaecati aliquid tempore enim eveniet tenetur laudantium molestias
          ut? Similique quae et, minus repudiandae iure odio culpa doloribus
          aperiam enim praesentium!
        </p>
      </div>

      {/* interaction */}
      <div className="">
        <PostInteraction />
        <Comments />
      </div>
    </div>
  );
};

export default Post;
