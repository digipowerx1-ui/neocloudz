import ContactForm from "./ContactForm";

export default function ContactFormSection() {
  return (
    <div className="form-panel" style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "560px", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: "40px" }}>
          <div className="form-section-label" style={{ color: "var(--green)", letterSpacing: "0.15em", fontSize: "11px", fontWeight: 800 }}>COMMUNICATIONS UPLINK</div>
          <div className="form-title" style={{ fontSize: "48px", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: "16px", color: "var(--white)", fontWeight: 800 }}>
            Let&apos;s build <br /> something <span style={{ color: "var(--green)" }}>massive.</span>
          </div>
          <div className="form-desc" style={{ fontSize: "16px", color: "var(--text)", opacity: 0.8, lineHeight: 1.6, maxWidth: "480px" }}>
            Whether you need a dedicated H100 cluster by Tuesday or have a complex technical requirement, our engineering team is ready to accelerate your workload.
          </div>
        </div>
        <ContactForm />
        <div style={{ marginTop: "48px", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(45, 255, 122, 0.15)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
          <img 
            src="/contact-footer.png" 
            alt="AI Infrastructure" 
            style={{ width: "100%", height: "auto", display: "block", filter: "brightness(0.9)" }} 
          />
        </div>
      </div>
    </div>
  );
}
