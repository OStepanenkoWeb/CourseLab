import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { isTeacher } from "@/lib/teacher";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();
    const isAuthorized = isTeacher(userId);

    if (!userId || !isAuthorized) throw new Error("Unauthorized");
    console.log('handleAuth')
    if (!userId) throw new Error("Unauthorized");
    return { userId };
}

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {
            console.log('onUploadComplete')
        }),
    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "1GB" } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {})
}

export type OurFileRouter = typeof ourFileRouter;