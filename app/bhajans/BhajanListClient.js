"use client";
import { useSearchParams } from "next/navigation";
import BhajanList from "../../components/BhajanList";

export default function BhajanListClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const allBhajans = [
    {
      title: "Om Shree Ganeshaya Namaha",
      artist: "Shubha Mudgal",
      duration: "4.56",
      image: "/images/ganesha1.jpg",
      category: "Ganesha",
    },
    {
      title: "Shri Rama Raksha Stotram",
      artist: "Bharat Joshi",
      duration: "3.21",
      image: "/images/ram.jpg",
      category: "Shiva",
    },
    {
      title: "Hanuman Chalisa",
      artist: "Rishikesh Kamerkar",
      duration: "4.89",
      image: "/images/hanuman.jpg",
      category: "Shiva",
    },
  ];

  const filteredBhajans = category
    ? allBhajans.filter((b) => b.category === category)
    : allBhajans;

  return <BhajanList bhajans={filteredBhajans} />;
}
