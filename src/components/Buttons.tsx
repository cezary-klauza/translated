import clsx from "clsx";
import { FC, useState } from "react";
import { detectLang } from "../lib";

type ButtonProps = React.ComponentProps<"button"> & {
  className?: string;
};

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={clsx(
        "flex gap-2 relative overflow-hidden items-center bg-blue-3 border-blue-2 border px-6 py-3 rounded-xl font-medium text-lg disabled:bg-gray-2 disabled:border-gray-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

type IconButtonProps = ButtonProps & {
  src: string;
  alt: string;
};

export const IconButton: FC<IconButtonProps> = ({
  className,
  src,
  alt,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "w-10 h-10 rounded-xl flex items-center justify-center border-2 border-gray-2",
        className
      )}
      {...props}
    >
      <img src={src} alt={alt} width={24} height={24} />
    </button>
  );
};

type CopyButtonProps = ButtonProps & {
  text: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ text }) => {
  const [message, setMessage] = useState("");

  const copyHandler = async () => {
    try {
      await navigator.clipboard.writeText(text).then(() => {
        setMessage("Text copied successfully!");
        setInterval(() => setMessage(""), 4000);
      });
    } catch (error) {
      console.error(error);
      setMessage("Cannot copy the text");
    }
  };
  return (
    <div className="relative">
      <p
        className={clsx(
          "absolute bottom-full mb-2 w-fit bg-gray-2 text-nowrap px-4 py-2 text-sm rounded-xl animate-hide",
          message !== "" ? "block" : "hidden"
        )}
      >
        {message}
      </p>
      <IconButton src="/Copy.svg" alt="copy" onClick={copyHandler} />
    </div>
  );
};

type SpeechButtonProps = ButtonProps & {
  text: string;
  lang: string;
};

export const SpeechButton: FC<SpeechButtonProps> = ({ text, lang }) => {
  const [message, setMessage] = useState("");

  const setLang = async () => {
    if (lang === "detect") {
      const detectedLang = await detectLang(text);

      if (detectedLang !== false) {
        return detectedLang;
      }
      return lang;
    }
    return lang;
  };

  const speechHandler = async () => {
    if (!text.trim()) return;

    if (!("speechSynthesis" in window)) {
      setMessage("Speech Synthesis is not supported in this browser.");
      setInterval(() => setMessage(""), 4000);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    await setLang().then((l) => {
      utterance.lang = l;
      window.speechSynthesis.speak(utterance);
    });
  };

  return (
    <div className="relative">
      <p
        className={clsx(
          "absolute bottom-full mb-2 w-fit bg-gray-2 text-nowrap px-4 py-2 text-sm rounded-xl animate-hide",
          message !== "" ? "block" : "hidden"
        )}
      >
        {message}
      </p>
      <IconButton
        src="/sound_max_fill.svg"
        alt="here it"
        onClick={speechHandler}
      />
    </div>
  );
};
