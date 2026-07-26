import "./globals.css";

export const metadata = {
  title: "مارو | MARO — أزياء وإكسسوارات تُحقق أناقتك",
  description:
    "متجر مارو لبيع الملابس والإكسسوارات في سيدي سليمان، المغرب. توصيل سريع أو استلام من المتجر.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
