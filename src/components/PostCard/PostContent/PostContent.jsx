import "./PostContent.css";
import React, { useState, useRef, useEffect } from "react";

const linkify = (text) => {
    if (!text) return text;

    let replaced = text.replace(
        /((https?:\/\/|www\.)[^\s]+)/gi,
        (match) => {
            const url = match.startsWith("http") ? match : `https://${match}`;
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${match}</a>`;
        }
    );

    replaced = replaced.replace(/#([\w\u00C0-\u024F-]+)/g, `<a href="/tag/$1">#$1</a>`);
    replaced = replaced.replace(/@([\w\.\-]+)/g, `<a href="/user/$1">@$1</a>`);

    replaced = replaced.replace(/\n/g, "<br/>");

    return replaced;
};

export default function PostContent({ content, maxLines = 4 }) {
    const [expanded, setExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        const clampHeight = lineHeight * maxLines;
        setIsClamped(el.scrollHeight > clampHeight + 1);
    }, [content, maxLines]);

    return (
        <div className="post-content-wrapper">
            <div
                className={`post-content ${expanded ? "expanded" : "clamped"}`}
                style={{ WebkitLineClamp: expanded ? "unset" : maxLines }}
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: linkify(content) }}
            />
            {!expanded && isClamped && <div className="fade-overlay" />}

            {isClamped && (
                <button className="btn-toggle" onClick={() => setExpanded(!expanded)}>
                    {expanded ? "Thu gọn" : "Xem thêm"}
                </button>
            )}
        </div>
    );
}
