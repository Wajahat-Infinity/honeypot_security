"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe2, ShieldAlert } from "lucide-react"

// Initialize Mapbox token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

interface GeoJSONFeature {
  type: "Feature"
  properties: {
    id: string
    type: "threat" | "vulnerability"
    severity: "low" | "medium" | "high"
    description: string
    timestamp: string
  }
  geometry: {
    type: "Point"
    coordinates: [number, number]
  }
}

const severityColors = {
  low: "#4caf50",
  medium: "#ff9800",
  high: "#f44336",
}

export function ThreatMaps() {
  const threatMapContainer = useRef<HTMLDivElement>(null)
  const vulnerabilityMapContainer = useRef<HTMLDivElement>(null)
  const [threatMap, setThreatMap] = useState<mapboxgl.Map | null>(null)
  const [vulnerabilityMap, setVulnerabilityMap] = useState<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (threatMapContainer.current && !threatMap) {
      const map = new mapboxgl.Map({
        container: threatMapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [0, 20],
        zoom: 1.5,
        projection: { name: "globe" },
      })

      map.on("load", () => {
        // Add atmosphere and glow effects
        map.setFog({
          color: "rgb(12, 12, 12)",
          "high-color": "rgb(36, 92, 223)",
          "horizon-blend": 0.02,
          "space-color": "rgb(12, 12, 12)",
          "star-intensity": 0.6
        })

        map.addSource("threats", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        })

        map.addLayer({
          id: "threats",
          type: "circle",
          source: "threats",
          paint: {
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0, 4,
              4, 8,
              8, 12
            ],
            "circle-color": ["get", "color"],
            "circle-opacity": 0.8,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#ffffff",
          },
        })

        // Add click event for popups
        map.on("click", "threats", (e) => {
          if (!e.features?.[0]) return

          const feature = e.features[0]
          const coordinates = (feature.geometry as any).coordinates.slice()
          const { type, description, timestamp } = feature.properties || {}

          if (!description || !timestamp) return

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
              <div class="p-2">
                <h3 class="font-bold">${type === "threat" ? "Threat Detected" : "Vulnerability Found"}</h3>
                <p class="text-sm">${description}</p>
                <p class="text-xs text-gray-500 mt-1">${new Date(timestamp).toLocaleString()}</p>
              </div>
            `)
            .addTo(map)
        })

        // Change cursor on hover
        map.on("mouseenter", "threats", () => {
          map.getCanvas().style.cursor = "pointer"
        })
        map.on("mouseleave", "threats", () => {
          map.getCanvas().style.cursor = ""
        })
      })

      setThreatMap(map)
    }

    if (vulnerabilityMapContainer.current && !vulnerabilityMap) {
      const map = new mapboxgl.Map({
        container: vulnerabilityMapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [0, 20],
        zoom: 1.5,
        projection: { name: "globe" },
      })

      map.on("load", () => {
        // Add atmosphere and glow effects
        map.setFog({
          color: "rgb(12, 12, 12)",
          "high-color": "rgb(36, 92, 223)",
          "horizon-blend": 0.02,
          "space-color": "rgb(12, 12, 12)",
          "star-intensity": 0.6
        })

        map.addSource("vulnerabilities", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        })

        map.addLayer({
          id: "vulnerabilities",
          type: "circle",
          source: "vulnerabilities",
          paint: {
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0, 4,
              4, 8,
              8, 12
            ],
            "circle-color": ["get", "color"],
            "circle-opacity": 0.8,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#ffffff",
          },
        })

        // Add click event for popups
        map.on("click", "vulnerabilities", (e) => {
          if (!e.features?.[0]) return

          const feature = e.features[0]
          const coordinates = (feature.geometry as any).coordinates.slice()
          const { type, description, timestamp } = feature.properties || {}

          if (!description || !timestamp) return

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
              <div class="p-2">
                <h3 class="font-bold">${type === "threat" ? "Threat Detected" : "Vulnerability Found"}</h3>
                <p class="text-sm">${description}</p>
                <p class="text-xs text-gray-500 mt-1">${new Date(timestamp).toLocaleString()}</p>
              </div>
            `)
            .addTo(map)
        })

        // Change cursor on hover
        map.on("mouseenter", "vulnerabilities", () => {
          map.getCanvas().style.cursor = "pointer"
        })
        map.on("mouseleave", "vulnerabilities", () => {
          map.getCanvas().style.cursor = ""
        })
      })

      setVulnerabilityMap(map)
    }

    return () => {
      threatMap?.remove()
      vulnerabilityMap?.remove()
    }
  }, [threatMap, vulnerabilityMap])

  // Simulate real-time threat data updates
  useEffect(() => {
    if (!threatMap) return

    const generateThreatData = () => {
      const locations = [
        { lat: 40.7128, lng: -74.0060, desc: "Suspicious network activity in New York" },
        { lat: 51.5074, lng: -0.1278, desc: "Potential DDoS attack in London" },
        { lat: 35.6762, lng: 139.6503, desc: "Malware detected in Tokyo" },
        { lat: 1.3521, lng: 103.8198, desc: "Brute force attempts in Singapore" },
        { lat: -33.8688, lng: 151.2093, desc: "Data breach attempt in Sydney" },
      ]

      return locations.map((loc, index) => ({
        type: "Feature" as const,
        properties: {
          id: `threat-${index}`,
          type: "threat",
          severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
          description: loc.desc,
          timestamp: new Date().toISOString(),
          color: severityColors[["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high"],
        },
        geometry: {
          type: "Point" as const,
          coordinates: [
            loc.lng + (Math.random() - 0.5) * 10,
            loc.lat + (Math.random() - 0.5) * 10,
          ],
        },
      }))
    }

    const interval = setInterval(() => {
      const source = threatMap.getSource("threats") as mapboxgl.GeoJSONSource
      source.setData({
        type: "FeatureCollection",
        features: generateThreatData(),
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [threatMap])

  // Simulate real-time vulnerability data updates
  useEffect(() => {
    if (!vulnerabilityMap) return

    const generateVulnerabilityData = () => {
      const locations = [
        { lat: 48.8566, lng: 2.3522, desc: "Outdated software version in Paris" },
        { lat: 55.7558, lng: 37.6173, desc: "Unpatched system in Moscow" },
        { lat: 22.3193, lng: 114.1694, desc: "Security misconfiguration in Hong Kong" },
        { lat: -22.9068, lng: -43.1729, desc: "Exposed API endpoint in Rio" },
        { lat: 28.6139, lng: 77.2090, desc: "Weak encryption in New Delhi" },
      ]

      return locations.map((loc, index) => ({
        type: "Feature" as const,
        properties: {
          id: `vulnerability-${index}`,
          type: "vulnerability",
          severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
          description: loc.desc,
          timestamp: new Date().toISOString(),
          color: severityColors[["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high"],
        },
        geometry: {
          type: "Point" as const,
          coordinates: [
            loc.lng + (Math.random() - 0.5) * 10,
            loc.lat + (Math.random() - 0.5) * 10,
          ],
        },
      }))
    }

    const interval = setInterval(() => {
      const source = vulnerabilityMap.getSource("vulnerabilities") as mapboxgl.GeoJSONSource
      source.setData({
        type: "FeatureCollection",
        features: generateVulnerabilityData(),
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [vulnerabilityMap])

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Global Security Maps</CardTitle>
        <CardDescription>Real-time threat and vulnerability visualization</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="threats" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="threats" className="flex items-center gap-2">
              <Globe2 className="h-4 w-4" />
              Threat Map
            </TabsTrigger>
            <TabsTrigger value="vulnerabilities" className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              Vulnerability Map
            </TabsTrigger>
          </TabsList>
          <TabsContent value="threats" className="mt-4">
            <div
              ref={threatMapContainer}
              className="aspect-video w-full rounded-lg border bg-muted"
            />
          </TabsContent>
          <TabsContent value="vulnerabilities" className="mt-4">
            <div
              ref={vulnerabilityMapContainer}
              className="aspect-video w-full rounded-lg border bg-muted"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 