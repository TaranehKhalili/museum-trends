import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Museum Visitor Trends",
	description: "Data visualization dashboard for museum visitor statistics",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}
