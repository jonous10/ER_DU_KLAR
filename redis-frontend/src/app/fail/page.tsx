"use client"

import Header from "@/components/ui/header";
import language_sup from "@/language-sup/language_sup.json";
import { useLanguage } from "@/contexts/language-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { lang } = useLanguage();

  return (
    <div>
      <Header />
      <Card className="max-w-5xl p-6 sm:p-8 mx-auto mt-10 text-lg sm:text-2xl">
        <h3 className="text-2xl sm:text-5xl text-center mb-6">
          {language_sup.failed[lang as keyof typeof language_sup.failed]}
        </h3>
        <div className="hidden sm:flex font-bold border-b border-gray-400 pb-2 mb-4">
          <div className="w-1/2 pr-4 text-center">A</div>
          <div className="w-1/2 text-center">B</div>
        </div>

        <div className="flex flex-col gap-6">
          {language_sup.fail_explained.rows.map(
            (row: { A: Record<string, string>; B: Record<string, string> }, index: number) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row border-b border-gray-200 pb-4"
              >
                <div className="sm:hidden font-semibold mb-1">A</div>
                <div className="sm:w-1/2 pr-0 sm:pr-4 mb-4 sm:mb-0">
                  {row.A[lang] ?? row.A["en"]}
                </div>

                <div className="sm:hidden font-semibold mb-1">B</div>
                <div className="sm:w-1/2">
                  {row.B[lang] ?? row.B["en"]}
                </div>
              </div>
            )
          )}
        </div>

        <div className="mt-8 text-center">
          <Button onClick={() => (window.location.href = "/chapter-3")}>
            {language_sup.retry[lang as keyof typeof language_sup.retry]}
          </Button>
        </div>
      </Card>
    </div>
  );
}
