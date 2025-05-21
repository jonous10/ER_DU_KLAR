"use client"

import Header from "@/components/ui/header";
import language_sup from "@/language-sup/language_sup.json"
import { useLanguage } from "@/contexts/language-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { lang } = useLanguage();

  return (
    <div>
      <Header />
      <Card className="max-w-240 p-8 m-auto mt-10 text-1xl sm:text-3xl">
        <h3 className="text-2xl sm:text-5xl">
          {language_sup.failed[lang as keyof typeof language_sup.failed]}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {language_sup.fail_explained.rows.map(
            (row: { A: Record<string, string>; B: Record<string, string> }, index: number) => (
              <div key={index} className="contents">
                <div className="p-2 border-r border-gray-300">
                  {row.A[lang] ?? row.A["en"]}
                </div>
                <div className="p-2">
                  {row.B[lang] ?? row.B["en"]}
                </div>
              </div>
            )
          )}
        </div>

        <Button
          className="max-w-50 m-auto"
          onClick={() => window.location.href = "/chapter-3"}
        >
          {language_sup.retry[lang as keyof typeof language_sup.retry]}
        </Button>
      </Card>
    </div>
  );
}
