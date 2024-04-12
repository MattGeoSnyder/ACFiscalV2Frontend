"use client";

import {
	useState,
	useContext,
	useEffect,
	useTransition,
} from "react";
import { ACHClaimFormData, ACHCredit } from "@/app/types";
// import { postRoc } from "@/actions/actions";
import { Input } from "@/components/ui/input";
import { AlertDialogDescription } from "@/components/ui/alert-dialog";
import { MultifileInput } from "../ui/multifile-input";
import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "@/app/constants";
import { FileInput } from "@/components/ui/file-input";
import { ClaimedContext } from "@/components/ach/Providers";
import { useRouter } from "next/navigation";
import { useFatch } from "@/lib/hooks/useFatch";
import { formatDollars } from "@/lib/helpers/FormatDollars";

interface ACHClaimFormInterface
	extends React.FormHTMLAttributes<HTMLFormElement> {
	total: number;
	setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ACHClaimForm({
	className,
	total,
	setIsOpen,
	...props
}: ACHClaimFormInterface) {
	const fatch = useFatch();
	async function postRoc(formData: FormData) {
		const files = formData.getAll("roc") as File[] | null;

		if (files === null) {
			const error = "Please upload a file";
			console.log(error);
			return;
		}

		if (!files?.length) {
			const error = "Please upload a file";
			console.log(error);
			return;
		}

		for (let file of files) {
			if (
				file.type !==
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			) {
				const error = "File must be an xlsx file";
				console.log(error);
				return;
			}
		}

		const docs = formData.getAll("docs") as File[] | null;
		if (docs === null) {
			const error = "Please upload a file";
			return;
		}

		for (let file of docs) {
			if (
				file.type !==
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			) {
			}
		}
		const res = await fatch(`${API_BASE_URL}/roc`, {
			method: "POST",
			body: formData,
		});
		return res;
	}

	const initialFormData = {
		roc: null,
		docs: [],
		total: Math.floor(total * 100),
	};

	const { claimed, setClaimed } =
		useContext(ClaimedContext);
	console.log(total);
	console.log(total * 100);

	const mutation = useMutation({
		mutationFn: (formData: FormData) => postRoc(formData),
	});

	const { data, error, isError, isSuccess } = mutation;
	const router = useRouter();

	const [formState, setFormState] =
		useState<ACHClaimFormData>(initialFormData);

	const handleSubmit = (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		const formData = new FormData();
		const creditIds = new FormData(
			e.target as HTMLFormElement
		).getAll("credits");
		formData.append("roc", formState.roc as File);
		for (let doc of formState.docs) {
			formData.append("docs", doc);
		}
		for (let creditId of creditIds) {
			formData.append("credits", creditId);
		}
		formData.append("total", formState.total.toString());

		mutation.mutate(formData);
	};

	useEffect(() => {
		if (isSuccess) {
			if (setIsOpen) {
				setTimeout(() => {
					setIsOpen(false);
					setClaimed({});
					router.refresh();
				}, 2000);
			}
		}
		console.log(isSuccess);
		console.log(error);
		console.log(data);
	}, [isError, data, error, isSuccess, router, setIsOpen]);
	// const handleChange = (
	// 	e: React.ChangeEvent<HTMLInputElement>
	// ) => {
	// 	const name = e.target.name;
	// 	const files = e.target.files;
	// 	const filesArray = files ? Array.from(files) : [];

	// 	if (name === "roc" || name === "docs") {
	// 		setFormState((prevState) => ({
	// 			...prevState,
	// 			[name]: [...prevState[name], ...filesArray],
	// 		}));
	// 	}
	// };

	return (
		<>
			<form
				className='gap-y-1 flex flex-col w-full h-auto'
				id={props.id}
				onSubmit={handleSubmit}>
				{Object.values(claimed).map((credit) => (
					<Input
						key={credit.id}
						type='hidden'
						name={`credits`}
						value={credit.id}
						readOnly
					/>
				))}
				<Input
					type='number'
					className='hidden'
					name='total'
					value={Math.floor(total * 100)}
					readOnly
				/>
				<AlertDialogDescription>
					Upload your roc to claim ACH Credits{" "}
					{"(.xlsx files only)"}
				</AlertDialogDescription>
				<FileInput
					type='file'
					className='w-full min-h-[100px] relative'
					name='roc'
					formState={formState}
					setFormState={setFormState}
				/>
				<AlertDialogDescription>
					Upload any supporting documentation {"(optional)"}
				</AlertDialogDescription>
				<MultifileInput
					className='w-full min-h-[100px] relative'
					name='docs'
					formState={formState}
					setFormState={setFormState}
				/>
				{/* TODO: handle error */}
				{isError && (
					<div className='w-full'>
						{isError && (
							<p className='text-red-500'>
								{"An error occurred"}
							</p>
						)}
					</div>
				)}
				{isSuccess && (
					<div className='w-full'>
						{isSuccess && (
							<p className='text-green-500'>{"Success!"}</p>
						)}
					</div>
				)}
			</form>
		</>
	);
}
