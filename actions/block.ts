"use server";

import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";

const roomService = new RoomServiceClient(
	process.env.LIVEKIT_API_URL!,
	process.env.LIVEKIT_API_KEY!,
	process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
	const self = await getSelf();

	let blockedUser;

	try {
		const blockedUser = await blockUser(id);
	} catch (error) {
		// This means user is a guest
	}

	try {
		await roomService.removeParticipant(self.id, id);
	} catch (error) {
		// This means user is not in the room
	}

	revalidatePath(`/u/${self.username}/community`);

	return blockedUser;
};

export const onUnblock = async (id: string) => {
	const unblockedUser = await unblockUser(id);

	revalidatePath("/");

	if (unblockedUser) {
		revalidatePath(`/${unblockedUser.blocked.username}`);
	}

	return unblockedUser;
};
