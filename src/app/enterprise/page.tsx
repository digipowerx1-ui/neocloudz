import "./enterprise.css";
import EnterprisePageEffects from "@/features/enterprise/EnterprisePageEffects";
import EnterpriseHero from "@/features/enterprise/EnterpriseHero";
import EnterpriseTicker from "@/features/enterprise/EnterpriseTicker";
import EnterpriseLogos from "@/features/enterprise/EnterpriseLogos";
import EnterpriseWhy from "@/features/enterprise/EnterpriseWhy";
import EnterpriseArchitecture from "@/features/enterprise/EnterpriseArchitecture";
import EnterpriseSecurity from "@/features/enterprise/EnterpriseSecurity";
import EnterpriseSla from "@/features/enterprise/EnterpriseSla";
import EnterpriseConfigurator from "@/features/enterprise/EnterpriseConfigurator";
import EnterpriseOnboarding from "@/features/enterprise/EnterpriseOnboarding";
import EnterpriseTestimonials from "@/features/enterprise/EnterpriseTestimonials";
import EnterpriseFaq from "@/features/enterprise/EnterpriseFaq";
import EnterpriseCta from "@/features/enterprise/EnterpriseCta";

export const metadata = {
  title: "Enterprise GPU Infrastructure — NeoCloudz",
  description:
    "Dedicated clusters. Private networking. SLA-backed uptime. Built for teams that can't afford downtime.",
};

export default function EnterprisePage() {
  return (
    <EnterprisePageEffects>
      <EnterpriseHero />
      <EnterpriseTicker />
      <EnterpriseLogos />
      <EnterpriseWhy />
      <EnterpriseArchitecture />
      <EnterpriseSecurity />
      <EnterpriseSla />
      <EnterpriseConfigurator />
      <EnterpriseOnboarding />
      <EnterpriseTestimonials />
      <EnterpriseFaq />
      <EnterpriseCta />
    </EnterprisePageEffects>
  );
}
