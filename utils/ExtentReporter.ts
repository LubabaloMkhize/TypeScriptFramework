import {
    Reporter,
    FullConfig,
    FullResult,
    Suite,
    TestCase,
    TestResult
} from '@playwright/test/reporter';
import { PdfReportGenerator } from './PdfReportGenerator';

import * as fs from 'fs';
import * as path from 'path';

class ExtentReporter implements Reporter {

    private reportDir = path.resolve('reports');
    private reportFile = path.join(this.reportDir, 'extent-report.html');

    private tests: any[] = [];

    private startTime: number = 0;

    // ==============================
    // Test Run Started
    // ==============================

    onBegin(config: FullConfig, suite: Suite) {

        this.startTime = Date.now();

        // Create reports directory
        if (!fs.existsSync(this.reportDir)) {
            fs.mkdirSync(this.reportDir, { recursive: true });
        }

        console.log('\n======================================');
        console.log('      NDOSI AUTOMATION TEST RUN');
        console.log('======================================');
        console.log(`Total tests: ${suite.allTests().length}`);
        console.log('======================================\n');
    }

    // ==============================
    // Test Started
    // ==============================

    onTestBegin(test: TestCase, result: TestResult) {

        console.log(`▶ Running: ${test.title}`);
    }

    // ==============================
    // Test Finished
    // ==============================

    onTestEnd(test: TestCase, result: TestResult) {

        const status = result.status;

        let testStatus = 'UNKNOWN';

        if (status === 'passed') {
            testStatus = 'PASS';
        }

        if (status === 'failed' || status === 'timedOut') {
            testStatus = 'FAIL';
        }

        if (status === 'skipped') {
            testStatus = 'SKIP';
        }

        // Get project/browser name
        const projectName = test.parent?.project()?.name || 'Unknown';

        // Get tags from test title
        const tags = test.title.match(/@\w+/g) || [];

        // Get error
        let errorMessage = '';

        if (result.error) {
            errorMessage = result.error.message || '';
        }

        // Get screenshot attachment
        const screenshot = result.attachments.find(
            attachment =>
                attachment.name === 'screenshot' ||
                attachment.contentType === 'image/png'
        );

        this.tests.push({

            title: test.title,

            status: testStatus,

            duration: result.duration,

            project: projectName,

            tags: tags,

            error: errorMessage,

            screenshot: screenshot?.path || null

        });

        console.log(
            `◀ ${testStatus}: ${test.title} (${result.duration}ms)`
        );
    }

    // ==============================
    // Test Run Finished
    // ==============================

    async onEnd(result: FullResult) {

    const total = this.tests.length;

    const passed = this.tests.filter(
        test => test.status === 'PASS'
    ).length;

    const failed = this.tests.filter(
        test => test.status === 'FAIL'
    ).length;

    const skipped = this.tests.filter(
        test => test.status === 'SKIP'
    ).length;

    const duration = Date.now() - this.startTime;

    // ==========================================
    // Generate HTML report
    // ==========================================

    const html = this.generateHtml(
        total,
        passed,
        failed,
        skipped,
        duration
    );

    fs.writeFileSync(
        this.reportFile,
        html,
        'utf8'
    );

    // ==========================================
    // Generate PDF report
    // ==========================================

    PdfReportGenerator.generate(
        this.tests,
        duration
    );

    // ==========================================
    // Console summary
    // ==========================================

    console.log('\n======================================');
    console.log('       TEST EXECUTION COMPLETE');
    console.log('======================================');

    console.log(`Total   : ${total}`);
    console.log(`Passed  : ${passed}`);
    console.log(`Failed  : ${failed}`);
    console.log(`Skipped : ${skipped}`);

    console.log('\nReports generated:');

    console.log(
        'HTML: reports/extent-report.html'
    );

    console.log(
        'PDF : reports/extent-report.pdf'
    );

    console.log('======================================\n');
}

    // ==============================
    // Generate HTML
    // ==============================

    private generateHtml(
        total: number,
        passed: number,
        failed: number,
        skipped: number,
        duration: number
    ): string {

        const testRows = this.tests.map(test => {

            const statusClass =
                test.status === 'PASS'
                    ? 'pass'
                    : test.status === 'FAIL'
                        ? 'fail'
                        : 'skip';

            const tags = test.tags.length
                ? test.tags.join(' ')
                : '-';

            const screenshot = test.screenshot
                ? `<a href="${test.screenshot}" target="_blank">
                        View Screenshot
                   </a>`
                : '-';

            const error = test.error
                ? `<pre>${this.escapeHtml(test.error)}</pre>`
                : '-';

            return `
                <tr>

                    <td>${this.escapeHtml(test.title)}</td>

                    <td>
                        <span class="status ${statusClass}">
                            ${test.status}
                        </span>
                    </td>

                    <td>${test.project}</td>

                    <td>${tags}</td>

                    <td>${test.duration} ms</td>

                    <td>${screenshot}</td>

                    <td>${error}</td>

                </tr>
            `;

        }).join('');

        return `
<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <title>Ndosi Automation - Extent Report</title>

    <style>

        body {

            font-family: Arial, sans-serif;

            background: #f4f6f8;

            margin: 0;

            padding: 0;

        }

        .header {

            background: #1f2937;

            color: white;

            padding: 30px;

        }

        .header h1 {

            margin: 0;

        }

        .container {

            padding: 30px;

        }

        .summary {

            display: flex;

            gap: 20px;

            margin-bottom: 30px;

        }

        .card {

            background: white;

            padding: 20px;

            border-radius: 8px;

            min-width: 130px;

            box-shadow: 0 2px 6px rgba(0,0,0,0.1);

        }

        .card h2 {

            margin: 0 0 10px 0;

        }

        table {

            width: 100%;

            border-collapse: collapse;

            background: white;

        }

        th {

            background: #374151;

            color: white;

            padding: 12px;

            text-align: left;

        }

        td {

            padding: 12px;

            border-bottom: 1px solid #ddd;

            vertical-align: top;

        }

        .status {

            padding: 5px 10px;

            border-radius: 5px;

            font-weight: bold;

        }

        .pass {

            background: #d1fae5;

            color: #065f46;

        }

        .fail {

            background: #fee2e2;

            color: #991b1b;

        }

        .skip {

            background: #fef3c7;

            color: #92400e;

        }

        pre {

            white-space: pre-wrap;

            max-width: 400px;

        }

    </style>

</head>

<body>

    <div class="header">

        <h1>Ndosi Automation</h1>

        <p>Playwright Test Execution Report</p>

    </div>

    <div class="container">

        <div class="summary">

            <div class="card">

                <h2>${total}</h2>

                <p>Total Tests</p>

            </div>

            <div class="card">

                <h2>${passed}</h2>

                <p>Passed</p>

            </div>

            <div class="card">

                <h2>${failed}</h2>

                <p>Failed</p>

            </div>

            <div class="card">

                <h2>${skipped}</h2>

                <p>Skipped</p>

            </div>

            <div class="card">

                <h2>${duration} ms</h2>

                <p>Execution Time</p>

            </div>

        </div>

        <table>

            <thead>

                <tr>

                    <th>Test</th>

                    <th>Status</th>

                    <th>Browser</th>

                    <th>Tags</th>

                    <th>Duration</th>

                    <th>Screenshot</th>

                    <th>Error</th>

                </tr>

            </thead>

            <tbody>

                ${testRows}

            </tbody>

        </table>

    </div>

</body>

</html>
        `;
    }

    // ==============================
    // Prevent HTML injection
    // ==============================

    private escapeHtml(value: string): string {

        return value

            .replace(/&/g, '&amp;')

            .replace(/</g, '&lt;')

            .replace(/>/g, '&gt;')

            .replace(/"/g, '&quot;')

            .replace(/'/g, '&#039;');
    }
}

export default ExtentReporter;