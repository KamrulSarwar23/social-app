import Feed from "@/components/feed/Feed";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  // Await the entire params object first, then access the property
  const { username } = await params;

  const user = await prisma.user.findFirst({
    where: { username: username },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();

  const userData = await currentUser();
  const userId = userData?.id as string;
  if (!userId) return null;

  let isBlocked;

  if (userId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: userId,
      },
    });

    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }

  if (isBlocked) return notFound();

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%] bg-white rounded-lg p-4">
        <div className="flex flex-col gap-6 shadow-md">
          <div className="flex flex-col items-center justify-center border-b border-gray-200">
            <div className="w-full h-64 relative">
              <Image
                src={user?.cover || "/noCover.png"}
                alt=""
                fill
                className="rounded-md object-cover"
              />
              <Image
                src={user?.avatar || "/noAvatar.png"}
                alt=""
                width={128}
                height={128}
                className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover"
              />
            </div>

            <h1 className="mt-20 mb-4 text-2xl font-medium">
              {" "}
              {user?.name && user?.surname
                ? user.name + " " + user.surname
                : user?.username}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium"> {user?._count.posts || 0}</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">
                  {" "}
                  {user?._count.followers || 0}
                </span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">
                  {" "}
                  {user?._count.followings || 0}
                </span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
