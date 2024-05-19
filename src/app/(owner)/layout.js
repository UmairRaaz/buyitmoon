export const metadata = {
  title: "Buy-It App",
  description: "Developed By Umair Ali",
};
import "../globals.css"
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
