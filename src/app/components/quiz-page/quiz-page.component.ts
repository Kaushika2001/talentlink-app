import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer?: number;
  explanation?: string;
}

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {
  quizTitle = 'Inventory Management Quiz';
  currentQuestionIndex = 0;
  showResults = false;
  score = 0;
  
  questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'What is the primary purpose of inventory management?',
      options: [
        'To maximize storage space',
        'To balance supply and demand while minimizing costs',
        'To increase product prices',
        'To reduce the number of suppliers'
      ],
      correctAnswer: 1,
      explanation: 'Inventory management aims to optimize stock levels to meet customer demand while minimizing holding and ordering costs.'
    },
    {
      id: 2,
      question: 'Which inventory method assumes that the first items purchased are the first items sold?',
      options: [
        'LIFO (Last In, First Out)',
        'FIFO (First In, First Out)',
        'Average Cost Method',
        'Specific Identification'
      ],
      correctAnswer: 1,
      explanation: 'FIFO assumes that the oldest inventory items are sold first, which is useful for perishable goods.'
    },
    {
      id: 3,
      question: 'What does EOQ stand for in inventory management?',
      options: [
        'Efficient Order Quantity',
        'Economic Order Quantity',
        'Essential Order Queue',
        'Estimated Output Quality'
      ],
      correctAnswer: 1,
      explanation: 'EOQ (Economic Order Quantity) is a formula used to determine the optimal order quantity that minimizes total inventory costs.'
    },
    {
      id: 4,
      question: 'What is safety stock?',
      options: [
        'Stock kept in a secure location',
        'Extra inventory held to prevent stockouts',
        'Stock that is insured',
        'Stock ready for immediate sale'
      ],
      correctAnswer: 1,
      explanation: 'Safety stock is additional inventory maintained to mitigate the risk of stockouts due to uncertainties in supply and demand.'
    },
    {
      id: 5,
      question: 'Which of the following is NOT a holding cost?',
      options: [
        'Storage costs',
        'Insurance costs',
        'Ordering costs',
        'Obsolescence costs'
      ],
      correctAnswer: 2,
      explanation: 'Ordering costs are separate from holding costs. Holding costs include storage, insurance, depreciation, and obsolescence.'
    },
    {
      id: 6,
      question: 'What is the reorder point?',
      options: [
        'The maximum inventory level',
        'The inventory level at which a new order should be placed',
        'The minimum order quantity',
        'The average daily usage'
      ],
      correctAnswer: 1,
      explanation: 'The reorder point is the inventory level that triggers a new order to ensure stock is replenished before it runs out.'
    },
    {
      id: 7,
      question: 'What does ABC analysis categorize?',
      options: [
        'Suppliers by reliability',
        'Inventory items by importance and value',
        'Employees by performance',
        'Customers by purchase frequency'
      ],
      correctAnswer: 1,
      explanation: 'ABC analysis categorizes inventory into three classes (A, B, C) based on their importance and value to prioritize management efforts.'
    },
    {
      id: 8,
      question: 'What is a stockout?',
      options: [
        'When inventory is sold at a discount',
        'When demand for an item cannot be fulfilled due to lack of inventory',
        'When inventory exceeds storage capacity',
        'When products are returned by customers'
      ],
      correctAnswer: 1,
      explanation: 'A stockout occurs when inventory is depleted and customer demand cannot be met, potentially leading to lost sales.'
    },
    {
      id: 9,
      question: 'Which technology is commonly used for real-time inventory tracking?',
      options: [
        'Manual counting',
        'Spreadsheets',
        'RFID (Radio Frequency Identification)',
        'Paper records'
      ],
      correctAnswer: 2,
      explanation: 'RFID technology enables automatic, real-time tracking of inventory items throughout the supply chain.'
    },
    {
      id: 10,
      question: 'What is the main benefit of Just-In-Time (JIT) inventory management?',
      options: [
        'Maximum inventory levels',
        'Reduced holding costs and waste',
        'Increased storage requirements',
        'Longer lead times'
      ],
      correctAnswer: 1,
      explanation: 'JIT minimizes inventory by receiving goods only as they are needed, reducing holding costs and waste.'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  get currentQuestion(): QuizQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  selectAnswer(optionIndex: number) {
    this.currentQuestion.selectedAnswer = optionIndex;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  submitQuiz() {
    this.score = this.questions.filter(q => q.selectedAnswer === q.correctAnswer).length;
    this.showResults = true;
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.showResults = false;
    this.score = 0;
    this.questions.forEach(q => q.selectedAnswer = undefined);
  }

  goToQuestion(index: number) {
    this.currentQuestionIndex = index;
  }

  isAnswered(question: QuizQuestion): boolean {
    return question.selectedAnswer !== undefined;
  }

  isCorrect(question: QuizQuestion): boolean {
    return question.selectedAnswer === question.correctAnswer;
  }

  getScorePercentage(): number {
    return Math.round((this.score / this.questions.length) * 100);
  }

  getScoreMessage(): string {
    const percentage = this.getScorePercentage();
    if (percentage >= 90) return 'Excellent! You have mastered inventory management!';
    if (percentage >= 70) return 'Great job! You have a good understanding.';
    if (percentage >= 50) return 'Good effort! Keep learning to improve.';
    return 'Keep studying! Review the material and try again.';
  }

  backToModule() {
    this.router.navigate(['/module']); 
  }

  allQuestionsAnswered(): boolean {
    return this.questions.every(q => q.selectedAnswer !== undefined);
  }

  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }
}