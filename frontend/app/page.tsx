"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Placeholder data for Git Workflow
const gitSteps = [
  { title: "Clone Repository", detail: "git clone <url>" },
  { title: "Create Branch", detail: "git checkout -b feature-name" },
  { title: "Make Changes", detail: "Edit files and save" },
  { title: "Stage Changes", detail: "git add ." },
  { title: "Commit", detail: "git commit -m 'message'" },
  { title: "Push", detail: "git push origin feature-name" },
];

// Placeholder data for Docker Concepts
const dockerItems = [
  { title: "Container", detail: "A standard unit of software" },
  { title: "Image", detail: "A lightweight, standalone, executable package" },
  { title: "Dockerfile", detail: "A text document that contains all the commands to assemble an image" },
  { title: "Docker Compose", detail: "A tool for defining and running multi-container Docker applications" },
];

export default function Home() {
  const [apiData, setApiData] = useState<{
    git?: { detail: string };
    docker?: { detail: string };
  }>({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Using localhost:5000 as requested
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await axios.get(`${apiUrl}/api/demo`);
      setApiData(response.data);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-4xl font-normal text-gray-800">
          Advanced Full-Stack Demo (Next.js + Express)
        </div>

        {/* Git Workflow */}
        <div className="mb-6 rounded-lg bg-white shadow-md">
          <div className="p-4">
            <div className="mb-2 text-xl font-medium text-gray-900">Git Workflow</div>
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {gitSteps.map((step, index) => (
                <div key={index} className="flex items-center py-3">
                  <div className="mr-4 flex-shrink-0">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Docker Concepts */}
        <div className="mb-6 rounded-lg bg-white shadow-md">
          <div className="p-4">
            <div className="mb-2 text-xl font-medium text-gray-900">Docker Concepts</div>
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {dockerItems.map((item, index) => (
                <div key={index} className="py-3">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* API Data from Backend */}
        <div className="rounded-lg bg-white shadow-md">
          <div className="p-4">
            <div className="mb-2 text-xl font-medium text-gray-900">Data from Backend API</div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 border-t border-gray-200">
                <div className="py-3">
                  <div className="text-sm font-medium text-gray-900">Advanced Git</div>
                  <div className="text-xs text-gray-500">{apiData.git?.detail || "No data"}</div>
                </div>
                <div className="py-3">
                  <div className="text-sm font-medium text-gray-900">Advanced Docker</div>
                  <div className="text-xs text-gray-500">{apiData.docker?.detail || "No data"}</div>
                </div>
              </div>
            )}

            {!loading && (
              <div className="mt-4">
                <button
                  onClick={fetchData}
                  className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Refresh Data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
