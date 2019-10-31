import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "semantic-ui-react";

export default function testBreadcrumb() {
  const sections = [
    { key: "Home", content: "Home", as: Link, to: "/home" },
    { key: "Speakers", content: "Speakers", as: Link, to: "/speakers" }
  ];
  return (
    <div>
      <Breadcrumb icon="right angle" sections={sections} />
    </div>
  );
}
