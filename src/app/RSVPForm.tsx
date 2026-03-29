"use client";

import { useState } from "react";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Saved ✅");
        setName("");
        setEmail("");
      } else {
        setStatus(data.error || "Something went wrong");
      }
    } catch (err) {
      setStatus("Error submitting form");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex flex-col gap-4 w-full max-w-sm"
    >
      <input
        className="p-3 rounded-md border border-black"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="p-3 rounded-md border border-black"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="submit"
        className="bg-black text-white p-3 rounded-md hover:opacity-80 transition"
      >
        RSVP
      </button>

      {status && <p className="text-sm text-black">{status}</p>}
    </form>
  );
}