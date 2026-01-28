import { motion } from "framer-motion";

type TabOption = {
  id: string;
  label: string;
};

type Props = {
  label?: string;
  options: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
};

export default function ProjectTabs({
  label,
  options,
  activeId,
  onChange,
}: Props) {
  return (
    <div className="p-tabs" aria-label={label ?? "Tabs"}>
      {options.map((opt) => {
        const active = opt.id === activeId;
        return (
          <button
            key={opt.id}
            type="button"
            className={`p-tab ${active ? "is-active" : ""}`}
            onClick={() => onChange(opt.id)}
            aria-pressed={active}
          >
            <span className="p-tab__text">{opt.label}</span>

            {active && (
              <motion.span
                className="p-tab__pill"
                layoutId={`pill-${label ?? "tabs"}`}
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
