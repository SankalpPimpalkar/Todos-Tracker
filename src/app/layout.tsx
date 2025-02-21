import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Slide, ToastContainer } from "react-toastify";

export const metadata: Metadata = {
	title: "Next Todo",
	description: "Powered by Appwrite and Nextjs",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<link rel="icon" href="/image.png" sizes="any" />
			<body className={`antialiased`}>
				<ToastContainer
					position="top-center"
					autoClose={1000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
					transition={Slide}
				/>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
