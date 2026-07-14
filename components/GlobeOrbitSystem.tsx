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
              <svg
                className="globe-orbit-segment"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                focusable="false"
                aria-hidden="true"
              >
                <ellipse
                  className="globe-orbit-segment-path globe-orbit-segment-main"
                  cx="500"
                  cy="500"
                  rx="499"
                  ry="499"
                  pathLength="100"
                />
                <ellipse
                  className="globe-orbit-segment-path globe-orbit-segment-tail"
                  cx="500"
                  cy="500"
                  rx="499"
                  ry="499"
                  pathLength="100"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
