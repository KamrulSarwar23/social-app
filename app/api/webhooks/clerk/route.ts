import prisma from "@/lib/client";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

// Define types for the Clerk webhook event data
interface ClerkWebhookEvent {
  data: {
    id: string;
    username: string;
    first_name: string | null;
    image_url: string | null;
  };
  type: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const evt: ClerkWebhookEvent = (await verifyWebhook(
      req
    )) as ClerkWebhookEvent;

    const { id, username, image_url } = evt.data;
    const eventType = evt.type;

    // console.log("Event:", evt);
    // console.log("Event Type:", evt.type);

    if (eventType === "user.created") {
      try {
        await prisma.user.create({
          data: {
            id: id,
            username: username,
            avatar: image_url || "/noAvatar.png",
            cover: "/noCover.png",
          },
        });
        return NextResponse.json(
          { message: "User has been created!" },
          { status: 200 }
        );
      } catch (err) {
        console.log(err);
        return NextResponse.json(
          { error: "Failed to create the user!" },
          { status: 500 }
        );
      }
    }

    if (eventType === "user.updated") {
      try {
        await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            username: username,
            avatar: image_url || "/noAvatar.png",
          },
        });
        return NextResponse.json(
          { message: "User has been updated!" },
          { status: 200 }
        );
      } catch (err) {
        console.log(err);
        return NextResponse.json(
          { error: "Failed to update the user!" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json(
      { error: "Error verifying webhook" },
      { status: 400 }
    );
  }
}
