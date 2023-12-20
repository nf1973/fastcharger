"use client";

import "@/app/globals.css";
import GetCurrentLocation from "@/components/GetCurrentLocation";
import ChargerCard from "@/components/ChargerCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoLogoGithub, IoMailOutline } from "react-icons/io5";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  const numCards = 5;

  return (
    <>
      <Header />
      <main className="flex flex-col">
        <section className="map">
          <div className="w-full h-3/4 min-h-[400px] bg-indigo-300 flex items-center justify-center font-mono text-sm">
            <p>Map cannot be loaded at this time</p>
          </div>
        </section>
        <section className="list">
          <div className="flex flex-wrap p-2 bg-white justify-start text-gray-700">
            {[...Array(numCards)].map((_, index) => (
              <ChargerCard key={index} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
