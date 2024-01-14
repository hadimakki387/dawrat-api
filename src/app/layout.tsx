import StoreWrapper from "@/core/StoreWrapper";
import "./globals.css";

export const metadata = {
  title: "Dawrat",
  description: "A website to provide study materials for students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreWrapper>{children}</StoreWrapper>
      </body>
    </html>
  );
}
