import { FormEvent } from "react";
import { useNavigateGuard } from "../hooks";
import { ChangeEvent, useState } from "react";

type Form = { name: string };

export const NavigateGuard = () => {
  const [formData, setFormData] = useState<Form>({ name: "" });
  const [isUnsaved, setIsUnsaved] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsUnsaved(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Form submitted!");
    setIsUnsaved(false);
  };

  useNavigateGuard(isUnsaved, {
    onCancel: (url) => console.log(`Navigation to ${url} was cancelled.`),
    onConfirm: (url) => console.log(`Navigation to ${url} was confirmed.`),
  });

  return (
    <>
      <h2>useNavigateGuard</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>Submit前にページを移動・更新すると警告が出ます。</div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
