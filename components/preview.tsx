"use client";

import React from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
};

export const Preview = ({
  value,
}: PreviewProps) => {
  
  
  return <ReactQuill theme="bubble" value={value} readOnly />
};