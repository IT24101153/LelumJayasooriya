export function Loader({ hidden, progress }) {
  return (
    <div className={`loader${hidden ? ' hidden' : ''}`} aria-hidden={hidden}>
      <div className="loader-content">
        <span className="loader-logo">Hello, I&apos;m Lelum</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
