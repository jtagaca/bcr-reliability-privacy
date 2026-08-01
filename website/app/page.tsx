const repositoryUrl = "https://github.com/jtagaca/bcr-reliability-privacy";
const releaseBase = `${repositoryUrl}/releases/download/preview-1`;

const downloads = {
  module: `${releaseBase}/bcr-improved-preview-module.zip`,
  apk: `${releaseBase}/bcr-improved-preview.apk`,
  checksums: `${releaseBase}/SHA256SUMS.txt`,
};

const changes = [
  {
    number: "01",
    title: "Recording survives logging failures",
    body: "A diagnostic log problem no longer aborts the call recording path.",
  },
  {
    number: "02",
    title: "Retention handles messy filenames",
    body: "Malformed names are skipped safely, and Unix-second or millisecond templates are recognized.",
  },
  {
    number: "03",
    title: "Moves fail honestly",
    body: "A source file that cannot be deleted is reported as a failed move instead of silently duplicating data.",
  },
  {
    number: "04",
    title: "Recordings stay out of backup",
    body: "Android cloud backup and device transfer are disabled for app data and recordings.",
  },
];

export default function Home() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="BCR Reliability and Privacy home">
          <img src="/bcr-icon.svg" alt="" width="40" height="40" />
          <span>
            <strong>BCR</strong>
            <small>Reliability + Privacy</small>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#changes">Changes</a>
          <a href="#install">Install</a>
          <a href={repositoryUrl}>Source</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow-row">
              <span className="eyebrow">Unofficial preview</span>
              <span className="status-dot">Device testing pending</span>
            </div>
            <h1 id="hero-title">
              Call recording that <em>fails safer.</em>
            </h1>
            <p className="hero-lede">
              A focused BCR fork for rooted Android phones, hardened around the moments when
              recordings are most likely to be lost, duplicated, or copied somewhere unexpected.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={downloads.module}>
                Download root module <span aria-hidden="true">↓</span>
              </a>
              <a className="button button-secondary" href={repositoryUrl}>
                View source <span aria-hidden="true">↗</span>
              </a>
            </div>
            <dl className="hero-facts">
              <div>
                <dt>Android</dt>
                <dd>9 and newer</dd>
              </div>
              <div>
                <dt>Access</dt>
                <dd>Root or custom ROM</dd>
              </div>
              <div>
                <dt>Network</dt>
                <dd>No permission</dd>
              </div>
            </dl>
          </div>

          <div className="phone-stage" aria-label="BCR app preview">
            <div className="stage-grid" aria-hidden="true" />
            <figure className="phone phone-dark">
              <img src="/bcr-dark.png" alt="BCR settings in dark mode" />
            </figure>
            <figure className="phone phone-light">
              <img src="/bcr-light.png" alt="BCR settings in light mode" />
            </figure>
            <div className="recording-card">
              <div className="waveform" aria-hidden="true">
                {[12, 22, 34, 18, 42, 27, 48, 32, 20, 38, 16, 28].map((height, index) => (
                  <span key={index} style={{ height }} />
                ))}
              </div>
              <p>Recording path protected</p>
              <small>Failure isolation enabled</small>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Build status">
          <span>Preview 1</span>
          <span>14 automated tests passing</span>
          <span>0 lint errors</span>
          <span>GPL-3.0-only</span>
        </section>

        <section className="changes section" id="changes" aria-labelledby="changes-title">
          <div className="section-heading">
            <p className="kicker">What changed</p>
            <h2 id="changes-title">Small fixes at critical boundaries.</h2>
            <p>
              The recording engine remains recognizably BCR. The changes focus on graceful
              failure, predictable cleanup, and keeping sensitive data local.
            </p>
          </div>
          <div className="change-grid">
            {changes.map((change) => (
              <article className="change-card" key={change.number}>
                <span>{change.number}</span>
                <h3>{change.title}</h3>
                <p>{change.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="privacy-band" aria-labelledby="privacy-title">
          <div className="privacy-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <p className="kicker">Privacy posture</p>
            <h2 id="privacy-title">Your calls should not become cloud cargo.</h2>
          </div>
          <p>
            BCR has no network permission. This fork also opts recordings and app data out of
            Android cloud backup and device-to-device transfer. You still control manual exports.
          </p>
        </section>

        <section className="install section" id="install" aria-labelledby="install-title">
          <div className="section-heading compact">
            <p className="kicker">Preview release</p>
            <h2 id="install-title">Choose the right package.</h2>
            <p>Most rooted phones should use the module. The standalone APK is for advanced workflows.</p>
          </div>

          <div className="download-grid">
            <article className="download-card recommended">
              <div className="card-label">Recommended</div>
              <h3>Magisk / KernelSU module</h3>
              <p>
                Installs BCR as the privileged system app it needs to be. Requires a rooted device
                and a reboot after flashing.
              </p>
              <a className="button button-primary" href={downloads.module}>
                Download module ZIP <span aria-hidden="true">↓</span>
              </a>
            </article>

            <article className="download-card">
              <div className="card-label muted">Advanced</div>
              <h3>Standalone debug APK</h3>
              <p>
                Useful when a root-hiding setup also requires a user-installed copy. It cannot gain
                call-capture privileges by itself on stock Android.
              </p>
              <a className="button button-secondary" href={downloads.apk}>
                Download APK <span aria-hidden="true">↓</span>
              </a>
            </article>
          </div>

          <ol className="steps">
            <li>
              <span>1</span>
              <div>
                <h3>Check compatibility</h3>
                <p>Android 9+, root or compatible custom firmware, and enough local storage.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h3>Remove conflicting BCR builds</h3>
                <p>
                  This preview uses the same package ID but a different certificate from official BCR.
                  Preserve recordings before changing installations.
                </p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h3>Flash, reboot, test</h3>
                <p>
                  Install the module through your root manager, reboot, and make a noncritical test
                  call before relying on it.
                </p>
              </div>
            </li>
          </ol>

          <div className="verification-row">
            <div>
              <strong>Verify before installing</strong>
              <span>Preview assets are debug-signed and accompanied by SHA-256 checksums.</span>
            </div>
            <a href={downloads.checksums}>Open checksums ↗</a>
          </div>
        </section>

        <section className="warning-panel" aria-labelledby="warning-title">
          <p className="kicker">Read before use</p>
          <h2 id="warning-title">This is a preview, not a silent replacement.</h2>
          <div>
            <p>
              <strong>Not device-tested yet.</strong> The code, tests, Android lint, packaging, and
              signature have been verified on the build machine, but no rooted phone was connected
              for a live two-sided call test.
            </p>
            <p>
              <strong>Recording laws vary.</strong> Get every consent required where you and the
              other participants are located. Never use call recording deceptively or unlawfully.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="brand footer-brand">
          <img src="/bcr-icon.svg" alt="" width="34" height="34" />
          <span>
            <strong>BCR Reliability + Privacy</strong>
            <small>Unofficial preview fork</small>
          </span>
        </div>
        <p>
          Based on <a href="https://github.com/chenxiaolong/BCR">BCR by chenxiaolong</a>. Source is
          provided under <a href={`${repositoryUrl}/blob/main/LICENSE`}>GPL-3.0-only</a>.
        </p>
      </footer>
    </div>
  );
}
