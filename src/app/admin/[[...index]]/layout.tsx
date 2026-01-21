export const metadata = {
  title: "AIC Admin",
  description: "Content management for Australian Islamic Centre",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ height: "100vh", width: "100vw" }}>{children}</div>;
}
