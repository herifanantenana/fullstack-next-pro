import { Navbar } from "@/components/web/navbar";

export default function SharedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="border-foreground/30 border">
			<Navbar />
			{children}
		</main>
	);
}
