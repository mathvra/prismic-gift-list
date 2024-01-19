import { createClient } from "@/prismicio";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <footer>
      <p>
        © {new Date().getFullYear()} {settings.data.site_title}
      </p>
    </footer>
  );
}
