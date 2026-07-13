export default function GlobeOrbitSystem() {
  return (
    <div
      className="globe-orbit-system"
      data-mode="hidden"
      data-ring-count="0"
      aria-hidden="true"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <div className={`globe-orbit-ring globe-orbit-ring-${index + 1}`} key={index}>
          <div className="globe-orbit-float">
            <div className="globe-orbit-body">
              <span className="globe-orbit-segment" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
