"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const SENTENCES = [
  "Let's get started",
  "Let's get in touch",
  "Let's collaborate",
  "Let's get going",
  "Let's do this",
];

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [selectedSentence, setSelectedSentence] = useState(SENTENCES[0]);
  const [emailSent, setEmailSent] = useState<boolean | null>(null);

  // Set random sentence only on client side after hydration
  useEffect(() => {
    setSelectedSentence(
      SENTENCES[Math.floor(Math.random() * SENTENCES.length)],
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // For now, just simulate success - you can integrate emailjs later
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmailSent(true);
      console.log("Form data:", data);
    } catch (error) {
      setEmailSent(false);
      console.error("Form submission failed:", error);
    }
  };

  return (
    <div className="w-full max-w-lg lg:w-1/2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl bg-[#0d0d0e] p-5 shadow-lg"
      >
        <div className="relative mb-4">
          <h1
            className="font-feijoa bg-gradient-to-r from-[#ccf0ff] via-[#ffd7ff] to-[#f1b3cf] bg-clip-text text-center text-3xl font-bold text-transparent lg:text-6xl"
            style={{
              height: "8vh",
            }}
          >
            {selectedSentence}
          </h1>

          <p
            className="text-center text-sm text-gray-500"
            style={{ fontWeight: "normal" }}
          >
            Vous avez un projet ? Une idée ? Un besoin ? Contactez-moi !
          </p>

          {emailSent === true && (
            <div className="text-center text-sm text-green-500">
              Votre message a bien été envoyé !
            </div>
          )}
          {emailSent === false && (
            <div className="text-center text-sm text-red-500">
              Une erreur est survenue, veuillez réessayer.
            </div>
          )}
        </div>

        <div className="relative mb-4">
          <label
            htmlFor="name"
            className="absolute top-0 left-0 z-10 bg-gradient-to-r from-[#ccf0ff] via-[#ffd7ff] to-[#f1b3cf] bg-clip-text text-base font-bold text-transparent"
            style={{ paddingLeft: "10px" }}
          >
            Nom
          </label>
          <input
            id="name"
            {...register("name", { required: true })}
            className="focus:shadow-outline w-full appearance-none rounded border-2 bg-black px-3 py-5 text-lg leading-tight text-white shadow focus:outline-none"
            style={{
              border: "1px solid #3f3f46",
              paddingLeft: "10px",
            }}
          />
          {errors.name && (
            <span className="text-xs text-red-500 italic">
              Ce champ est requis
            </span>
          )}
        </div>

        <div className="relative mb-4">
          <label
            htmlFor="email"
            className="absolute top-0 left-0 z-10 bg-gradient-to-r from-[#ccf0ff] via-[#ffd7ff] to-[#f1b3cf] bg-clip-text text-base font-bold text-transparent"
            style={{ paddingLeft: "10px" }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className="focus:shadow-outline w-full appearance-none rounded border-2 bg-black px-3 py-5 text-lg leading-tight text-white shadow focus:outline-none"
            style={{
              border: "1px solid #3f3f46",
              paddingLeft: "10px",
            }}
          />
          {errors.email && (
            <span className="text-xs text-red-500 italic">
              Ce champ est requis
            </span>
          )}
        </div>

        <div className="relative mb-4">
          <label
            htmlFor="message"
            className="absolute top-0 left-0 z-10 bg-gradient-to-r from-[#ccf0ff] via-[#ffd7ff] to-[#f1b3cf] bg-clip-text text-base font-bold text-transparent"
            style={{ paddingLeft: "10px" }}
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            {...register("message", { required: true })}
            className="focus:shadow-outline w-full resize-none appearance-none rounded border-2 bg-black px-3 py-5 text-lg leading-tight text-white shadow focus:outline-none"
            style={{
              border: "1px solid #3f3f46",
              paddingLeft: "10px",
            }}
          />
          {errors.message && (
            <span className="text-xs text-red-500 italic">
              Ce champ est requis
            </span>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none"
            onClick={() => {
              setSelectedSentence(
                SENTENCES[Math.floor(Math.random() * SENTENCES.length)],
              );
            }}
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}
