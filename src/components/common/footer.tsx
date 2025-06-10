"use client";

import { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import LINKS from "../../lib/utils/links";

export default function Footer() {
  const [mentionLegalOpen, setMentionLegalOpen] = useState(false);

  return (
    <>
      <footer className="mt-10 mb-6 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-3">
          <a href={LINKS.LINKEDIN} target="_blank" rel="noreferrer">
            <FaLinkedin
              style={{
                color: "#0077b5",
              }}
              size={40}
              className="transition-colors duration-200 hover:opacity-80"
            />
          </a>
          <a href={LINKS.GITHUB} target="_blank" rel="noreferrer">
            <FaGithub
              size={40}
              className="transition-colors duration-200 hover:opacity-80"
              style={{
                color: "white",
              }}
            />
          </a>
          <a href={LINKS.INSTAGRAM} target="_blank" rel="noreferrer">
            <FaInstagram
              size={40}
              className="transition-colors duration-200 hover:opacity-80"
              style={{
                color: "#e1306c",
              }}
            />
          </a>
        </div>
        <div className="mt-3 text-sm text-gray-500">
          ericphlpp@proton.me •{" "}
          <button
            className="cursor-pointer hover:underline"
            onClick={() => setMentionLegalOpen(true)}
          >
            Mentions Légales
          </button>
        </div>
      </footer>

      {/* Simple modal for legal mentions */}
      {mentionLegalOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
          onClick={() => setMentionLegalOpen(false)}
        >
          <div
            className="mx-4 max-w-md rounded-lg bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-xl font-bold text-black">
              Mentions Légales
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Éditeur du site :</strong>
                <br />
                Éric Philippe
                <br />
                ericphlpp@proton.me
              </p>
              <p>
                <strong>Hébergement :</strong>
                <br />
                Vercel Inc.
              </p>
              <p>
                <strong>Données personnelles :</strong>
                <br />
                Ce site ne collecte aucune donnée personnelle sans votre
                consentement explicite.
              </p>
            </div>
            <button
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
              onClick={() => setMentionLegalOpen(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
