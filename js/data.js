/**
 * Dynamic Mock Test Loader
 * Automatically discovers any newly added JSON mock test in sample_test_accenture/
 * - On Localhost: Automatically queries /api/tests (reads folder directly)
 * - On GitHub Pages: Automatically queries the GitHub repository contents API
 * - Fallback: Uses sample_test_accenture/manifest.json or bundled defaults
 */

import { parseTestJson } from './parser.js';

// Default bundled tests (ensures instant load without waiting for network)
export let SAMPLE_TESTS = [
  {
    id: "accenture-test-1",
    title: "Accenture Technical Mock Test 2: Scenario-Based (Cloud, Cloud Security, Networking)",
    description: "45 scenario-based MCQs across three sections (15 each). Marking: +1 for each correct answer, no negative marking. Duration: 45 minutes.",
    durationMinutes: 45,
    markingScheme: { correct: 1, incorrect: 0 },
    sections: []
  }
];

export const SAMPLE_TEMPLATE_JSON = {
  title: "Custom Mock Test Title",
  description: "Test description",
  durationMinutes: 45,
  markingScheme: { correct: 1, incorrect: 0 },
  sections: [
    {
      id: "sec_1",
      name: "Technical Section",
      questions: [
        {
          id: "q_1",
          question: "Sample question prompt?",
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: 0,
          explanation: "Reason for correct answer."
        }
      ]
    }
  ]
};

/**
 * Dynamically queries available tests from folder or GitHub repository
 */
export async function loadDynamicTests() {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  let fileList = [];

  // Step 1: Detect test filenames
  if (isLocal) {
    try {
      const res = await fetch('/api/tests');
      if (res.ok) {
        fileList = await res.json();
      }
    } catch (e) {
      console.warn("Local /api/tests unavailable, trying fallback manifest", e);
    }
  }

  // If not local or local endpoint failed, try GitHub Repository Contents API
  if (!fileList || fileList.length === 0) {
    try {
      const ghUrl = 'https://api.github.com/repos/anishraj-coder/mock-test-simulation/contents/sample_test_accenture';
      const ghRes = await fetch(ghUrl, { headers: { 'Accept': 'application/vnd.github.v3+json' } });
      if (ghRes.ok) {
        const items = await ghRes.json();
        if (Array.isArray(items)) {
          fileList = items
            .filter(item => item.name.endsWith('.json') && item.name !== 'manifest.json')
            .map(item => item.name);
        }
      }
    } catch (err) {
      console.warn("GitHub API check failed, falling back to manifest.json:", err);
    }
  }

  // Step 2: Fallback to manifest.json
  if (!fileList || fileList.length === 0) {
    try {
      const mRes = await fetch('./sample_test_accenture/manifest.json');
      if (mRes.ok) {
        fileList = await mRes.json();
      }
    } catch (err) {
      console.warn("Static manifest.json unavailable:", err);
    }
  }

  // Fallback defaults if all network queries fail
  if (!fileList || fileList.length === 0) {
    fileList = [
      "accenture_mock_test_2_scenario_based.json",
      "accenture_mock_test_3_full_technical.json",
      "accenture_mock_test_cloud_security_networking.json",
      "accenture_ms_office_mock_test.json"
    ];
  }

  // Step 3: Fetch and parse each test JSON file
  const loadedTests = [];
  for (let i = 0; i < fileList.length; i++) {
    const filename = fileList[i];
    try {
      const fileRes = await fetch(`./sample_test_accenture/${filename}?v=${Date.now()}`);
      if (fileRes.ok) {
        const rawJson = await fileRes.json();
        const parsed = parseTestJson(rawJson);
        parsed.id = `test_${filename.replace('.json', '')}`;
        parsed.fileName = filename;
        loadedTests.push(parsed);
      }
    } catch (err) {
      console.error(`Failed loading test file ${filename}:`, err);
    }
  }

  if (loadedTests.length > 0) {
    SAMPLE_TESTS = loadedTests;
  }

  return SAMPLE_TESTS;
}
