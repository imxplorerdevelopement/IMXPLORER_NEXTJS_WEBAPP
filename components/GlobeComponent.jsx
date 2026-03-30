"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => <div className="globe-loading">Loading globe...</div>,
});

const LOCATIONS = [
  {
    id: "india",
    name: "India",
    description: "Luxury experiences, culture-rich escapes",
    lat: 20.5937,
    lng: 78.9629,
    route: "/destinations/india",
  },
  {
    id: "dubai",
    name: "Dubai",
    description: "Luxury, finance hub",
    lat: 25.2048,
    lng: 55.2708,
    route: "/destinations/dubai",
  },
  {
    id: "norway",
    name: "Norway",
    description: "Fjords, northern lights, scenic luxury",
    lat: 60.472,
    lng: 8.4689,
    route: "/destinations/norway",
  },
];

const ARCS = [
  {
    startLat: 20.5937,
    startLng: 78.9629,
    endLat: 25.2048,
    endLng: 55.2708,
  },
  {
    startLat: 20.5937,
    startLng: 78.9629,
    endLat: 60.472,
    endLng: 8.4689,
  },
  {
    startLat: 20.5937,
    startLng: 78.9629,
    endLat: 51.5074,
    endLng: -0.1278,
  },
  {
    startLat: 20.5937,
    startLng: 78.9629,
    endLat: 40.7128,
    endLng: -74.006,
  },
  {
    startLat: 20.5937,
    startLng: 78.9629,
    endLat: 35.6762,
    endLng: 139.6503,
  },
  {
    startLat: 20.5937,
    startLng: 78.9629,
    endLat: -33.8688,
    endLng: 151.2093,
  },
];

const DEFAULT_POV = { lat: 20, lng: 5, altitude: 3.15 };

export default function GlobeComponent() {
  const globeRef = useRef(null);
  const lastHoveredLocationIdRef = useRef(null);
  const hoverMoveTimeoutRef = useRef(null);
  const lightsAddedRef = useRef(false);
  const [countries, setCountries] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [clickedLocationId, setClickedLocationId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const pointsData = useMemo(() => LOCATIONS, []);
  const arcsData = useMemo(() => ARCS, []);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    async function loadCountries() {
      try {
        const [topologyResponse, topojsonClient] = await Promise.all([
          fetch("https://unpkg.com/world-atlas@2/countries-110m.json", {
            signal: abortController.signal,
          }),
          import("topojson-client"),
        ]);

        const topology = await topologyResponse.json();
        const countryFeatures = topojsonClient.feature(
          topology,
          topology.objects.countries,
        ).features;

        if (isMounted) {
          setCountries(countryFeatures);
        }
      } catch (error) {
        if (error?.name !== "AbortError") {
          console.error("Failed to load country polygons:", error);
        }
      }
    }

    loadCountries();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hoverMoveTimeoutRef.current) {
        clearTimeout(hoverMoveTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseMove = useCallback((event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredLocation(null);
    setHoveredCountry(null);

    if (hoverMoveTimeoutRef.current) {
      clearTimeout(hoverMoveTimeoutRef.current);
      hoverMoveTimeoutRef.current = null;
    }

    if (globeRef.current) {
      globeRef.current.pointOfView(DEFAULT_POV, 1400);
    }
  }, []);

  const handlePointHover = useCallback((point) => {
    setHoveredLocation(point || null);

    if (hoverMoveTimeoutRef.current) {
      clearTimeout(hoverMoveTimeoutRef.current);
      hoverMoveTimeoutRef.current = null;
    }

    if (!point) {
      lastHoveredLocationIdRef.current = null;
      return;
    }

    if (lastHoveredLocationIdRef.current === point.id || !globeRef.current) {
      return;
    }

    hoverMoveTimeoutRef.current = setTimeout(() => {
      if (!globeRef.current || lastHoveredLocationIdRef.current === point.id) {
        return;
      }

      lastHoveredLocationIdRef.current = point.id;
      globeRef.current.pointOfView(
        {
          lat: point.lat,
          lng: point.lng,
          altitude: 1.5,
        },
        900,
      );
    }, 130);
  }, []);

  const handlePointClick = useCallback(
    (point) => {
      if (!point || !globeRef.current) {
        return;
      }

      setHoveredLocation(point);
      setClickedLocationId(point.id);
      globeRef.current.pointOfView(
        {
          lat: point.lat,
          lng: point.lng,
          altitude: 1.7,
        },
        850,
      );
    },
    [],
  );

  const handlePolygonHover = useCallback((polygon) => {
    setHoveredCountry(polygon || null);
  }, []);

  const handleGlobeReady = useCallback(() => {
    if (!globeRef.current || lightsAddedRef.current) return;

    const scene = globeRef.current.scene?.();
    if (!scene) return;

    if (!scene.getObjectByName("imx-globe-dir-light")) {
      const directional = new THREE.DirectionalLight(0xffffff, 1.2);
      directional.name = "imx-globe-dir-light";
      directional.position.set(5, 3, 5);
      scene.add(directional);
    }

    if (!scene.getObjectByName("imx-globe-ambient-light")) {
      const ambient = new THREE.AmbientLight(0x404040, 0.6);
      ambient.name = "imx-globe-ambient-light";
      scene.add(ambient);
    }

    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.25;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minDistance = 160;
    controls.maxDistance = 420;

    globeRef.current.pointOfView(DEFAULT_POV, 0);

    lightsAddedRef.current = true;
  }, []);

  const tooltipContent = useMemo(() => {
    if (hoveredLocation) {
      return {
        title: hoveredLocation.name,
        body: hoveredLocation.description,
      };
    }

    if (hoveredCountry) {
      const countryName = hoveredCountry?.properties?.name || "this region";
      return {
        title: hoveredCountry?.properties?.name || "Country",
        body: `Explore routes and insights for ${countryName}.`,
      };
    }

    return null;
  }, [hoveredCountry, hoveredLocation]);

  return (
    <div
      className={`globe-shell ${hoveredLocation ? "hotspot" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="star-layer" />

      <Globe
        ref={globeRef}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere={false}
        onGlobeReady={handleGlobeReady}
        pointsData={pointsData}
        pointsMerge={false}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.045}
        pointRadius={(point) => {
          if (point.id === clickedLocationId) {
            return 1.05;
          }
          return point.id === hoveredLocation?.id ? 0.9 : 0.72;
        }}
        pointColor={(point) =>
          point.id === hoveredLocation?.id || point.id === clickedLocationId
            ? "#f7e7bf"
            : "#d7b270"
        }
        onPointHover={handlePointHover}
        onPointClick={handlePointClick}
        arcsData={arcsData}
        arcColor={() => ["#f1d197", "#c6964f"]}
        arcStroke={0.8}
        arcAltitude={0.2}
        arcDashLength={0.3}
        arcDashGap={0.15}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={1800}
        polygonsData={countries}
        polygonCapColor={(polygon) =>
          polygon === hoveredCountry
            ? "rgba(186, 149, 86, 0.38)"
            : "rgba(62, 62, 62, 0.16)"
        }
        polygonSideColor={() => "rgba(78, 78, 78, 0.12)"}
        polygonStrokeColor={() => "rgba(192, 152, 84, 0.38)"}
        polygonAltitude={(polygon) => (polygon === hoveredCountry ? 0.018 : 0.006)}
        polygonCapCurvatureResolution={4}
        onPolygonHover={handlePolygonHover}
      />

      {tooltipContent && (
        <div
          className="tooltip"
          style={{
            left: mousePosition.x + 18,
            top: mousePosition.y + 18,
          }}
        >
          <div className="tooltip-name">{tooltipContent.title}</div>
          <div className="tooltip-detail">{tooltipContent.body}</div>
        </div>
      )}

      <style jsx>{`
        .globe-shell {
          position: absolute;
          top: 0;
          left: 18%;
          height: 100%;
          width: 100%;
          background: #000;
          isolation: isolate;
          cursor: grab;
        }

        .globe-shell.hotspot {
          cursor: pointer;
        }

        .star-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background: #000;
        }

        .star-layer {
          opacity: 0.3;
          background-image:
            radial-gradient(1px 1px at 20% 30%, #fff, transparent),
            radial-gradient(1px 1px at 70% 60%, #fff, transparent);
          background-size: 340px 340px;
          animation: drift 55s linear infinite;
        }

        .globe-shell :global(canvas) {
          position: relative;
          z-index: 2;
          width: 100% !important;
          height: 100% !important;
          transform: translateX(1%) scale(1.05) !important;
          pointer-events: auto !important;
          touch-action: none;
        }

        .tooltip {
          position: fixed;
          z-index: 999;
          pointer-events: none;
          padding: 10px 12px;
          min-width: 160px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(12, 11, 10, 0.62);
          backdrop-filter: blur(11px);
          -webkit-backdrop-filter: blur(11px);
          box-shadow:
            0 12px 30px rgba(2, 8, 24, 0.45),
            inset 0 0 0 1px rgba(255, 255, 255, 0.08);
        }

        .tooltip-name {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 600;
          color: #f4efe3;
          letter-spacing: 0.02em;
        }

        .tooltip-detail {
          margin-top: 3px;
          font-size: 0.75rem;
          color: rgba(240, 226, 202, 0.78);
        }

        .globe-loading {
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          color: rgba(207, 226, 255, 0.82);
          font-size: 0.9rem;
          letter-spacing: 0.03em;
        }

        @keyframes drift {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-90px, -40px, 0);
          }
        }

        @media (max-width: 1024px) {
          .globe-shell {
            left: 8%;
          }
        }

        @media (max-width: 640px) {
          .globe-shell {
            left: 1%;
          }
        }
      `}</style>
    </div>
  );
}
