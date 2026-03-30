"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

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
];

export default function GlobeComponent() {
  const router = useRouter();
  const globeRef = useRef(null);
  const lastHoveredLocationIdRef = useRef(null);
  const hoverMoveTimeoutRef = useRef(null);
  const navigateTimeoutRef = useRef(null);
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
    if (!globeRef.current) {
      return;
    }

    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 160;
    controls.maxDistance = 420;

    globeRef.current.pointOfView(
      { lat: 22, lng: 28, altitude: 2.25 },
      0,
    );
  }, []);

  useEffect(() => {
    return () => {
      if (hoverMoveTimeoutRef.current) {
        clearTimeout(hoverMoveTimeoutRef.current);
      }
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
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
      globeRef.current.pointOfView(
        { lat: 22, lng: 28, altitude: 2.25 },
        1400,
      );
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
      if (!point?.route) {
        return;
      }

      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
      }

      setClickedLocationId(point.id);
      navigateTimeoutRef.current = setTimeout(() => {
        router.push(point.route);
      }, 130);
    },
    [router],
  );

  const handlePolygonHover = useCallback((polygon) => {
    setHoveredCountry(polygon || null);
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
      className="globe-shell"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="space-gradient" />
      <div className="star-layer" />

      <Globe
        ref={globeRef}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere
        atmosphereColor="#3f5f95"
        atmosphereAltitude={0.2}
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.025}
        pointRadius={(point) => {
          if (point.id === clickedLocationId) {
            return 0.72;
          }
          return point.id === hoveredLocation?.id ? 0.58 : 0.42;
        }}
        pointColor={(point) =>
          point.id === hoveredLocation?.id || point.id === clickedLocationId
            ? "#e0efff"
            : "#9bc8ff"
        }
        onPointHover={handlePointHover}
        onPointClick={handlePointClick}
        arcsData={arcsData}
        arcColor={() => ["#84bfff", "#6fa7ff"]}
        arcStroke={0.9}
        arcAltitude={0.2}
        arcDashLength={0.45}
        arcDashGap={0.75}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={2000}
        polygonsData={countries}
        polygonCapColor={(polygon) =>
          polygon === hoveredCountry
            ? "rgba(144, 196, 255, 0.45)"
            : "rgba(45, 71, 108, 0.2)"
        }
        polygonSideColor={() => "rgba(115, 150, 196, 0.08)"}
        polygonStrokeColor={() => "rgba(160, 199, 252, 0.45)"}
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
          position: relative;
          width: 100%;
          height: min(82vh, 780px);
          min-height: 520px;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: linear-gradient(180deg, #050914 0%, #05070d 55%, #03050a 100%);
          box-shadow:
            inset 0 0 80px rgba(104, 152, 255, 0.08),
            0 20px 60px rgba(0, 0, 0, 0.45);
          isolation: isolate;
        }

        .space-gradient,
        .star-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .space-gradient {
          background:
            radial-gradient(circle at 16% 22%, rgba(39, 68, 128, 0.36), transparent 38%),
            radial-gradient(circle at 82% 14%, rgba(24, 49, 108, 0.24), transparent 40%),
            radial-gradient(circle at 53% 86%, rgba(17, 32, 73, 0.3), transparent 48%);
          z-index: 0;
        }

        .star-layer {
          z-index: 1;
          opacity: 0.45;
          background-image:
            radial-gradient(1px 1px at 10% 20%, rgba(255, 255, 255, 0.9), transparent),
            radial-gradient(1px 1px at 30% 70%, rgba(185, 214, 255, 0.9), transparent),
            radial-gradient(1px 1px at 80% 35%, rgba(255, 255, 255, 0.8), transparent),
            radial-gradient(1px 1px at 62% 58%, rgba(180, 200, 255, 0.9), transparent),
            radial-gradient(1px 1px at 90% 82%, rgba(255, 255, 255, 0.9), transparent),
            radial-gradient(1px 1px at 16% 88%, rgba(196, 214, 255, 0.9), transparent),
            radial-gradient(1px 1px at 44% 28%, rgba(255, 255, 255, 0.85), transparent);
          background-size: 340px 340px;
          animation: drift 55s linear infinite;
        }

        .globe-shell :global(canvas) {
          position: relative;
          z-index: 2;
          width: 100% !important;
          height: 100% !important;
        }

        .tooltip {
          position: fixed;
          z-index: 999;
          pointer-events: none;
          padding: 10px 12px;
          min-width: 160px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(10, 18, 32, 0.5);
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
          color: #eaf3ff;
          letter-spacing: 0.02em;
        }

        .tooltip-detail {
          margin-top: 3px;
          font-size: 0.75rem;
          color: rgba(219, 233, 255, 0.78);
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
      `}</style>
    </div>
  );
}
