import { FC, useState } from "react";
import { Button, CopyButton, IconButton, SpeechButton } from "./Buttons";
import LanguagesList from "./LanguagesList";
import clsx from "clsx";
import { useStore } from "../store";
import { languages } from "../constants";
import { Loader } from "./Loader";
import { detectLang } from "../lib";

type LanguageTypes = React.ComponentProps<"li"> & {
  isActive: boolean;
  name: string;
};

const Language: FC<LanguageTypes> = ({ isActive, name, ...props }) => (
  <li
    className={clsx(
      "font-medium px-4 py-2 cursor-pointer transition-all rounded-xl text-nowrap",
      isActive ? "bg-gray-2 text-white" : "text-white/40"
    )}
    {...props}
  >
    {name}
  </li>
);

const TextArea = () => {
  const { toTranslate, error, setToTranslate } = useStore();
  return (
    <>
      <textarea
        placeholder="Text to translate"
        value={toTranslate}
        onChange={(e) => setToTranslate(e.target.value)}
        className="w-full h-full flex-1 resize-none bg-transparent outline-none text-lg"
      />
      <div className="flex items-center justify-between w-full">
        <p className="text-red-500">{error}</p>
        <p
          className={clsx(
            "text-sm",
            toTranslate.length > 500 ? "text-red-500" : "text-gray-2"
          )}
        >
          {toTranslate.length}/500
        </p>
      </div>
    </>
  );
};

const TranslateButton = () => {
  const { toTranslate, userLang, translationLang, setError, setTranslated } =
    useStore();

  const [loading, setLoading] = useState(false);

  const detectLangHandler = async () => {
    if (userLang === "detect") {
      const lang = await detectLang(toTranslate);

      if (lang !== false) {
        return lang;
      } else {
        setError("Cannot detect language.");
        return;
      }
    } else return userLang;
  };

  const translateHandler = async () => {
    setLoading(true);

    const res = await detectLangHandler().then(async (lang) => {
      if (!lang) {
        return false;
      }
      if (lang === translationLang) {
        setTranslated(toTranslate);
        return false;
      }

      return await fetch(
        `https://api.mymemory.translated.net/get?q=${toTranslate}&langpair=${lang}|${translationLang}`
      );
    });

    if (res === false) {
      setLoading(false);
      return;
    }

    if (res.ok) {
      const result = await res.json();
      setError("");
      setTranslated(result.responseData.translatedText);
      setLoading(false);
    } else {
      setError("Cannot translate the text. Try again later.");
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={toTranslate.length === 0 || toTranslate.length > 500}
      onClick={translateHandler}
    >
      <div
        className={clsx(
          "absolute bg-blue-3 w-full h-full left-0 top-0 items-center justify-center",
          loading ? "flex" : "hidden"
        )}
      >
        <Loader />
      </div>
      <img src="Sort_alfa.svg" alt="translate" height={28} width={28} />
      Translate
    </Button>
  );
};

type TranslationCardProps = {
  translation?: boolean;
};

const TranslateCard: FC<TranslationCardProps> = ({ translation = false }) => {
  const {
    userLang,
    translationLang,
    setTranslationLang,
    setUserLang,
    translated,
    toTranslate,
  } = useStore();
  const lang = translation ? translationLang : userLang;
  const setLang = translation ? setTranslationLang : setUserLang;

  return (
    <div
      className={clsx(
        "w-full rounded-3xl backdrop-blur-lg border-gray-1 border px-8 py-2",
        translation ? "bg-gray-4" : "bg-gray-3"
      )}
    >
      <div className="w-full flex justify-between py-4 border-gray-2 border-b">
        <ul className="flex items-center gap-4">
          {!translation && (
            <Language
              isActive={userLang === "detect"}
              name="Detect Language"
              onClick={() => setUserLang("detect")}
            />
          )}
          {languages.slice(0, 2).map(({ iso, name }) => (
            <Language
              name={name}
              isActive={lang === iso}
              onClick={() => setLang(iso)}
              key={iso}
            />
          ))}

          <li className="font-medium p-2 text-white/40 cursor-pointer">
            <LanguagesList
              lang={lang}
              setLang={(value: string) => setLang(value)}
            />
          </li>
        </ul>
        {translation && (
          <IconButton src="/Horizontal_top_left_main.svg" alt="swap" />
        )}
      </div>
      <div className="mt-8 w-full">
        <div className="w-full min-h-48 max-h-48 flex flex-col items-end">
          {translation ? (
            <p className="text-left text-lg font-medium w-full">{translated}</p>
          ) : (
            <TextArea />
          )}
        </div>
        <div className="w-full flex items-end justify-between py-4 h-20">
          <div className="flex gap-2">
            <SpeechButton
              lang={lang}
              text={translation ? translated : toTranslate}
            />
            <CopyButton text={translation ? translated : toTranslate} />
          </div>
          {!translation && <TranslateButton />}
        </div>
      </div>
    </div>
  );
};

export default TranslateCard;
