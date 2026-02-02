import { useState } from "react";

export default function UserForm() {
  const [form, setForm] = useState({ name: "", email: "", id: "", password: "" });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    let err = {};
    if (!form.name) err.name = "Required";
    if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Invalid email";
    if (!form.id) err.id = "Required";
    if (!form.password) err.password = "Required";

    setErrors(err);
    if (Object.keys(err).length) return;

    setData(form);
    setForm({ name: "", email: "", id: "", password: "" });
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">User Form</h2>

      <form onSubmit={submit} className="space-y-3">
        {["name", "email", "id"].map(f => (
          <div key={f}>
            <input
              className="border p-2 w-full rounded"
              placeholder={f}
              value={form[f]}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            />
            <p className="text-red-500 text-sm">{errors[f]}</p>
          </div>
        ))}

        <div>
          <input
            type={show ? "text" : "password"}
            placeholder="password"
            className="border p-2 w-full rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="text-blue-600 text-sm mt-1"
          >
            {show ? "Hide" : "Show"} Password
          </button>
          <p className="text-red-500 text-sm">{errors.password}</p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {data && (
        <pre className="bg-gray-100 p-3 mt-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </>
  );
}
