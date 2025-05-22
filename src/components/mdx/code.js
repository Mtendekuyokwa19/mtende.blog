"use client";
import { CodeBlock } from "react-code-block";

export default function Code({ children, className }) {
  return (
    <CodeBlock code={children} language="C">
      <CodeBlock.Code className="bg-gray-900 p-6  rounded-xl shadow-lg">
        <CodeBlock.LineContent>
          <CodeBlock.Token />
        </CodeBlock.LineContent>
      </CodeBlock.Code>
    </CodeBlock>
  );
}
