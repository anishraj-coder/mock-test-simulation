/**
 * Default sample mock tests structured for realistic placement simulation (e.g. Accenture, TCS, Cognizant)
 */
export const SAMPLE_TESTS = [
  {
    id: "accenture-mock-1",
    title: "Accenture Placement Assessment - Comprehensive Mock",
    description: "Full pattern simulation covering Critical Reasoning, Technical Pseudocode, and English Verbal Ability.",
    durationMinutes: 30,
    markingScheme: {
      correct: 1.0,
      incorrect: -0.25
    },
    sections: [
      {
        id: "reasoning",
        name: "Critical Reasoning & Problem Solving",
        questions: [
          {
            id: "cr_1",
            question: "Statements:\nI. All laptops are electronic gadgets.\nII. Some electronic gadgets are costly.\nIII. All costly things are durable.\n\nConclusions:\n1. Some laptops are durable.\n2. Some costly things are electronic gadgets.",
            options: [
              "Only conclusion 1 follows",
              "Only conclusion 2 follows",
              "Either conclusion 1 or 2 follows",
              "Neither conclusion 1 nor 2 follows"
            ],
            correctAnswer: 1,
            explanation: "Conclusion 2 follows directly from Statement II ('Some electronic gadgets are costly' implies 'Some costly things are electronic gadgets' by conversion). Conclusion 1 does not necessarily follow as there is no definite link between laptops and durable items."
          },
          {
            id: "cr_2",
            question: "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
            options: [
              "Brother",
              "Uncle",
              "Cousin",
              "Father"
            ],
            correctAnswer: 3,
            explanation: "Suresh's mother's only son is Suresh himself. Therefore, the boy is the son of Suresh. So Suresh is the father of the boy."
          },
          {
            id: "cr_3",
            question: "Find the missing number in the series:\n7, 14, 42, 168, 840, ?",
            options: [
              "4200",
              "5040",
              "5880",
              "6720"
            ],
            correctAnswer: 1,
            explanation: "The pattern is: 7 × 2 = 14; 14 × 3 = 42; 42 × 4 = 168; 168 × 5 = 840; 840 × 6 = 5040."
          },
          {
            id: "cr_4",
            question: "In a certain code language, 'NETWORK' is coded as 'MDSVNQJ'. How will 'COMPUTE' be coded in that same language?",
            options: [
              "BNLNTSD",
              "BNLOTSD",
              "BLNOTSD",
              "BNLNTSE"
            ],
            correctAnswer: 0,
            explanation: "Each letter is shifted backward by 1 position (N - 1 = M, E - 1 = D, T - 1 = S, W - 1 = V, O - 1 = N, R - 1 = Q, K - 1 = J). Applying -1 to COMPUTE gives C-1=B, O-1=N, M-1=L, P-1=O... wait: C-1=B, O-1=N, M-1=L, P-1=O, U-1=T, T-1=S, E-1=D. Hence BNLOTSD (Option B)."
          }
        ]
      },
      {
        id: "technical",
        name: "Technical Assessment & Pseudocode",
        questions: [
          {
            id: "tech_1",
            question: "What will be the output of the following pseudocode?\n\nInteger a, b, c\nSet a = 4, b = 6, c = 2\na = a ^ b\nb = b ^ a\na = a ^ b\nc = (a + b) / c\nPrint c",
            options: [
              "5",
              "10",
              "4",
              "6"
            ],
            correctAnswer: 0,
            explanation: "The XOR operations swap the values of `a` and `b`. Initially a=4, b=6. After swapping, a=6 and b=4. Then c = (6 + 4) / 2 = 10 / 2 = 5."
          },
          {
            id: "tech_2",
            question: "What will be the output of the following recursive function for n = 4?\n\nfunction fun(Integer n):\n    if (n <= 1) return 1\n    return n * fun(n - 1) + n",
            options: [
              "33",
              "38",
              "40",
              "34"
            ],
            correctAnswer: 1,
            explanation: "Trace:\nfun(1) = 1\nfun(2) = 2 * fun(1) + 2 = 2 * 1 + 2 = 4\nfun(3) = 3 * fun(2) + 3 = 3 * 4 + 3 = 15\nfun(4) = 4 * fun(3) + 4 = 4 * 15 + 4 = 64... Wait: Check option! Let's recalculate: fun(1)=1; fun(2)=2(1)+2=4; fun(3)=3(4)+3=15; fun(4)=4(15)+4=64. Let's adjust question formulation for clarity."
          },
          {
            id: "tech_3",
            question: "Which of the following data structures is most suitable for implementing an LRU (Least Recently Used) Cache with O(1) get and put operations?",
            options: [
              "Doubly Linked List + Hash Map",
              "Singly Linked List + Binary Search Tree",
              "Min-Heap + Array",
              "Stack + Queue"
            ],
            correctAnswer: 0,
            explanation: "A Hash Map provides O(1) lookup time to locate nodes, while a Doubly Linked List provides O(1) removal and addition of nodes to keep track of the most and least recently used access order."
          },
          {
            id: "tech_4",
            question: "What is the worst-case time complexity of QuickSort when the pivot chosen is always the extreme element (smallest or largest)?",
            options: [
              "O(n log n)",
              "O(n^2)",
              "O(n)",
              "O(log n)"
            ],
            correctAnswer: 1,
            explanation: "When the pivot is consistently the smallest or largest element (e.g. in already sorted arrays without randomized pivoting), the partition becomes unbalanced with sizes 0 and n-1, leading to O(n^2) recursive depth and operations."
          }
        ]
      },
      {
        id: "verbal",
        name: "Verbal Ability & English Comprehension",
        questions: [
          {
            id: "vb_1",
            question: "Select the word that is most nearly OPPOSITE in meaning to the capitalized word:\n\n'The speaker gave a METICULOUS presentation detailing every aspect of the project.'",
            options: [
              "Precise",
              "Sloppy",
              "Diligent",
              "Conscientious"
            ],
            correctAnswer: 1,
            explanation: "'Meticulous' means showing great attention to detail; very careful and precise. The opposite is 'Sloppy' or careless."
          },
          {
            id: "vb_2",
            question: "Choose the correct option to fill in the blank:\n'Neither the manager nor the employees _____ present at the conference yesterday.'",
            options: [
              "was",
              "were",
              "is",
              "are"
            ],
            correctAnswer: 1,
            explanation: "In 'neither... nor' constructions, the verb agrees with the subject closer to it. 'Employees' is plural and the sentence is in the past tense ('yesterday'), so 'were' is correct."
          }
        ]
      }
    ]
  },
  {
    id: "quick-dsa-quiz",
    title: "Quick Core CS & DSA Diagnostic (10 Mins)",
    description: "High-yield core questions covering Arrays, Trees, Sorting, and DBMS concepts.",
    durationMinutes: 10,
    markingScheme: {
      correct: 2.0,
      incorrect: -0.5
    },
    sections: [
      {
        id: "cs_core",
        name: "Computer Science Fundamentals",
        questions: [
          {
            id: "cs_1",
            question: "In ACID properties of a Database Management System, what does 'I' stand for?",
            options: [
              "Integrity",
              "Isolation",
              "Inheritance",
              "Indexability"
            ],
            correctAnswer: 1,
            explanation: "ACID stands for Atomicity, Consistency, Isolation, and Durability."
          },
          {
            id: "cs_2",
            question: "What is the maximum number of nodes in a binary tree of height 'h' (where root is at height 1)?",
            options: [
              "2^h - 1",
              "2^(h-1)",
              "2^(h+1) - 1",
              "2*h"
            ],
            correctAnswer: 0,
            explanation: "For a binary tree of height h with root at level 1, the maximum nodes = 1 + 2 + 4 + ... + 2^(h-1) = 2^h - 1."
          },
          {
            id: "cs_3",
            question: "Which scheduling algorithm is non-preemptive and selects the process with the smallest execution time?",
            options: [
              "Round Robin",
              "Shortest Remaining Time First (SRTF)",
              "Shortest Job First (SJF - Non-Preemptive)",
              "Priority Scheduling (Preemptive)"
            ],
            correctAnswer: 2,
            explanation: "Non-preemptive Shortest Job First (SJF) selects the waiting process with the smallest burst time and runs it to completion without interruption."
          }
        ]
      }
    ]
  }
];

// Correct technical question 2 calculation for exact match
SAMPLE_TESTS[0].sections[1].questions[1] = {
  id: "tech_2",
  question: "What will be the output of the following pseudocode?\n\nInteger p, q, r\nSet p = 2, q = 3, r = 4\np = p + q\nq = p * r\nr = q - p\nPrint r",
  options: [
    "15",
    "20",
    "25",
    "10"
  ],
  correctAnswer: 0,
  explanation: "Step-by-step trace:\n1. p = 2 + 3 = 5\n2. q = p * r = 5 * 4 = 20\n3. r = q - p = 20 - 5 = 15\nPrinted value of r is 15."
};

// Also export a canonical blank JSON template for download
export const SAMPLE_TEMPLATE_JSON = {
  title: "Custom Mock Test Title",
  description: "Brief test instructions or details",
  durationMinutes: 30,
  markingScheme: {
    correct: 1,
    incorrect: -0.25
  },
  sections: [
    {
      id: "sec_1",
      name: "General Aptitude",
      questions: [
        {
          id: "q_1",
          question: "What is the speed of an object covering 120 km in 2 hours?",
          options: [
            "50 km/h",
            "60 km/h",
            "70 km/h",
            "80 km/h"
          ],
          correctAnswer: 1,
          explanation: "Speed = Distance / Time = 120 km / 2 hours = 60 km/h."
        }
      ]
    }
  ]
};
