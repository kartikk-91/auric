"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Download,
  Search,
  ArrowUpDown,
  Star,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { feedbacks } from "./data";

const FeedbacksList = () => {
  const [data, setData] = useState(feedbacks);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const sortData = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...data].sort((a, b) => {
      if (a[key as keyof typeof a] < b[key as keyof typeof b])
        return direction === "asc" ? -1 : 1;
      if (a[key as keyof typeof a] > b[key as keyof typeof b])
        return direction === "asc" ? 1 : -1;
      return 0;
    });
    setData(sorted);
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={18}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );

  const sentimentPill = (sentiment: string) => {
    const base =
      "px-3 py-1 text-xs font-medium rounded-full w-fit shadow-sm";
    switch (sentiment) {
      case "Positive":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            {sentiment}
          </span>
        );
      case "Negative":
        return (
          <span className={`${base} bg-red-100 text-red-700`}>
            {sentiment}
          </span>
        );
      default:
        return (
          <span className={`${base} bg-gray-100 text-gray-700`}>
            {sentiment}
          </span>
        );
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  };

  return (
    <div className="w-full min-h-screen p-6 space-y-6">
    
      <div className="flex flex-col sm:flex-row w-full gap-4 sm:justify-between border-b pb-4">
       
        <div className="flex items-center border px-3 rounded-full text-gray-500 w-full sm:w-auto shadow-sm">
          <Search size={18} />
          <Input
            placeholder="Search for keywords"
            className="w-full sm:w-72 border-none shadow-none text-[15px] outline-none focus-visible:ring-0"
          />
        </div>
       
        <div className="flex justify-end">
          <Button
            className="flex gap-2 border-gray-400 cursor-pointer rounded-full"
            variant="outline"
          >
            <Download size={18} /> Export
          </Button>
        </div>
      </div>

     
      <div className="space-y-2">
        <div className="font-semibold text-[16px]">Quick filters</div>
        <div className="flex gap-3 flex-wrap">
          {["Positive", "Negative", "Neutral"].map((item, index) => (
            <div
              key={index}
              className="text-sm text-gray-700 font-medium px-4 py-2 rounded-full cursor-pointer border hover:bg-gray-100 transition shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      
      <div className="overflow-x-auto">
        <Table className="w-full border-separate border-spacing-y-3">
          <TableCaption className="text-gray-500">
            A list of your recent feedbacks.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              {[
                { key: "username", label: "Username" },
                { key: "region", label: "Region" },
                { key: "rating", label: "Rating" },
                { key: "sentiment", label: "Sentiment" },
                { key: "date", label: "Date" },
              ].map((col) => (
                <TableHead
                  key={col.key}
                  className="cursor-pointer select-none text-gray-700 font-semibold text-[15px] px-4 py-3"
                  onClick={() => sortData(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown size={14} className="text-gray-400" />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((feedback, index) => (
              <TableRow
                key={index}
                className="bg-white shadow-sm rounded-xl hover:shadow-md transition cursor-pointer"
              >
                <TableCell className="font-medium px-4 py-5 rounded-l-xl text-[15px]">
                  {feedback.username}
                </TableCell>
                <TableCell className="px-4 py-5 text-[15px]">
                  {feedback.region}
                </TableCell>
                <TableCell className="px-4 py-5">{renderStars(feedback.rating)}</TableCell>
                <TableCell className="px-4 py-5">
                  {sentimentPill(feedback.sentiment)}
                </TableCell>
                <TableCell className="px-4 py-5 text-[14px] rounded-r-xl text-gray-600">
                  {formatDate(feedback.date)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FeedbacksList;
