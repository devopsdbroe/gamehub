import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

interface UserPageProps {
	params: {
		username: string;
	};
}

const UserPage = async ({ params }: UserPageProps) => {
	const user = await getUserByUsername(params.username);

	if (!user) {
		notFound();
	}

	const isFollowing = await isFollowingUser(user.id);

	return (
		<div className="flex flex-col gap-y-4">
			<p>Username: {user.username}</p>
			<p>user Id: {user.id}</p>
			<p>Is following: {`${isFollowing}`}</p>
			<Actions
				isFollowing={isFollowing}
				userId={user.id}
			/>
		</div>
	);
};

export default UserPage;
