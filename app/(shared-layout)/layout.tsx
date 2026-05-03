import { Navbar } from "@/components/web/navbar";

export default function SharedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<Navbar />
			{children}
		</main>
	);
}
