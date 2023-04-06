import { ReactNode } from "react";
import Linkify from "react-linkify";

interface ILinkifyTextProps {
  children: ReactNode;
}

export default function LinkifyText({ children }: ILinkifyTextProps) {
  return (
    <Linkify
      componentDecorator={(decoratedHref: string, decoratedText: string, key: number) => (
        <a href={decoratedHref} key={key} target="_blank" rel="noreferrer">
          {decoratedText}
        </a>
      )}
    >
      {children}
    </Linkify>
  );
}
