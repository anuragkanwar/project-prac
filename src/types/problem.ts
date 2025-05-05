
/**
 * Represents a practice problem.
 */
export interface Problem {
  /**
   * Unique identifier for the problem.
   */
  id: string;
  /**
   * The title or name of the problem.
   */
  title: string;
  /**
   * An optional detailed description of the problem statement.
   */
  description?: string;
  /**
   * The concept/algorithm difficulty level of the problem.
   * @see Difficulty
   */
  concept_difficulty: Difficulty;
    /**
   * The code difficulty level of the problem.
   * @see Difficulty
   */
  code_difficulty: Difficulty;
  /**
   * The category or topic the problem belongs to.
   * Consider using `ProblemCategory` enum for consistency.
   * @see Category
   */
  category: Category;
  /**
   * The URL where the problem can be found (e.g., on a platform like LeetCode, Codeforces).
   */
  url: string;
}

/**
 * Enum representing different Difficulty Level for practice problems.
 */
export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

/**
 * Enum representing different categories/topics for practice problems.
 */
export enum Category {
  StandardLibrary = "Standard Library",
  BitWizardry = "Bit Wizardry",
  Arrays = "Arrays",
  LinkedLists = "Linked Lists",
  Greedy = "Greedy",
  Intervals = "Intervals",
  TwoPointersAndLRConcepts = "2 Pointers Approach And LR Concepts In Arrays",
  SlidingWindowConstantLength = "Sliding Window : Constant Length",
  SlidingWindowVariableLength = "Sliding Window : Variable Length",
  BinarySearch = "Halving Technique : Binary Search",
  BinarySearchOnAnswer = "Halving Technique : Binary Search On Answer",
  QuickSortQuickSelect = "Quick Sort and Quick Select Algorithm",
  CycleSort = "Cycle Sort",
  StacksAndQueues = "Stacks And Queues",
  MonotonicStacksAndQueues = "Monotonic Stacks and Queues with Important Application",
  PriorityQueueHeaps = "Priority Queue (Heaps) and Applications (Infinite data Stream)",
  PrefixSum = "Prefix Sum",
  PrefixSum2D = "2D Prefix Sum",
  MathsCountingArithmeticGeometric = "Maths : Counting Techniques (Arithmetic and Geometric Progression)",
  MathsCountingPermutationsCombinations = "Maths : Counting Techniques (Permutations And Combinations)",
  MathsCountingPigeonholeInclusionExclusion = "Maths : Counting Techniques (Pigeon Hole, Inclusion Exclusion)",
  ContributionToAnswer = "CTA (contribution to Answer) concept",
  StringHashingRabinKarp = "String Processing : Hashing, Rabin-Karp Algo",
  StringKMPZAlgoManachers = "String Processing : KMP, Z algo, Manacher's Algo",
  ThinkingInRecursion = "Thinking In Recursion",
  AdvancedRecursion = "Advanced Recursion",
  TreeTraversalsMarking = "Trees : Traversals and Marking Techniques",
  Tries = "Tries",
  DisjointSetUnion = "Disjoint Set Union",
  GraphTraversal = "Graphs : Basic Traversal",
  GraphConnectivity = "Graphs : Connected Components, Bridges and Articulations",
  GraphShortestPaths = "Graphs : Single Source & All pairs Shortest Paths",
  GraphCyclesMSTLCAMatching = "Graphs : Cycles, MST, LCA, Matching",
  AutomataGrammar = "Basic Automata and Grammar",
  NumberTheoryFundamentals = "Number Theory : Fundamentals",
  NumberTheoryPrimesSieves = "Number Theory : Primes and Sieves",
  NumberTheoryFunctions = "Number Theory : Number-theoretic Functions",
  NumberTheoryModularArithmetic = "Number Theory : Modular Arithmetic",
  DPBasic = "Dynamic Programming : Basic",
  DPKnapsack = "Dynamic Programming Pattern  : Knapsack DP",
  DPInterval = "Dynamic Programming Pattern  : LR/Interval DP",
  DPBitmask = "Dynamic Programming Pattern  : Bitmask DP",
  DPDigit = "Dynamic Programming Pattern  : Digit DP",
  DPDAG = "Dynamic Programming Pattern  : DAG DP",
  DPSOS = "Dynamic Programming Pattern  : SOS DP",
  DPBrokenProfile = "Dynamic Programming Pattern  : Broken Profile DP",
  RangeQueryImmutable = "Range Queries : immutable (Prefix Sums, Sparse Table, SQRT decomposition)",
  RangeQueryMutable = "Range Queries : mutable (Fenwick Trees, Segment Trees)",
  HLDAndMos = "HLD and Mo's Algorithm on trees",
  GeometryBasics = "Geometry : Basics",
  GeometrySweepLineConvexHull = "Geometry : Sweep Line, Convex Hull",
  GameTheory = "Game Theory",
}