import ContactForm from "./ContactForm";

export default function ContactFormSection() {
  return (
    <div className="form-panel">
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="form-section-label">Send a Message</div>
        <div className="form-title">
          Let&apos;s talk<span>.</span>
        </div>
        <div className="form-desc">
          Tell us what you&apos;re working on. We&apos;ll match you with the right
          person — sales, support, or engineering.
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
