import { useState } from "react";

const formats = [
  { id: "digital", label: "Digital", detail: "A file of this photograph" },
  { id: "print", label: "Print", detail: "A photographic print" },
  { id: "postcard", label: "Postcard", detail: "A printed card of this photograph" },
] as const;

type FormatId = (typeof formats)[number]["id"];

export function PurchaseOptions() {
  const [format, setFormat] = useState<FormatId>("digital");
  const [message, setMessage] = useState("");

  return (
    <form
      className="purchase"
      onSubmit={(event) => {
        event.preventDefault();
        const selected = formats.find((item) => item.id === format);
        setMessage(`${selected?.label ?? "This format"} is not for sale yet. Checkout comes later.`);
      }}
    >
      <fieldset>
        <legend>Buy this photograph</legend>
        <div className="format-list">
          {formats.map((item) => (
            <label key={item.id} className={format === item.id ? "format-option selected" : "format-option"}>
              <input
                type="radio"
                name="format"
                value={item.id}
                checked={format === item.id}
                onChange={() => {
                  setFormat(item.id);
                  setMessage("");
                }}
              />
              <span>
                <span className="format-label">{item.label}</span>
                <span className="format-detail">{item.detail}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <button type="submit">Continue</button>
      <p className="purchase-note" role="status">
        {message || "Prices and checkout come in a later version."}
      </p>
    </form>
  );
}
