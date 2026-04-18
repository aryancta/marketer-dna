import SettingsClient from "./SettingsClient";

export const metadata = {
  title: "Settings · Marketer DNA",
  description: "Bring your own keys. All storage happens locally in your browser.",
};

export default function SettingsPage() {
  return <SettingsClient />;
}
