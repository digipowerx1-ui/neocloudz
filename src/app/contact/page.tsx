import "./contact.css";
import ContactPageEffects from "@/features/contact/ContactPageEffects";
import ContactFormSection from "@/features/contact/ContactFormSection";
import ContactInfoPanel from "@/features/contact/ContactInfoPanel";
import ContactChannelsSection from "@/features/contact/ContactChannelsSection";
import ContactDcMapSection from "@/features/contact/ContactDcMapSection";

export const metadata = {
  title: "Contact — NeoCloudz GPU Cloud",
  description:
    "Get in touch with the NeoCloudz team — sales, support, partnerships, and technical engineering.",
};

export default function ContactPage() {
  return (
    <ContactPageEffects>
      <div className="contact-layout" style={{ paddingTop: "64px" }}>
        <ContactFormSection />
        <ContactInfoPanel />
      </div>
      <ContactChannelsSection />
      <ContactDcMapSection />
    </ContactPageEffects>
  );
}
