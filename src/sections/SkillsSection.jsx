import {
  FaAndroid,
  FaApple,
  FaAws,
  FaDocker,
  FaGithub,
  FaGitAlt,
  FaJsSquare,
  FaNodeJs,
  FaPython,
  FaReact,
  FaVuejs,
  FaWindows,
  FaWordpress
} from 'react-icons/fa';
import {
  SiC,
  SiCplusplus,
  SiDart,
  SiFlutter,
  SiGooglechrome,
  SiNextdotjs,
  SiPostgresql,
  SiSharp,
  SiSwift,
  SiTailwindcss,
  SiTypescript
} from 'react-icons/si';
import { toolGroups } from '../data/siteContent';

const toolIconMap = {
  react: { Icon: FaReact, color: '#61DAFB' },
  next: { Icon: SiNextdotjs, mono: true },
  vue: { Icon: FaVuejs, color: '#42B883' },
  tailwind: { Icon: SiTailwindcss, color: '#38BDF8' },
  js: { Icon: FaJsSquare, color: '#F7DF1E' },
  typescript: { Icon: SiTypescript, color: '#3178C6' },
  swift: { Icon: SiSwift, color: '#F05138' },
  dart: { Icon: SiDart, color: '#0175C2' },
  csharp: { Icon: SiSharp, color: '#8E5CB0' },
  cpp: { Icon: SiCplusplus, color: '#00599C' },
  c: { Icon: SiC, color: '#5C89C6' },
  node: { Icon: FaNodeJs, color: '#5FA04E' },
  python: { Icon: FaPython, color: '#3776AB' },
  postgres: { Icon: SiPostgresql, color: '#4169E1' },
  wordpress: { Icon: FaWordpress, color: '#21759B' },
  aws: { Icon: FaAws, color: '#FF9900' },
  docker: { Icon: FaDocker, color: '#2496ED' },
  git: { Icon: FaGitAlt, color: '#F05032' },
  github: { Icon: FaGithub, mono: true },
  android: { Icon: FaAndroid, color: '#3DDC84' },
  ios: { Icon: FaApple, mono: true },
  macos: { Icon: FaApple, color: '#A2AAAD' },
  reactnative: { Icon: FaReact, color: '#61DAFB' },
  flutter: { Icon: SiFlutter, color: '#54C5F8' },
  windows: { Icon: FaWindows, color: '#0078D4' },
  chrome: { Icon: SiGooglechrome, color: '#4285F4' }
};

export function SkillsSection() {
  return (
    <section id="skills" className="section grey-bg">
      <div className="container">
        <h2 className="section-title scroll-reveal">Tools &amp; Technologies.</h2>
        <div className="tool-groups">
          {toolGroups.map((group) => (
            <div
              key={group.title}
              className={`tool-group${group.wide ? ' tool-group--wide' : ''} scroll-reveal`}
            >
              <h3 className="tool-group-title">{group.title}</h3>
              <ul className="tool-grid">
                {group.tools.map((tool) => {
                  const entry = toolIconMap[tool.id];
                  if (!entry) return null;
                  const { Icon, color, mono } = entry;
                  return (
                    <li key={tool.id} className="tool-card" title={tool.name}>
                      <span
                        className={`tool-logo${mono ? ' tool-logo--mono' : ''}`}
                        style={mono ? undefined : { color }}
                        aria-hidden="true"
                      >
                        <Icon />
                      </span>
                      <span className="tool-name">{tool.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
