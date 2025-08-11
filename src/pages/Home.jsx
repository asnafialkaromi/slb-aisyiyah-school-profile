import React from "react";
import { useRef } from "react";
import Hero from "../components/Hero";
import VisionMission from "../components/VisionMission";
import GoogleMapEmbed from "../components/GoogleMapEmbed";
import LatestAnnouncement from "../components/LatestAnnouncement";
import PhotosView from "../components/PhotosView";
import Class from "../components/Class";

export default function Home() {
  const visionMissionRef = useRef(null);

  return (
    <div className="">
      <Hero scrollToRef={visionMissionRef} />
      <VisionMission ref={visionMissionRef} />
      <Class ref={visionMissionRef} />
      <LatestAnnouncement />
      <PhotosView />
      <GoogleMapEmbed />
    </div>
  );
}
