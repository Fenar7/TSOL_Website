export default function Home() {
  return (
    <div className="min-h-screen bg-white p-10 font-neue-haas text-black">
      <h1 className="mb-4 text-4xl font-bold">Temp Style Check</h1>
      <p className="mb-6 text-txt-grey">
        If this looks correct, Tailwind color tokens and custom font are working.
      </p>

      <div className="mb-4 rounded-lg border border-stroke-grey p-4">
        <p className="mb-2 font-semibold">Tailwind token usage</p>
        <p className="text-txt-grey">
          This text uses <code>text-txt-grey</code> and the border uses{" "}
          <code>border-stroke-grey</code>.
        </p>
      </div>

      <div
        className="rounded-lg p-4"
        style={{
          backgroundColor: "var(--black)",
          color: "var(--white)",
          border: "1px solid var(--stroke-grey)",
        }}
      >
        CSS variable check: <code>var(--black)</code>, <code>var(--white)</code>
        , <code>var(--stroke-grey)</code>
      </div>
    </div>
  );
}
