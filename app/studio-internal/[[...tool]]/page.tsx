import { projectId } from "@/sanity/env";
import StudioClient from "./StudioClient";

const StudioPage = () => {
  if (!projectId) {
    return (
      <main style={{ padding: "48px 20px" }}>
        <h1>Sanity Studio is not configured.</h1>
        <p>Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.</p>
      </main>
    );
  }

  return <StudioClient />;
};

export default StudioPage;
