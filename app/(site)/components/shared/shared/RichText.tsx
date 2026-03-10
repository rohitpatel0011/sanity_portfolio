/** @format */

import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="relative w-full h-96 my-10">
        <Image
          src={value.asset.url}
          alt="Blog Image"
          fill
          className="object-contain rounded-xl"
        />
      </div>
    ),
    code: ({ value }: any) => (
      <div className="my-6 rounded-lg overflow-hidden glass border border-white/20">
        <div className="bg-zinc-800 px-4 py-2 text-xs text-zinc-400 flex justify-between">
          <span>{value.language || "code"}</span>
        </div>
        <SyntaxHighlighter
          language={value.language || "javascript"}
          style={dracula}
          customStyle={{ margin: 0 }}>
          {value.code}
        </SyntaxHighlighter>
      </div>
    ),
    table: ({ value }: any) => (
      <div className="my-8 overflow-x-auto glass rounded-xl border border-white/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-100/50">
              {value.rows[0].cells.map((cell: string, i: number) => (
                <th key={i} className="p-4 font-bold border-b border-zinc-200">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.rows.slice(1).map((row: any, i: number) => (
              <tr key={i} className="hover:bg-white/30">
                {row.cells.map((cell: string, j: number) => (
                  <td key={j} className="p-4 border-b border-zinc-100">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-black mt-12 mb-6 tracking-tighter">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-10 mb-4 border-b border-zinc-200 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-8 mb-2">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[var(--primary)] pl-6 py-2 my-6 italic bg-zinc-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc ml-10 space-y-2 my-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal ml-10 space-y-2 my-4">{children}</ol>
    ),
  },
};
