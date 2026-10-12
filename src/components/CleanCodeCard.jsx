import { cleanCodeCard } from '../data/siteContent';
import { useInView } from '../hooks/useInView';

export function CleanCodeCard() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const { title, snippets } = cleanCodeCard;

  // running offset so the reveal staggers continuously across both snippets
  let offset = 0;
  const staggered = snippets.map((snippet) => {
    const start = offset;
    offset += snippet.lines.length;
    return { ...snippet, start };
  });

  return (
    <article ref={ref} className={`clean-code-card${inView ? ' is-active' : ''}`}>
      <p className="card-kicker">{title}</p>

      <div className="code-stack">
        {staggered.map((snippet) => (
          <div key={snippet.language} className="code-snippet">
            <span className="code-language">{snippet.language}</span>

            <pre className="code-block">
              <code>
                {snippet.lines.map((line, lineIndex) => (
                  <span
                    key={lineIndex}
                    className="code-line"
                    style={{ '--line': snippet.start + lineIndex, '--indent': line.indent }}
                  >
                    {line.tokens.map(([type, value], tokenIndex) => (
                      <span key={tokenIndex} className={`code-token code-token--${type}`}>
                        {value}
                      </span>
                    ))}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        ))}
      </div>
    </article>
  );
}
