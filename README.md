# Placement Mock Test Simulator (TCS iON & Accenture Pattern)

A lightweight, modular, and realistic mock exam simulator built with HTML5, CSS3, and ES6 JavaScript modules. Designed specifically for placement assessments and competitive test practice.

---

## 🚀 Quick Start

The local server is already running! Simply open your browser and navigate to:
```
http://localhost:3000
```

To run or restart the server in the future:
```bash
npm start
# or
node server.js
```

---

## 🌟 Key Features

### 1. Realistic Placement / TCS iON Exam Feel
- **Split Screen Layout**: Question and options on the left; real-time Question Palette & Timer on the right.
- **5-State Question Palette**:
  - 🟢 **Answered** (Green)
  - 🔴 **Not Answered** (Red)
  - ⚪ **Not Visited** (Grey)
  - 🟣 **Marked for Review** (Purple)
  - 🟣🟢 **Answered & Marked for Review** (Purple with Green badge)
- **Countdown Timer**: Real-time digital clock with 5-minute warning alert, 1-minute critical alert, and automatic submission upon expiration.
- **Section Tabs**: Quick switching between sections (e.g. Critical Reasoning, Pseudocode, Verbal Ability) with real-time question counts.
- **Full Navigation Tools**:
  - `Save & Next`
  - `Mark for Review & Next`
  - `Clear Response`
  - `Previous Question`
  - `Question Paper` modal (browse all questions at once with 1-click jump links)
  - `Instructions` modal with marking scheme and shortcut references.
- **Keyboard Shortcuts**:
  - Options: Press `1`, `2`, `3`, `4` or `A`, `B`, `C`, `D`
  - Navigation: `N` or `Right Arrow` for Next, `P` or `Left Arrow` for Previous
  - Review: `M` for Mark for Review, `C` for Clear Response
- **Anti-Cheat & Proctoring Security Guard**:
  - Disables text selection and right-click context menu.
  - Blocks clipboard operations (`Ctrl+C`, `Ctrl+V`, `Ctrl+X`).
  - Intercepts DevTools / Inspect shortcuts (`F12`, `Ctrl+Shift+I`, `Ctrl+U`).
  - Tracks tab-switching and window defocusing with strike counter.
  - Auto-submits on 3 strike violations with audit record in results.
  - Optional one-click full-screen mode.

### 2. Flexible Test Upload & Authoring
- **JSON File Upload**: Drag-and-drop or select any `.json` mock test file.
- **Live JSON Editor & Schema Validator**: View, edit, or test JSON directly in the browser with instant schema validation and one-click template download (`mock_test_template.json`).
- **Quick Text / Markdown Parser**: Paste plain text questions formatted with `Q1: ... A) ... B) ... Answer: B Explanation: ...` to automatically convert them into a full mock test.
- **Preloaded Assessments**:
  - Accenture Placement Assessment (Logical Reasoning, Pseudocode, Verbal Ability)
  - Core CS Fundamentals & DSA Diagnostic Quiz

### 3. Detailed Results & Explanation Breakdown
- **Score Banner & Merit Status**: Total Marks, Net Score, Percentage, and Performance Verdict.
- **Key Metrics Grid**: Total Attempted, Net Accuracy %, Correct Answers, Incorrect Answers (-ve marking applied), and Unattempted.
- **Section-wise Performance Table**: Accurate score and accuracy breakdown per section.
- **Comprehensive Solution Review**:
  - Filter by `All`, `Correct`, `Incorrect`, or `Unattempted`.
  - Shows candidate's selected choice vs the correct key.
  - Dedicated **"Solution & Explanation / Reason"** callout box for every question.
- **Export & Retake**: Export detailed result breakdown as a JSON report or immediately retake the exam.

---

## 📄 JSON Mock Test Schema

The simulator supports both section-based tests and simple flat question lists:

```json
{
  "title": "Accenture Mock Assessment 2026",
  "description": "Comprehensive placement test",
  "durationMinutes": 30,
  "markingScheme": {
    "correct": 1.0,
    "incorrect": -0.25
  },
  "sections": [
    {
      "id": "sec_technical",
      "name": "Technical & Pseudocode",
      "questions": [
        {
          "id": "tech_1",
          "question": "What is the worst-case time complexity of QuickSort when the pivot chosen is always the extreme element?",
          "options": [
            "O(n log n)",
            "O(n^2)",
            "O(n)",
            "O(log n)"
          ],
          "correctAnswer": 1,
          "explanation": "When the pivot is consistently the smallest or largest element, the partition splits into sizes 0 and n-1, leading to O(n^2) recursive depth."
        }
      ]
    }
  ]
}
```

> **Flexible Answer Parsing**: `correctAnswer` can be specified as a 0-based index (`0, 1, 2`), 1-based index (`1, 2, 3`), or letter string (`"A"`, `"B"`, `"C"`, `"D"`). 
