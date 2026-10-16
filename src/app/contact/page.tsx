import "./contact.css";
import ContactPageEffects from "@/features/contact/ContactPageEffects";
import ContactFormSection from "@/features/contact/ContactFormSection";
import ContactInfoPanel from "@/features/contact/ContactInfoPanel";
import ContactDcMapSection from "@/features/contact/ContactDcMapSection";

export const metadata = {
  title: "Contact — NeoCloudz GPU Cloud",
  description:
    "Get in touch with the NeoCloudz team — sales, support, partnerships, and technical engineering.",
};

export default function ContactPage() {
  return (
    <ContactPageEffects>
      <div className="contact-hero-wrap">
        <div className="contact-bg-media" aria-hidden="true">
          <div className="contact-bg-image" />
          <div className="contact-bg-overlay" />
          <div className="contact-bg-glow" />
        </div>
        <div className="contact-layout">
          <ContactFormSection />
          <ContactInfoPanel />
        </div>
      </div>
      <ContactDcMapSection />
    </ContactPageEffects>
  );
}
