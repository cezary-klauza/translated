import clsx from "clsx";
import { FC, useState } from "react";
import { languages } from "../constants";

type LanguagesListTypes = React.ComponentProps<"li"> & {
  setLang: (value: string) => void;
  lang: string;
};

const LanguagesList: FC<LanguagesListTypes> = ({ setLang, lang }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState({
    iso: "",
    name: "Other",
  });

  const expandHandler = () => setIsExpanded((prev) => !prev);
  const selectHandler = (name: string, iso: string) => {
    setSelected({
      iso,
      name,
    });
    setLang(iso);
    setIsExpanded(false);
  };
  return (
    <li
      className={clsx(
        "font-medium px-4 py-2 cursor-pointer transition-all rounded-xl relative",
        lang === selected.iso ? "bg-gray-2 text-white" : "text-white/40"
      )}
    >
      <button onClick={expandHandler} className="flex items-center gap-1">
        {selected.name}{" "}
        <img
          src="/Expand_down.svg"
          alt={isExpanded ? "collapse" : "expande"}
          width={16}
          height={16}
          className={clsx(isExpanded ? "rotate-180" : "rotate-0")}
        />
      </button>
      <ul
        className={clsx(
          "space-y-2 absolute top-full left-1/2 mt-2 -translate-x-1/2 bg-gray-1 py-2 px-4 rounded-lg",
          isExpanded ? "block" : "hidden"
        )}
      >
        {languages.slice(2).map(({ iso, name }) => (
          <li
            className={clsx(
              "hover:text-white transition-colors",
              selected.name === name ? "text-white" : "text-white/40"
            )}
            key={iso}
            onClick={() => selectHandler(name, iso)}
          >
            {name}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default LanguagesList;
