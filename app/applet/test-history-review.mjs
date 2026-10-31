import { chromium } from 'playwright';

async function testReviewSheet() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Listen for uncaught console errors
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    errors.push(err.message);
  });

  await page.goto('http://localhost:3000/history');
  await page.waitForLoadState('networkidle');

  // Insert a test practice history item into IndexedDB
  await page.evaluate(async () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('CalcAuraHistoryDB', 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('practice_history')) {
          db.createObjectStore('practice_history', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('saved_whiteboards')) {
          db.createObjectStore('saved_whiteboards', { keyPath: 'id' });
        }
      };
      request.onsuccess = (e) => {
        const db = e.target.result;
        const tx = db.transaction('practice_history', 'readwrite');
        const store = tx.objectStore('practice_history');
        const entry = {
          id: 'ps_test_verify_' + Date.now(),
          title: 'Class 10th Practice Assessment',
          stage: '10th',
          stageLabel: 'Class 10th',
          classChapter: 'Class 10th · 2 Questions',
          classGrade: 'Class 10th',
          chapter: 'Real Numbers',
          submittedAt: Date.now(),
          questions: [
            {
              id: 1,
              problem: 'Find the Highest Common Factor (HCF) of 135 and 225 using Euclid’s algorithm.',
              options: ['15', '45', '25', '75'],
              correctIdx: 1,
              explanation: '225 = 135(1) + 90, 135 = 90(1) + 45, 90 = 45(2) + 0. Remainder is 0, so HCF is 45.',
              difficulty: 'Basic',
            },
            {
              id: 2,
              problem: 'What is the prime factorization of 140 in exponent form?',
              options: ['2² × 5 × 7', '2³ × 5 × 7', '2 × 5² × 7', '2² × 3 × 7'],
              correctIdx: 0,
              explanation: '140 ÷ 2 = 70; 70 ÷ 2 = 35; 35 ÷ 5 = 7; 7 ÷ 7 = 1. Thus 140 = 2² × 5 × 7.',
              difficulty: 'Basic',
            },
          ],
          userAnswers: { 0: 1, 1: 2 },
          submittedAnswers: { 0: 1, 1: 2 },
          score: 1,
          totalQuestions: 2,
          percentage: 50,
          correctCount: 1,
          incorrectCount: 1,
          unansweredCount: 0,
          timeSpentSeconds: 52,
          timeTakenSeconds: 52,
          timeLimitMinutes: 10,
        };
        store.put(entry);
        tx.oncomplete = () => resolve(entry);
        tx.onerror = () => reject(tx.error);
      };
      request.onerror = () => reject(request.error);
    });
  });

  // Reload page so history loads the entry
  await page.reload();
  await page.waitForTimeout(1000);

  // Verify the practice sheet card appears
  const card = page.locator('text=Class 10th Practice Assessment');
  await card.waitFor({ state: 'visible', timeout: 5000 });
  console.log('PASS: History card found');

  // Click "Review Sheet"
  const reviewBtn = page.locator('button:has-text("Review Sheet")').first();
  await reviewBtn.click();
  await page.waitForTimeout(1000);

  // Check if review modal is visible and not blank
  const modalHeader = page.locator('text=Accuracy');
  await modalHeader.waitFor({ state: 'visible', timeout: 5000 });

  const q1Text = page.locator('text=Find the Highest Common Factor');
  await q1Text.waitFor({ state: 'visible', timeout: 5000 });

  const explanation = page.locator('text=Step-by-Step Explanation:');
  await explanation.first().waitFor({ state: 'visible', timeout: 5000 });

  console.log('PASS: Review Modal successfully opened without blank screen!');
  console.log('Uncaught errors:', errors);

  await browser.close();
  if (errors.length > 0) {
    throw new Error('Found console errors: ' + errors.join('; '));
  }
}

testReviewSheet()
  .then(() => {
    console.log('ALL VERIFICATIONS SUCCESSFUL!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('FAILED:', err);
    process.exit(1);
  });
