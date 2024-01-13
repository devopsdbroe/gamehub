"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ElementRef } from "react";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { updateUser } from "@/actions/user";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface BioModalProps {
	initalValue: string | null;
}

export const BioModal = ({ initalValue }: BioModalProps) => {
	const closeRef = useRef<ElementRef<"button">>(null);

	const [isPending, startTransition] = useTransition();
	const [value, setValue] = useState(initalValue || "");

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		startTransition(() => {
			updateUser({ bio: value })
				.then(() => {
					toast.success("User bio updated");
					closeRef?.current?.click();
				})
				.catch(() => toast.error("Something went wrong"));
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="link"
					size="sm"
					className="ml-auto"
				>
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit the user bio</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={onSubmit}
					className="space-y-4"
				>
					<Textarea
						placeholder="User bio"
						onChange={(e) => setValue(e.target.value)}
						value={value}
						disabled={isPending}
						className="resize-none"
					/>
					<div className="flex justify-between">
						<DialogClose
							ref={closeRef}
							asChild
						>
							<Button
								type="button"
								variant="ghost"
							>
								Cancel
							</Button>
						</DialogClose>
						<Button
							type="submit"
							variant="primary"
							disabled={isPending}
						>
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
