export const detectLang = async (text: string) => {
    const headers = new Headers({
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      });

      const body = new URLSearchParams({
        text: text,
        language: "auto",
        enabledOnly: "false",
      });

      const res = await fetch(`https://api.languagetoolplus.com/v2/check`, {
        method: "POST",
        headers: headers,
        body: body.toString(),
      });

      if (res.ok) {
        const result = await res.json();
        return result.language.code.replace(/-.*/, "");
      } else return false;
}