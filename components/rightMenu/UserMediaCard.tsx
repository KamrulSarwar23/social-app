import prisma from "@/lib/client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const UserMediaCard = async ({ user }: { user: User }) => {
  try {
    const postsWithMedia = await prisma.post.findMany({
      where: {
        userId: user.id,
        img: {
          not: null,
        },
      },
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
    });

    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
        {/* TOP */}
        <div className="flex justify-between items-center font-medium">
          <span className="text-gray-500">User Media</span>
          <Link
            href={`/users/${user.id}/media`}
            className="text-blue-500 text-xs hover:text-blue-600 transition-colors"
          >
            See all
          </Link>
        </div>

        {/* BOTTOM */}
        {postsWithMedia.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {postsWithMedia.map((post) => (
              <div
                className="relative aspect-square rounded-md overflow-hidden group"
                key={post.id}
              >
                {post.img && (
                  <Image
                    src={post.img}
                    alt={`Media post by ${
                      user.name || user.username || "user"
                    }`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No media found!</p>
            <p className="text-xs mt-1">
              This user hasnt posted any media yet.
            </p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching user media:", error);
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-sm">
        <div className="flex justify-between items-center font-medium mb-4">
          <span className="text-gray-500">User Media</span>
        </div>
        <div className="text-center py-8">
          <p className="text-red-500">Failed to load media</p>
          <p className="text-xs text-gray-500 mt-1">Please try again later</p>
        </div>
      </div>
    );
  }
};

export default UserMediaCard;
