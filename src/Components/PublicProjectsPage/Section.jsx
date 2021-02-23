import React from "react";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Tag } from "antd";

const Section = ({ section }) => {
  return (
    <div className="project-section">
      { section.imageUrl && (
        <img
          alt="illustration for the section"
          src={section.imageUrl}
        />
      )}

      { (
        <div className="icons-show-on-hover">
          <ReactMarkdown
            source={section.paragraph}
          />
        </div>
      ) }

      { section.code && (
        <React.Fragment>
          <SyntaxHighlighter
            language={section.language || 'text'}
            style={atomDark}
            wrapLines
          >
            { section.code }
          </SyntaxHighlighter>

          <Tag style={{ float: 'right' }}>
            { section.language || 'Language not specified' }
          </Tag>
        </React.Fragment>
      ) }
    </div>
  );
};

export default Section;
